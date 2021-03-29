import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { BASE_URL } from '../../Constants';
import { MyContext } from '../../Store';
import { customFetch } from '../../utils';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Loader, PriceFormat, QuantityModule } from '../common';
import { confirmAlert } from 'react-confirm-alert';

export default function ProductDetail() {
	const { id } = useParams();
	const [state, setState] = useContext(MyContext);

	/* API CALL FOR THE PRODUCT DATA */
	useEffect(() => {
		function addDataToState(data) {
			const productDetails = state.productDetails;
			productDetails.primary_product = data?.primary_product;

			const optionTypes = (function (data) {
				return data.attributes.reduce((acc, item) => {
					acc.push({
						...item,
						types: data.options.filter((type) => type.attrib_id === item._id)
					});

					return acc;
				}, []);
			})(data);
			productDetails.options_types = optionTypes;
			productDetails.selected_option_ids = data?.selected_option_ids;
			productDetails.product_variations = data?.product_variations;

			setState({
				...state,
				loading: false,
				productDetails: { ...productDetails, quantity: 1 }
			});
		}

		async function getProductDetails() {
			setState({ ...state, loading: true });
			const productDetails = await customFetch(`${BASE_URL}/${id}`);
			addDataToState(productDetails);
		}
		getProductDetails();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const ifSaved = () => {
		const {
			productDetails: {
				primary_product: { sale_msg, sale_price, mark_price }
			}
		} = state;

		if (sale_msg) {
			return (
				<div className='prices'>
					<p>
						You saved ₹ {(mark_price - sale_price).toFixed(2)} ({sale_msg})
					</p>
				</div>
			);
		}
	};

	const addToCartHandler = () => {
		const {
			productDetails: { primary_product, quantity },
			cart
		} = state;

		const filterCart = cart.filter(
			(cartItem) => cartItem._id === primary_product._id
		);
		let newCart;
		if (filterCart.length) {
			const obj = filterCart.pop();
			obj.quantity += quantity;
			newCart = cart.map((cartItem) =>
				cartItem._id === obj._id ? obj : cartItem
			);
		} else {
			const obj = { ...primary_product };
			obj.quantity = quantity;
			newCart = [...cart, obj];
		}

		setState({
			...state,
			cart: newCart,
			productDetails: { ...state.productDetails, quantity: 1 }
		});

		confirmAlert({
			title: 'Added to Bag',
			buttons: [
				{
					label: 'Close',
					onClick: () => {}
				}
			]
		});
	};

	return state.loading ? (
		<Loader />
	) : (
		<section className='product hbox'>
			<div className='product_overview product__preview'>
				<div className='product__preview--container'>
					<Carousel>
						{state?.productDetails?.primary_product?.images.map((item) => {
							return (
								<div className='product__preview--imageWrapper' key={item}>
									<img src={item} alt={item} />
								</div>
							);
						})}
					</Carousel>
				</div>
			</div>
			<div className='product_overview product__details'>
				<div className='product__details--content'>
					<h1 className='product__details--content-heading'>
						{state?.productDetails?.primary_product?.name}
					</h1>
					<div className='product__details--content-description'>
						{state?.productDetails?.primary_product?.desc && (
							<DynamicDescription
								description={state?.productDetails?.primary_product?.desc}
							/>
						)}
					</div>
				</div>
				<div className='product__details--content'>
					<div className='product__details--content-prices hbox'>
						<span className='prices__salePrices'>
							<PriceFormat
								item={state?.productDetails?.primary_product}
								get='sale_price'
							/>
						</span>
						<span className='prices__markPrices'>
							<PriceFormat
								item={state?.productDetails?.primary_product}
								get='mark_price'
							/>
						</span>
					</div>
					{ifSaved()}
					<div className='product__details--content-disclaimer'>
						<p>Local taxes included (where applicable)</p>
					</div>
				</div>
				<ProductVariation state={state} setState={setState} />
				<QuantityModule state={state} setState={setState} />
				<div className='addToCartButton__wrapper'>
					<button
						className='addToCartButton__wrapper--button primaryButton'
						onClick={addToCartHandler}>
						Add to cart
					</button>
				</div>
			</div>
		</section>
	);
}

function DynamicDescription({ description = '', wordCount = 100 }) {
	const [isOpen, toggleOpen] = useState(false);

	let str = '';
	if (isOpen) {
		str = description;
	} else {
		for (let i = 0, len = wordCount; i < len; i++) {
			str += description[i];
		}
		str += '...';
	}

	return (
		<div className='product__toggle--less-more'>
			<div className='product__description-text'>{str}</div>
			<button
				onClick={() => toggleOpen(!isOpen)}
				className='product__less-more-button'>
				{isOpen ? '-Less' : '+More'}
			</button>
		</div>
	);
}

function ProductVariation({ state, setState }) {
	const {
		productDetails: { options_types, product_variations, selected_option_ids }
	} = state;

	const filterButtonReducer = ({ _id, name }, index) => {
		const arr = selected_option_ids;
		arr[index] = _id;

		const primaryProduct = (function (selectedOptions) {
			const product = product_variations.filter(
				(product) => product.sign.join('') === selectedOptions.join('')
			);

			return product;
		})(arr);

		if (primaryProduct.length) {
			setState({
				...state,
				productDetails: {
					...state.productDetails,
					primary_product: primaryProduct.pop(),
					selected_option_ids: arr
				}
			});
		}
	};

	return (
		<div className='product__details'>
			{options_types.map((item, index) => {
				return (
					<div
						className='product__details--content-variation variation'
						key={item._id}>
						<p className='variation__label'>{item.name} available</p>
						{item.types.map((type) => {
							return (
								<button
									className={`variation__button ${
										selected_option_ids.includes(type._id) ? 'active' : ''
									}`}
									onClick={() => filterButtonReducer(type, index)}
									key={type._id}>
									{type.name}
								</button>
							);
						})}
					</div>
				);
			})}
		</div>
	);
}

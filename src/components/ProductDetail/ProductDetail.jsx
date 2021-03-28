import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { BASE_URL } from '../../Constants';
import { MyContext } from '../../Store';
import { customFetch } from '../../utils';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

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

			setState({
				...state,
				loading: false,
				productDetails: productDetails
			});
		}

		async function getProductDetails() {
			setState({ ...state, loading: true });
			const productDetails = await customFetch(`${BASE_URL}/${id}`);
			addDataToState(productDetails);
		}
		getProductDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

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

	const quantityCountHandler = (action) => {
		let count = state.productDetails.quantity;
		switch (action.type) {
			case 'INCREMENT':
				count++;
				break;
			case 'DECREMENT':
				count--;
				break;
			default:
				break;
		}

		if (count < 0) {
			count = 0;
		}

		setState({
			...state,
			productDetails: { ...state.productDetails, quantity: count }
		});
	};

	return state.loading ? (
		<div>loading...</div>
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
						<DynamicDescription
							description={state?.productDetails?.primary_product?.desc}
						/>
					</div>
				</div>
				<div className='product__details--content'>
					<div className='product__details--content-prices hbox'>
						<span className='prices__salePrices'>
							₹ {state?.productDetails?.primary_product?.sale_price.toFixed(2)}
						</span>
						<span className='prices__markPrices'>
							₹ {state?.productDetails?.primary_product?.mark_price.toFixed(2)}
						</span>
					</div>
					{ifSaved()}
					<div className='product__details--content-disclaimer'>
						<p>Local taxes included (where applicable)</p>
					</div>
				</div>
				<ProductVariation state={state} setState={setState} />
				<div className='product__quantity'>
					<div className='product__quantity--label'>Quantity</div>
					<div className='product__quantity--process'>
						<div className='product__quantity--process-wrapper'>
							<button
								className='quantity-button decrement'
								onClick={() => quantityCountHandler({ type: 'DECREMENT' })}>
								-
							</button>
							<div className='quantity-count'>
								{state.productDetails.quantity}
							</div>
							<button
								className='quantity-button increment'
								onClick={() => quantityCountHandler({ type: 'INCREMENT' })}>
								+
							</button>
						</div>
					</div>
				</div>
				<div className='addToCartButton__wrapper'>
					<button className='addToCartButton__wrapper--button'>
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
		productDetails: { options_types }
	} = state;

	const filterButtonReducer = ({ _id, name, attrib_id }) => {
		console.log(_id, name, attrib_id);
	};

	return (
		<div className='product__details'>
			{options_types.map((item) => {
				return (
					<div
						className='product__details--content-variation variation'
						key={item._id}>
						<p className='variation__label'>{item.name} available</p>
						{item.types.map((type) => {
							return (
								<button
									className='variation__button'
									onClick={() => filterButtonReducer(type)}
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

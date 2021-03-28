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
				return {};
			})(data);
			productDetails.options_types = optionTypes;

			setState({ ...state, productDetails: productDetails });
		}

		async function getProductDetails() {
			const productDetails = await customFetch(`${BASE_URL}/${id}`);
			addDataToState(productDetails);
		}
		getProductDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return (
		<section className='product hbox'>
			<div className='product_overview product__preview'>
				<div className='product__preview--container'>
					<Carousel>
						{state.productDetails.primary_product.images.map((item) => {
							return (
								<div className='product__preview--imageWrapper'>
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
						<Description
							description={state?.productDetails?.primary_product?.desc}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

function Description({ description = '', wordCount = 100 }) {
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

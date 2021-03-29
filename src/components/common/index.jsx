import React from 'react';

export function QuantityModule({ state, setState, item = {} }) {
	const quantityCountHandler = (action) => {
		let count = item.quantity || state.productDetails.quantity;
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

		if (count < 1) {
			count = 1;
		}

		if (item.hasOwnProperty('_id')) {
			const cart = state.cart.map((cartItem) => {
				if (cartItem._id === item._id) {
					return {
						...cartItem,
						quantity: count
					};
				} else {
					return cartItem;
				}
			});

			setState({
				...state,
				cart
			});
		} else {
			setState({
				...state,
				productDetails: { ...state.productDetails, quantity: count }
			});
		}
	};

	return (
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
						{item.quantity || state.productDetails.quantity}
					</div>
					<button
						className='quantity-button increment'
						onClick={() => quantityCountHandler({ type: 'INCREMENT' })}>
						+
					</button>
				</div>
			</div>
		</div>
	);
}

export function PriceFormat({ price = '' }) {
	return `₹ ${price.toFixed(2)}`;
}

export function Loader() {
	return (
		<div className='hbox main-center cross-center loader_wrapper'>
			<svg
				width='35px'
				height='35px'
				viewBox='0 0 100 100'
				preserveAspectRatio='xMidYMid'>
				<circle
					cx='50'
					cy='50'
					fill='none'
					stroke='#2fada1'
					strokeWidth='10'
					r='35'
					strokeDasharray='164.93361431346415 56.97787143782138'>
					<animateTransform
						attributeName='transform'
						type='rotate'
						repeatCount='indefinite'
						dur='1s'
						values='0 50 50;360 50 50'
						keyTimes='0;1'></animateTransform>
				</circle>
			</svg>
		</div>
	);
}

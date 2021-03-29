import React, { useCallback, useContext } from 'react';
import { MyContext } from '../../Store';
import { EmptyBag, PriceFormat, QuantityModule } from '../common';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';

export default function Bag() {
	const [state, setState] = useContext(MyContext);

	const { cart } = state;
	const cartTotal = cart
		.reduce(
			(lastAmount, amount) => lastAmount + amount.sale_price * amount.quantity,
			0
		)
		.toFixed(2);
	return (
		<div className='cart__wrap'>
			<div className='cart__wrap--items'>
				<h1 className='cart__wrap--heading'>Your Bag 👜</h1>
				{!cart.length ? (
					<EmptyBag />
				) : (
					<>
						<RemoveItem type='All' state={state} setState={setState} />
						<CartList cart={cart} state={state} setState={setState} />
						<CartTotal cartTotal={cartTotal} />
					</>
				)}
			</div>
		</div>
	);
}

function CartTotal({ cartTotal }) {
	return (
		<div className='cart__wrap--total-checkout'>
			<p>
				<span>Cart Total: ${cartTotal}</span>
			</p>
			<div className='hbox'>
				<button className='primaryButton hbox main-center cross-center'>
					Checkout
				</button>
				<Link to='/' className='primaryButton hbox main-center cross-center'>
					Continue Shopping
				</Link>
			</div>
		</div>
	);
}

function CartList({ cart, state, setState }) {
	return (
		<ul>
			{cart.map((item) => {
				const { images, name } = item;
				const lastImg = images[images.length - 1];
				return (
					<li key={`${lastImg}_${item.name}`}>
						<div className='cart__item--wrapper hbox'>
							<div className='cart__item--wrapper-imgWrap'>
								<img alt={lastImg} src={lastImg} />
							</div>
							<div className='cart__item--wrapper-itemDetails itemDetails flex'>
								<h2 className='itemDetails__heading'>{name}</h2>
								<div className='itemDetails__pricesDetails'>
									<PriceFormat item={item} get='sale_price' />
								</div>
								<QuantityModule state={state} setState={setState} item={item} />
							</div>
							<RemoveItem
								state={state}
								setState={setState}
								item={item}
								className='cross-center'
							/>
						</div>
					</li>
				);
			})}
		</ul>
	);
}

function RemoveItem({ type = '', setState, state, item = {}, className }) {
	const { cart } = state;

	const removeItem = useCallback(() => {
		confirmAlert({
			title: 'Confirm to Remove',
			message: `Are you sure Remove ${type || 'this.'}`,
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						switch (type) {
							case 'All':
								setState({ ...state, cart: [] });
								break;
							default:
								const newCart = cart.filter(
									(cartItem) => cartItem._id !== item._id
								);
								setState({ ...state, cart: newCart });
								break;
						}
					}
				},
				{
					label: 'No',
					onClick: () => false
				}
			]
		});
	}, [cart, item._id, setState, state, type]);

	return (
		<div className={`${className} cart__wrap--removeItems hbox main-end`}>
			<button
				className='cart__wrap--removeItems-removeBtn primaryButton'
				onClick={removeItem}>
				Remove {type}
			</button>
		</div>
	);
}

import React, { useContext } from 'react';
import { MyContext } from '../../Store';

export default function Bag() {
	const [state] = useContext(MyContext);

	const { cart } = state;

	return (
		<div className='cart__wrap'>
			<div className='cart__wrap--items'>
				<ul>
					{cart.map((item) => {
						return (
							<li>
								<div className='cart__img__wrap'>
									<img alt={item.images.pop()} src={item.images.pop()} />
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { MyContext } from '../../Store';

export default function List({ itemList, loadMoreDataHandler }) {
	const [state] = useContext(MyContext);

	return (
		<div className='list'>
			<ul className='list__items hbox main-center'>
				{itemList.map((item) => (
					<Item item={item} key={item._id} />
				))}
			</ul>
			<div className='list__loader vbox main-center cross-center'>
				{!state.listLoading ? (
					<button
						className='list__loader--button'
						onClick={loadMoreDataHandler}>
						Load More
					</button>
				) : (
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
				)}
			</div>
		</div>
	);
}

function Item({ item }) {
	const imageSrc = Array.isArray(item.images) && item.images[0];

	return (
		<li className='item'>
			<Link to={`/product/${item._id}`}>
				<div className='item__wrapper vbox'>
					<div className='item__wrapper--imageWrap'>
						<img alt={imageSrc} src={imageSrc} />
					</div>
					<div className='item__wrapper--details'>
						<p className='item__wrapper--details-label' title={item.name}>
							{item.name}
						</p>
						<div className='item__wrapper--details-prices detailPrices'>
							<span className='detailPrices__salePrice'>
								₹{item.sale_price.toFixed(2)}
							</span>
							<span className='detailPrices__markedPrice'>
								₹{item.mark_price.toFixed(2)}
							</span>
						</div>
					</div>
				</div>
			</Link>
		</li>
	);
}

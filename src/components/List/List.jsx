import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from '../../Store';
import { BASE_URL } from '../../Constants';
import { customFetch } from '../../utils';
import { Loader } from '../common';

export default function List() {
	const [state, setState] = useContext(MyContext);

	const loadMoreDataHandler = async () => {
		let newPage = state.pageNumber;
		newPage++;

		setState({ ...state, listLoading: !state.listLoading });

		const data = await customFetch(`${BASE_URL}`, 'get', {
			params: { page: newPage }
		});

		if (data.products.length) {
			setState({
				...state,
				listLoading: false,
				itemList: [].concat(state.itemList).concat(data.products),
				pageNumber: newPage
			});
		} else {
			setTimeout(() => {
				alert('No more results');
			}, 2000);
		}
	};

	useEffect(() => {
		async function getListOnInit() {
			const data = await customFetch(`${BASE_URL}`, 'get', {
				params: { page: state.pageNumber }
			});

			setState({
				...state,
				loading: false,
				itemList: [].concat(...state.itemList).concat(data.products)
			});
		}
		getListOnInit();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return state.loading ? (
		<Loader />
	) : (
		<div className='list'>
			<ul className='list__items hbox main-center'>
				{state.itemList.map((item, index) => (
					<Item item={item} key={`${item._id}${index}`} />
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
					<Loader />
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

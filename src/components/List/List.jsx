import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from '../../Store';
import { customFetch } from '../../utils';
import { Loader, PriceFormat } from '../common';
import { confirmAlert } from 'react-confirm-alert';
import CONFIG from '../../data/config';

export default function List() {
	const [state, setState] = useContext(MyContext);
	const [itemList, setItemList] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);

	const loadMoreDataHandler = useCallback(async () => {
		let newPage = pageNumber;

		newPage++;

		setState({ ...state, listLoading: true });

		const data = await customFetch(`${CONFIG.BASE_URL}`, 'get', {
			params: { page: newPage }
		});

		if (data.products.length) {
			setState({
				...state,
				listLoading: false
			});
			setPageNumber(newPage);
			setItemList([...itemList, ...data.products]);
		} else {
			confirmAlert({
				title: 'No data found',
				buttons: [
					{
						label: 'Close',
						onClick: () => setState({ ...state, listLoading: false })
					}
				],
				closeOnClickOutside: false
			});
		}
	}, [itemList, pageNumber, setState, state]);

	useEffect(() => {
		setState({
			...state,
			loading: true,
			listLoading: true
		});
		async function getListOnInit() {
			const data = await customFetch(`${CONFIG.BASE_URL}`, 'get', {
				params: { page: pageNumber }
			});

			setState({
				...state,
				loading: false
			});
			setItemList([...itemList, ...data.products]);
		}
		getListOnInit();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return state.loading ? (
		<Loader />
	) : (
		<div className='list'>
			<ul className='list__items hbox main-center'>
				{itemList.map((item, index) => (
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
								<PriceFormat item={item} get='sale_price' />
							</span>
							<span className='detailPrices__markedPrice'>
								<PriceFormat item={item} get='mark_price' />???
							</span>
						</div>
					</div>
				</div>
			</Link>
		</li>
	);
}

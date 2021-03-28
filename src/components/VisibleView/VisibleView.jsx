import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { BASE_URL } from '../../Constants';
import { MyContext } from '../../Store';
import { customFetch } from '../../utils';
import List from '../List/List';
import ProductDetail from '../ProductDetail/ProductDetail';

export default function VisibleView() {
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
				loading: !state.loading,
				itemList: [].concat(...state.itemList).concat(data.products)
			});
		}
		getListOnInit();
	}, []);

	return (
		<section className='mainContainer hbox main-center flex'>
			<section className='mainContainer__inner container'>
				<BrowserRouter>
					<Switch>
						<Route exact path='/'>
							{state.loading ? (
								<div>Loading...</div>
							) : (
								<List
									itemList={state.itemList}
									loadMoreDateHandler={loadMoreDateHandler}
								/>
							)}
						</Route>
						<Route path='/product/:id'>
							<ProductDetail />
						</Route>

						<Redirect to='/' />
					</Switch>
				</BrowserRouter>
			</section>
		</section>
	);
}

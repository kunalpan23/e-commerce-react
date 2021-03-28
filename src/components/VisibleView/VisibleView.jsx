import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import List from '../List/List';
import ProductDetail from '../ProductDetail/ProductDetail';

export default function VisibleView() {
	return (
		<section className='mainContainer hbox main-center flex'>
			<section className='mainContainer__inner container'>
				<BrowserRouter>
					<Switch>
						<Route exact path='/'>
							<List />
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

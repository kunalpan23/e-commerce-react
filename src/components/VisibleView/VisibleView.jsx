import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Bag from '../Bag/Bag';
import List from '../List/List';
import ProductDetail from '../ProductDetail/ProductDetail';

export default function VisibleView() {
	return (
		<section className='mainContainer hbox main-center flex'>
			<section className='mainContainer__inner container'>
				<Switch>
					<Route exact path='/'>
						<List />
					</Route>
					<Route path='/product/:id'>
						<ProductDetail />
					</Route>
					<Route path='/bag'>
						<Bag />
					</Route>
					<Redirect to='/' />
				</Switch>
			</section>
		</section>
	);
}

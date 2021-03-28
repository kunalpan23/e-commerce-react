import React from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import VisibleView from './components/VisibleView/VisibleView';

import { MyProvider } from './Store';
import './styles/index.scss';

function App() {
	return (
		<main className='wrapper vbox'>
			<Header />
			<MyProvider>
				<VisibleView />
			</MyProvider>
			<Footer />
		</main>
	);
}

export default App;

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import VisibleView from './components/VisibleView/VisibleView';

import { MyProvider } from './Store';
import './styles/index.scss';

function App() {
	return (
		<BrowserRouter>
			<main className='wrapper vbox'>
				<MyProvider>
					<Header />
					<VisibleView />
					<Footer />
				</MyProvider>
			</main>
		</BrowserRouter>
	);
}

export default App;

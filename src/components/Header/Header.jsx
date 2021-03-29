import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from '../../Store';

const routes = [
	{ link: '/', label: 'HOME' },
	{ link: '#about', label: 'ABOUT' },
	{ link: '#contact', label: 'CONTACT' },
	{ link: '/bag', label: 'BAG' }
];

/* 
	<li>
						<Link to='/'>HOME</Link>
					</li>
					<li>
						<a href='#ABOUT'>ABOUT</a>
					</li>
					<li>
						<a href='#CONTACT'>CONTACT</a>
					</li>
					<li>
						<Link to='/bag'>
							
						</Link>
					</li>
*/

export default function Header() {
	const [state] = useContext(MyContext);
	const [open, setOpen] = useState(false);
	const [vW, setVW] = useState(0);
	useEffect(() => {
		window.addEventListener('resize', () => setVW(window.innerWidth));
		return () => {
			window.removeEventListener('resize', () => setVW(window.innerWidth));
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<header className='header hbox main-center cross-center'>
			<div className='container hbox main-center cross-center'>
				<div className='header__logo-wrapper'>
					<h1 className='header__logo-wrapper--logo'>
						<Link to='/'>MY AWESOME SHOP</Link>
					</h1>
				</div>

				<div
					className={`header__menu-wrapper hbox flex main-end ${
						open && vW < 600 ? 'active' : ''
					}`}>
					<div
						className='header__menu-wrapper-inner'
						onMouseOver={() => setOpen(true)}
						onMouseOut={() => setOpen(false)}>
						<div
							className='header__menu-hamburger'
							onFocus={() => setOpen(true)}
							onBlur={() => setOpen(false)}>
							<div className={`hamburger`}>
								<span></span>
								<span></span>
								<span></span>
							</div>
						</div>
						<ul
							className={`header__menu-wrapper--menuList hbox ${
								vW < 600 ? 'mobile-view' : 'desktop-view'
							}`}>
							{routes.map((route) => {
								return (
									<li key={JSON.stringify(route)}>
										<Link onClick={() => setOpen(false)} to={route.link}>
											{route.label === 'BAG' ? (
												<span
													className={`${state.cart.length ? 'active' : ''}`}>
													{route.label}
												</span>
											) : (
												route.label
											)}
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		</header>
	);
}

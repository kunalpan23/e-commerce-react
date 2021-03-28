import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
	const [open, setOpen] = useState(false);
	const [vW, setVW] = useState(0);
	useEffect(() => {
		window.addEventListener('resize', () => setVW(window.innerWidth));

		return () =>
			window.removeEventListener('resize', () => setVW(window.innerWidth));
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
						open ? 'active' : ''
					}`}>
					<div
						className='header__menu-hamburger'
						onClick={() => setOpen(!open)}>
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
						<li>
							<a href='#HOME'>HOME</a>
						</li>
						<li>
							<a href='#ABOUT'>ABOUT</a>
						</li>
						<li>
							<a href='#CONTACT'>CONTACT</a>
						</li>
						<li>
							<Link to='/bag'>BAG</Link>
						</li>
					</ul>
				</div>
			</div>
		</header>
	);
}

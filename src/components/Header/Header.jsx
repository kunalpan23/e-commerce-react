import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from '../../Store';

export default function Header() {
	const [state] = useContext(MyContext);
	const [open, setOpen] = useState(false);
	const [over, setOver] = useState(false);
	const [vW, setVW] = useState(0);
	useEffect(() => {
		window.addEventListener('resize', () => setVW(window.innerWidth));
		// document.addEventListener('click', (e) => !over && setOpen(!open));
		return () => {
			window.removeEventListener('resize', () => setVW(window.innerWidth));
			// document.removeEventListener('click', () => !over && setOpen(!open));
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
						open ? 'active' : ''
					}`}
					onMouseOver={() => setOpen(true)}
					onMouseOut={() => setOpen(false)}
					onFocus={() => setOpen(true)}
					onBlur={() => setOpen(false)}>
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
								<span className={`${state.cart.length ? 'active' : ''}`}>
									BAG
								</span>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</header>
	);
}

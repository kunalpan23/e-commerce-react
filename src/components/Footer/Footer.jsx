import React from 'react';

export default function Footer() {
	return (
		<footer className='footer hbox main-center cross-center'>
			<div className='container vbox footer__wrapper'>
				<ul className='hbox cross-center'>
					<li>
						<a href='#About'>About</a>
					</li>
					<li>
						<a href='#Contact'>Contact</a>
					</li>
					<li>
						<a href='#PrivacyPolicy'>Privacy Policy</a>
					</li>
					<li>
						<a href='#ReturnPolicy'>Return Policy</a>
					</li>
				</ul>
			</div>
		</footer>
	);
}

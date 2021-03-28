import React from 'react'

export default function Header() {
    return (
        <header className='header hbox main-center cross-center'>
            <div className='container hbox main-center cross-center'>
                <div className='header__logo-wrapper'>
                    <h1 className='header__logo-wrapper--logo'>MY AWESOME SHOP</h1>
                </div>

                <div className='header__menu-wrapper hbox flex main-end'>
                    <ul className='header__menu-wrapper--menuList hbox '>
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
                            <a href='#BAG'>BAG</a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

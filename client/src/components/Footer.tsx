import React from 'react'
import '../scss/pages/Footer.scss';
import logo from '../images/logo.png';

function Footer() {
	return (
		<div className="footer">
			<div className='footer__inner text__center'>
				<div className="text__center flex flex__column align--center">
					<a className="flex flex__row justify__center logo" href="/">
						<img src={logo} height="60" alt="logo" />
					</a>
				</div>
				<a href="https://marioruci.com" target='_blank' rel="noreferrer">
					<code className="btn btn__primary btn__sm">{'<'}by Mario Ruci {'/>'}</code>
				</a>
				<div className="mtop__20">
					A platform for software engineers to find educational material. Best practices, cheatsheets and more.
				</div>
				<div className="text__muted font__13 text__center">
					@Copyright {new Date().getFullYear()} DevMasters
				</div>
			</div>
		</div>
	)
}

export default Footer
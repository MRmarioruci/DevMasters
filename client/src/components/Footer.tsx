import React, {useMemo} from 'react'
import '../scss/pages/Footer.scss';
import logoDark from '../images/logo_dark.png';
import logoLight from '../images/logo_light.png';
import { useCustomContext} from '../contexts/theme-context';

function Footer() {
	const {state} = useCustomContext();

	const isLight = useMemo(() => {
		return state.theme === 'theme-light';
	}, [state.theme])
	return (
		<div className="footer">
			<div className='footer__inner text__center'>
				<div className="text__center flex flex__column align--center">
					<a className="flex flex__row justify__center logo" href="/">
						<img src={isLight ? logoDark : logoLight} height="60" alt="logo" />
					</a>
				</div>
				<div className="mtop__20">
					A platform for software engineers to find educational material. Best practices, cheatsheets and more.
				</div>
				<div className="footer__sub">
					<a href="https://marioruci.com" target='_blank' rel="noreferrer">
						<code className="text__primary">by Mario Ruci</code>
					</a>
				</div>
				<div className="text__muted font__13 text__center">
					@Copyright {new Date().getFullYear()} DevMasters
				</div>
			</div>
		</div>
	)
}

export default Footer
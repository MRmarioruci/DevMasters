import {useEffect, useMemo} from 'react'
import logoDark from '../images/logo_dark.png';
import logoLight from '../images/logo_light.png';
import { useCustomContext, ThemeType } from '../contexts/theme-context';
import ShareModal from './utils/ShareModal';

function Nav() {
	const {state, dispatch} = useCustomContext();
	const isLight = useMemo(() => {
		return state.theme === 'theme-light';
	}, [state.theme])
	const switchTheme = () => {
		setAndStoreTheme(isLight? 'theme-dark' : 'theme-light');
	}
	const setAndStoreTheme = (newTheme:ThemeType) => {
		const body = document.querySelector('body')!;
		body.dataset.theme = newTheme;
		localStorage.setItem('theme', newTheme)
		dispatch({type: 'SET_THEME', payload: newTheme})
	}
	useEffect(() => {
		const initialTheme: ThemeType = localStorage.getItem('theme') === 'theme-light' ? 'theme-light' : 'theme-dark';
		setAndStoreTheme(initialTheme);
	}, [])
	return (
		<nav className="nav">
			<div className="nav__inner">
				<a className="flex flex__row justify__center logo" href="/">
					<img src={isLight ? logoDark : logoLight} height="60" alt="logo" />
				</a>
				<div className="float--right flex flex__row">
					<div onClick={switchTheme} className="justify__center btn">
						{isLight &&
							<span className="material-icons mright__5">
								dark_mode
							</span>
						}
						{!isLight &&
							<span className="material-icons text__primary mleft__5">
								light_mode
							</span>
						}
					</div>
					<div className='mtop--5'>
						<ShareModal url={window.location.href} />
					</div>
				</div>
			</div>
		</nav>	
	)
}

export default Nav
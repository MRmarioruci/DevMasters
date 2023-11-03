import {useEffect, useMemo} from 'react'
import logo from '../images/logo.png';
import { useCustomContext, ThemeType } from '../contexts/theme-context';

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
					<img src={logo} height="60" alt="logo" />
				</a>
				<div className="float--right flex flex__row">
					{/* <div className="btn btn__primary-soft btn__md">
						Login	
					</div>
					<div className="btn btn__secondary btn__md">
						Register
					</div> */}
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
				</div>
			</div>
		</nav>	
	)
}

export default Nav
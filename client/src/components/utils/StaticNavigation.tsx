import {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { menu } from './NavItems';
import '../../scss/partials/StaticNavigation.scss';

function StaticNavigation() {
	const {pathname} = useLocation();
	const navigate = useNavigate();
	const [mappedMenu, setMappedMenu] = useState(menu.map((menuItem) => {
		return {...menuItem, open: true}
	}))
	const [menuOpen, setMenuOpen] = useState(false);
	const isActive = (href:string):boolean => {
		return `/${href}` === pathname;
	}
	const toggleMenuItem = (targetIdx:number) => {
		setMappedMenu(mappedMenu.map((menuItem, idx) => {
			if(idx === targetIdx) menuItem.open = !menuItem.open;
			return menuItem
		}))
	}
	const goTo = (page:string) => {
		navigate(page);
		setMenuOpen(false);
	}
	return (
		<div className="navigation">
			<div className="navigation__toggle animate__animated animate__bounceInUp" onClick={() => setMenuOpen(!menuOpen)}>
				<div className="material-icons font__35">
					{menuOpen ? 'close' : 'widgets'}
				</div>
			</div>
			{ menuOpen && 
				<div className="navigation__menu animate__animated animate__fadeIn">
					{mappedMenu.map((item, idx) => {
						return (
							<div key={`menu__${idx}`} className="navigation__menu-item">
								<div className="flex flex__row" onClick={() => toggleMenuItem(idx)}>
									{item.title}
									<div className="btn btn__secondary float--right btn__sm btn__arrow">
										<span className="material-icons">
											{item.open && 'keyboard_arrow_up'}
											{!item.open && 'keyboard_arrow_down'}
										</span>
									</div>
								</div>
								{item.open &&
									<div className="mtop__10 animate__animated animate__fadeIn">
										{item.items.map((subItem, subIdx) => {
											return (
												<div onClick={() => goTo(`/cheatsheets/${subItem.href}`)} className={`navigation__menu-item text__normal ${isActive(subItem.href) && `navigation__menu-itemActive`}`} key={`subnav__${subIdx}`}>
													{subItem.title}
												</div>
											)
										})}
									</div>
								}
							</div>
						)
					})}
				</div>
			}
		</div>
	)
}

export default StaticNavigation
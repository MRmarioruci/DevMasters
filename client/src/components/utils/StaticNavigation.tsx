import {useState} from 'react';
import { menu } from './NavItems';
import '../../scss/partials/StaticNavigation.scss';

function StaticNavigation() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<div className="navigation">
			<div className="navigation__toggle animate__animated animate__bounceInUp" onClick={() => setMenuOpen(!menuOpen)}>
				<div className="material-icons font__35">
					{menuOpen ? 'close' : 'widgets'}
				</div>
			</div>
			{ menuOpen && 
				<div className="navigation__menu animate__animated animate__fadeIn">
					{menu.map((item, idx) => {
						return (
							<div key={`menu__${idx}`} className="navigation__menu-item">
								{item.title}
								<div className="btn btn__secondary float--right btn__sm btn__arrow">
									<span className="material-icons">
										keyboard_arrow_down
									</span>
								</div>
							</div>
						)
					})}
				</div>
			}
		</div>
	)
}

export default StaticNavigation
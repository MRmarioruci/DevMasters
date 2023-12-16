import { Link } from 'react-router-dom';
import { menu } from '../utils/NavItems';
import { TMenuGroup, TMenuItem, IMainGroupProps } from './Main.types';
function MainGroup({
	id,
	title,
	description,
	baseLink
}: IMainGroupProps) {	
	const targetMenu = menu.find( (menuItem:TMenuGroup) => menuItem.id === id);
	return (
		<div className="main__contents">
			<div className="btn btn__primary-soft text__normal btn__rounded btn__md main__contents-label">
				{title}
			</div>
			<div className="text__center text__muted mtop--20 mbottom--20" dangerouslySetInnerHTML={{__html: description}}>
			</div>
			{<div className="main__contents-menu">
				{targetMenu?.items.map((item: TMenuItem, index) => {
					return (
						<Link
							to={`/${baseLink}/${item.href}`}
							className="card main__contents-card"
							key={`menu__${index}`}
						>
							<b className="text__primary font__10">{"/"}</b> {item.title}
							{!item.hasContent && (
								<div className="main__contents-cardUnderConstruction">
									Under Construction
								</div>
							)}
						</Link>
					);
				})}
				{targetMenu?.items.length === 0 && <h4>Coming soon.</h4>}
			</div>}
		</div>
  	);
}

export default MainGroup
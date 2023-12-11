/* import HighlighterThemeSelector from "../HighlighterThemeSelector"; */
import LayoutSelector from "../LayoutSelector";
import ShareModal from "./ShareModal";
import { IDoc } from "../../types";
import { Link } from "react-router-dom";
import Suggest from "./Suggest";
interface IPageNavMetaProps{
	doc: IDoc;
	selectedGroup: any;
	showThemeSelector?: boolean;
	showLayoutSelector?: boolean;
	showShareModal?: boolean;
	allCollapsed?: boolean;
	setAllCollapsed?: React.Dispatch<React.SetStateAction<boolean>>;
}
function PageNavMeta({
	doc,
	selectedGroup,
	/* showThemeSelector, */
	showLayoutSelector,
	showShareModal,
	allCollapsed,
	setAllCollapsed
}: IPageNavMetaProps) {
	const {icon, title} = doc
	return (
		<div className="page__menu-meta">
			<div className="page__menu-metaInner">
				<div className="flex flex__row">
					{icon && <img alt="Icon" src={icon} width={40}/>}
					{title && 
						<h3 className="mtop--10 page__menu-metaTitle">{title}
							<span className="text__muted">/{selectedGroup?.title}</span>
						</h3>
					}
				</div>
				<div className='flex flex__row mtop--20'>
					<div>
						<Link to={'/'} className="btn btn__secondary btn__md doc__back">
							<i className="material-icons font__20">
								arrow_back_ios
							</i>
							<span>Back</span>
						</Link>
					</div>
					<div className="float--right">
						{/* { showThemeSelector && <HighlighterThemeSelector /> } */}
						{setAllCollapsed && 
							<div className="btn btn_transparent btn__sm text__primary" title="Collapse all" onClick={() => setAllCollapsed(!allCollapsed)}>
								<span className="material-icons">
									{allCollapsed ? 'unfold_more_double' : 'unfold_less_double'}
								</span>
							</div>
						}
						{ showLayoutSelector && <LayoutSelector />}
						{ showShareModal && <ShareModal url={window.location.href} /> }
						<Suggest />
					</div>
				</div>
			</div>
		</div>
	)
}

export default PageNavMeta



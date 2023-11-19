//import mainAnimation from '../animations/main.json';
//import Lottie from 'react-lottie-player'
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { menu } from '../utils/NavItems';
import rocketAnimation from '../../animations/rocket.json';
import '../../scss/pages/Cheatsheets.scss';
import { getCheatsheet } from '../../api/Cheatsheetsapi';
import Lottie from 'react-lottie-player';
import CheatsheetItem from './CheatsheetItem';
import CheatsheetItemModal from './CheatsheetItemModal';
import { Cheatsheet, CheatsheetDoc, CheatSheetGroup, Highlighter, ToggleCheatsheetFunction } from '../../types/index';
import { hexToRGB } from '../../utils/color';
import HighlighterThemeSelector from '../HighlighterThemeSelector';
import LayoutSelector from '../LayoutSelector';
import { useCustomContext } from '../../contexts/theme-context';
import StaticNavigation from '../utils/StaticNavigation';
import useLocalStorage from '../../utils/useLocalStorage';
import ShareModal from '../utils/ShareModal';

function CheatsheetComponent() {
	const { id } = useParams();
	const {state} = useCustomContext();
	const [cheatsheet, setCheatsheet] = useState<any>(null);
	const [jsonData, setJsonData] = useState<CheatSheetGroup[]>([]);
	const [selectedGroup, setSelectedGroup] = useState<CheatSheetGroup | null>(null);
	const [selectedGroupIndex, setSelectedGroupIndex] = useState<number>(0);
	const [title, setTitle] = useState<string>('');
	const [icon, setIcon] = useState<string>('');
	const [showModal, setShowModal] = useState<boolean>(false);
	const [highlighter, setHighlighter] = useState<Highlighter>('js');
	const [themeColor, setThemeColor] = useState<string | null | undefined>(null);
	const [selectedCheatSheet, setSelectedCheatsheet] = useState<null | Cheatsheet>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useMemo(() => {
		const darkThemeElement = document.querySelector<HTMLElement>('[data-theme]');
		if (darkThemeElement && themeColor) {
			darkThemeElement.style.setProperty('--primary', `#${themeColor}`);
			darkThemeElement.style.setProperty('--primary-rgb', hexToRGB(themeColor));
		}
	}, [themeColor])

	const fetchData = useCallback(async () => {
		setLoading(true);
		const data: void | CheatsheetDoc = await getCheatsheet(id || '').catch(() => setLoading(false));
		if(!data){
			setLoading(false);
			return;
		}
		
		setIcon(data.icon);
		setTitle(data?.title);
		setJsonData(data.groups);
		setHighlighter(data.highlighter);
		setThemeColor(data.color);
		setTimeout(() => setLoading(false), 1000);
		
	}, [id]);
	const goBack = () => {
		window.history.back();
	}
	const toggleCheatsheet:ToggleCheatsheetFunction = (cheatsheet: Cheatsheet | null) => {
		setShowModal( prev => !prev);
		setSelectedCheatsheet(cheatsheet);
	}
	useEffect(() => {
		if(!id) return;
		const m = menu.find( (menuItem) => menuItem.title === 'Interview Cheatsheets');
		const c = m?.items.find( item => item.href === id);
		if(!c) throw new Error(`Could not find the requested ${id} menu item`);
		setJsonData([]);
		setSelectedGroup(null);
		setCheatsheet(c);
		fetchData();
	}, [id, fetchData])
	useEffect(() => {
		if(!selectedGroup){
			setSelectedGroup(jsonData?.[0]);
		}else{
			const groupIdx = jsonData.indexOf(selectedGroup);
			if(groupIdx !== -1) setSelectedGroupIndex(groupIdx);
		}
	}, [jsonData, selectedGroup])
	useLocalStorage(`${id}_cheatsheets`);
	return (
		<div className="cheatsheets">
			{loading && <div className="loader__full"><div className="loader"></div></div>}
			<StaticNavigation />
			{cheatsheet &&
				<div className={`cheatsheet__${cheatsheet.href}`}>
					<div className="cheatsheet__inner">
						<div className="flex flex__row">
							{icon && <img alt="Icon" src={icon} width={40}/>}
							{title && 
								<h3 className="mtop--10 cheatsheet__title">{title}
									<span className="text__muted">/{selectedGroup?.title}</span>
								</h3>
							}
						</div>
						<div className='flex flex__row mtop--20'>
							<div>
								<div className="btn btn__secondary btn__md cheatsheet__back" onClick={goBack}>
									<i className="material-icons font__20">
										arrow_back_ios
									</i>
									<span>Back</span>
								</div>
							</div>
							<div className="float--right">
								<HighlighterThemeSelector />
								{/* <a className="btn btn__inverted btn__md" href="#" target='_blank' rel="noreferrer">
									<span className="material-icons font__20 mright--5">
									
										chat_bubble_outline
									</span>
									Suggest Changes
								</a> */}
								<LayoutSelector />
								<ShareModal url={window.location.href} />
							</div>
						</div>
					</div>
				</div>
			}
			{jsonData.length > 0 &&
				<div className='cheatsheets__menu tabs'>
					{/* <div className={`tabs__item ${selectedGroup?.title === 'My Board' && 'tabs__item-active'} `} onClick={() => setSelectedGroup(null)}>
						My Board
					</div>
					<div className="separator">
					</div> */}
					{jsonData?.map((group, idx) => {
						return (
							<div className={`tabs__item ${selectedGroup?.title === group.title && 'tabs__item-active'} `} key={`group_${idx}`} onClick={() => setSelectedGroup(group)}>
								<span className="material-icons">
									{selectedGroup?.title === group.title ? 'radio_button_checked' : 'check_box_outline_blank'}
								</span>
								{group.title}
							</div>
						)
					})}
				</div>
			}
			{ selectedGroup &&
				<div className='cheatsheets__board' style={{columns: state.columns}}>
					{selectedGroup?.docs?.map((item:Cheatsheet, idx:number) => {
						return (
							<div className="animate__animated animate__fadeIn" style={{ animationDelay: `${idx * 30}ms` }} key={`group_item_${idx}`}>
								<CheatsheetItem 
									item={item}
									toggleCheatsheet={toggleCheatsheet}
									highlighter={highlighter}
									highlighterTheme={state.highlighterTheme}
									index={idx}	
									groupIndex={selectedGroupIndex}
								/>
							</div>
						)
					})}
				</div>
			}
			{jsonData.length === 0 &&
				<div className="text__center">
					<Lottie
						loop
						animationData={rocketAnimation}
						play
						style={{ width: '250px', height: '250px', margin: 'auto' }}
					/>
					<h4>Cheatsheet under development</h4>
					<h5 className="text__muted">Please be patient my lord.</h5>
				</div>
			}
			{showModal && <CheatsheetItemModal
				item={selectedCheatSheet}
				toggleCheatsheet={toggleCheatsheet}
				highlighter={highlighter}
				highlighterTheme={state.highlighterTheme}
			/>}
		</div>
	)
}

export default CheatsheetComponent
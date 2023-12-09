import { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { menu } from '../utils/NavItems';
import rocketAnimation from '../../animations/rocket.json';
import bookmarkAnimation from '../../animations/bookmark.json';
import '../../scss/pages/Cheatsheets.scss';
import { getCheatsheet } from '../../api/Cheatsheetsapi';
import Lottie from 'react-lottie-player';
import CheatsheetItem from './CheatsheetItem';
import CheatsheetItemModal from './CheatsheetItemModal';
import { Cheatsheet, CheatsheetDoc, CheatSheetGroup, Highlighter, ToggleCheatsheetFunction } from '../../types/index';
import { useCustomContext } from '../../contexts/theme-context';
import StaticNavigation from '../utils/StaticNavigation';
import PageNav from '../utils/PageNav';
import PageNavMeta from '../utils/PageNavMeta';
import usePageTheme from '../utils/usePageTheme';
import useLocalStorage from '../../utils/useLocalStorage';
import Related from '../utils/Related';

function CheatsheetComponent() {
	const { id, group } = useParams();
	const {getFromLocalStorage} = useLocalStorage();
	const {setTheme} = usePageTheme();
	const {state} = useCustomContext();
	const [cheatsheet, setCheatsheet] = useState<any>(null);
	const [jsonData, setJsonData] = useState<CheatSheetGroup[]>([]);
	const [selectedGroupIndex] = useState<number>(0);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [highlighter, setHighlighter] = useState<Highlighter>('js');
	const [selectedCheatSheet, setSelectedCheatsheet] = useState<null | Cheatsheet>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [allCollapsed, setAllCollapsed] = useState<boolean>(false);

	useEffect(() => {
		console.log(allCollapsed);
	}, [allCollapsed, setAllCollapsed])

	const localStoragePath = useMemo(() => {
		const parts = window.location.pathname.split('/');
		return `${parts[2]}_${parts[1]}`;
	}, [])

	const fetchData = useCallback(async () => {
		setLoading(true);
		const data: void | CheatsheetDoc = await getCheatsheet(id || '').catch(() => setLoading(false));
		if(!data){
			setLoading(false);
			return;
		}
		setJsonData(data.groups);
		setHighlighter(data.highlighter);
		setTheme(data.color);
		setTimeout(() => setLoading(false), 1000);
	}, [id, setTheme]);
	const toggleCheatsheet:ToggleCheatsheetFunction = (cheatsheet: Cheatsheet | null) => {
		setShowModal( prev => !prev);
		setSelectedCheatsheet(cheatsheet);
	}

	const selectedGroup = useMemo(() => {
		if(!jsonData.length) return null;
		if(group === 'myboard'){
			const docs = jsonData.reduce((acc: Cheatsheet[], currentValue: CheatSheetGroup) => {
				const docs = currentValue?.docs?.filter((item: Cheatsheet) => getFromLocalStorage(localStoragePath, item.id!))
				return [...acc, ...docs]
			}, [])
			return {
				id: 'myboard',
				title: 'My Board',
				docs: docs
			}
		}
		const s = jsonData.find( groupItem => groupItem.id === group);
		if(!s) return jsonData[0]
		return s;
	}, [group, jsonData, localStoragePath, getFromLocalStorage])

	useEffect(() => {
		if(!id) return;
		const m = menu.find( (menuItem) => menuItem.title === 'Interview Cheatsheets');
		const c = m?.items.find( item => item.href === id);
		if(!c) throw new Error(`Could not find the requested ${id} menu item`);
		setJsonData([]);
		setCheatsheet(c);
		fetchData();
	}, [id, fetchData])

	return (
		<div className="cheatsheets">
			{loading && <div className="loader__full"><div className="loader"></div></div>}
			<StaticNavigation />
			{ !!jsonData.length &&
				<>
					<PageNavMeta
						doc={cheatsheet}
						selectedGroup={selectedGroup}
						showThemeSelector={true}
						showLayoutSelector={true}
						showShareModal={true}
						allCollapsed={allCollapsed}
						setAllCollapsed={setAllCollapsed}
					/>
					<PageNav pageId={id} items={jsonData} selectedItem={selectedGroup}/>
					<Related/>
				</>
			}
			{ selectedGroup &&
				<>
					<div key={`${selectedGroup.id}`} className='cheatsheets__board' style={{columns: state.columns}}>
						{selectedGroup?.docs?.map((item:Cheatsheet, idx:number) => {
							return (
								<div className="animate__animated animate__fadeIn" style={{ animationDelay: `${idx * 30}ms` }} key={`group_item_${item?.id}${idx}`}>
									<CheatsheetItem 
										item={item}
										toggleCheatsheet={toggleCheatsheet}
										highlighter={highlighter}
										highlighterTheme={state.highlighterTheme}
										index={idx}	
										groupIndex={selectedGroupIndex}
										localStoragePath={localStoragePath}
										allCollapsed={allCollapsed}
									/>
								</div>
							)
						})}
					</div>
					{((selectedGroup?.id === 'myboard') && (!selectedGroup?.docs.length)) &&
						<div className="text__center">
							<Lottie
								loop
								animationData={bookmarkAnimation}
								play
								style={{ width: '250px', height: '250px', margin: 'auto' }}
							/>
							<h4>Add your first item here...</h4>
							<br/>
						</div>
					}
				</>
			}
			{ jsonData.length === 0 &&
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
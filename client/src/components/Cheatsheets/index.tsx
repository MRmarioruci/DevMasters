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
import { useCustomContext } from '../../contexts/theme-context';
import StaticNavigation from '../utils/StaticNavigation';
//import useLocalStorage from '../../utils/useLocalStorage';
import PageNav from '../utils/PageNav';
import PageNavMeta from '../utils/PageNavMeta';
import usePageTheme from '../utils/usePageTheme';

function CheatsheetComponent() {
	const { id } = useParams();
	const {setTheme} = usePageTheme();
	const {state} = useCustomContext();
	const [cheatsheet, setCheatsheet] = useState<any>(null);
	const [jsonData, setJsonData] = useState<CheatSheetGroup[]>([]);
	const [selectedGroup, setSelectedGroup] = useState<CheatSheetGroup | null>(null);
	const [selectedGroupIndex, setSelectedGroupIndex] = useState<number>(0);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [highlighter, setHighlighter] = useState<Highlighter>('js');
	const [selectedCheatSheet, setSelectedCheatsheet] = useState<null | Cheatsheet>(null);
	const [loading, setLoading] = useState<boolean>(true);

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
		
	}, [id]);
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
	//useLocalStorage(`${id}_cheatsheets`);
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
					/>
					<PageNav items={jsonData} selectedItem={selectedGroup} setSelectedItem={setSelectedGroup}/>
				</>
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
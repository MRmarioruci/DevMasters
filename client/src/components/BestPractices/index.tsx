import { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { menu } from '../utils/NavItems';
import rocketAnimation from '../../animations/rocket.json';
import bookmarkAnimation from '../../animations/bookmark.json';
import '../../scss/pages/Board.scss';
import { getData } from '../../api/BestPracticesapi';
import Lottie from 'react-lottie-player';
import CardItem from './CardItem';
/* import CheatsheetItem from './CheatsheetItem';
import CheatsheetItemModal from './CheatsheetItemModal'; */
import {
	IDoc,
	IDocGroup,
	THighlighter
} from '../../types/index';
import {
	IBestItem,
	TToggleItem
} from './BestPractices.types';
import { useCustomContext } from '../../contexts/theme-context';
import StaticNavigation from '../utils/StaticNavigation';
import PageNav from '../utils/PageNav';
import PageNavMeta from '../utils/PageNavMeta';
import usePageTheme from '../utils/usePageTheme';
import useLocalStorage from '../../utils/useLocalStorage';
import Related from '../utils/Related';

function BestPractices() {
	const { id, group } = useParams();
	const {getFromLocalStorage} = useLocalStorage();
	const {setTheme} = usePageTheme();
	const {state} = useCustomContext();
	const [data, setData] = useState<any>(null);
	const [jsonData, setJsonData] = useState<IDocGroup[]>([]);
	const [selectedGroupIndex] = useState<number>(0);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [highlighter, setHighlighter] = useState<THighlighter>('js');
	const [selectedItem, setSelectedItem] = useState<null | IBestItem>(null);
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
		const responseData: void | IDoc = await getData(id || '').catch(() => setLoading(false));
		if(!responseData){
			setLoading(false);
			return;
		}
		setJsonData(responseData.groups);
		setHighlighter(responseData.highlighter);
		setTheme(responseData.color);
		setTimeout(() => setLoading(false), 1000);
	}, [id, setTheme]);
	
	const toggleItem:TToggleItem = (item: IBestItem | null) => {
		setShowModal( prev => !prev);
		setSelectedItem(item);
	}

	const selectedGroup = useMemo(() => {
		if(!jsonData.length) return null;
		if(group === 'myboard'){
			const docs = jsonData.reduce((acc: IBestItem[], currentValue: IDocGroup) => {
				const docs = currentValue?.docs?.filter((item: IBestItem) => getFromLocalStorage(localStoragePath, item.id!))
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
		const m = menu.find( (menuItem) => menuItem.id === 'bestpractices');
		const c = m?.items.find( item => item.href === id);
		if(!c) throw new Error(`Could not find the requested ${id} menu item`);
		setJsonData([]);
		setData(c);
		fetchData();
	}, [id, fetchData])

	return (
		<div className="bestpractices">
			{loading && <div className="loader__full"><div className="loader"></div></div>}
			<StaticNavigation />
			{ !!jsonData.length &&
				<>
					<PageNavMeta
						doc={data}
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
					<div key={`${selectedGroup.id}`} className='board' style={{columns: state.columns}}>
						{selectedGroup?.docs?.map((item:IBestItem, idx:number) => {
							return (
								<div className="animate__animated animate__fadeIn" style={{ animationDelay: `${idx * 30}ms` }} key={`group_item_${item?.id}${idx}`}>
									<CardItem 
										item={item}
										toggleItem={toggleItem}
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
			{/* {showModal && <CheatsheetItemModal
				item={selectedCheatSheet}
				toggleCheatsheet={toggleCheatsheet}
				highlighter={highlighter}
				highlighterTheme={state.highlighterTheme}
			/>} */}
		</div>
	)
}

export default BestPractices
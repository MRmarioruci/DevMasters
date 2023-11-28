//import mainAnimation from '../animations/main.json';
//import Lottie from 'react-lottie-player'
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { menu } from './utils/NavItems';
import rocketAnimation from '../animations/rocket.json';
import '../scss/pages/Projects.scss';
import { getProjects } from '../api/Projectsapi';
import Lottie from 'react-lottie-player';
import ProjectItem from './Projects/ProjectItem';
import { ProjectType, ProjectDocType, ProjectGroupType, Highlighter, ToggleProjectFunction } from '../types/index';
import { hexToRGB } from '../utils/color';
import HighlighterThemeSelector from './HighlighterThemeSelector';
import LayoutSelector from './LayoutSelector';
import { useCustomContext } from '../contexts/theme-context';

function Projects() {
	const { id } = useParams();
	const {state} = useCustomContext();
	const [cheatsheet, setCheatsheet] = useState<any>(null);
	const [jsonData, setJsonData] = useState<ProjectGroupType[]>([]);
	const [selectedGroup, setSelectedGroup] = useState<ProjectGroupType | null>(null);
	const [title, setTitle] = useState<string>('');
	const [icon, setIcon] = useState<string>('');
	const [showModal, setShowModal] = useState<boolean>(false);
	const [themeColor, setThemeColor] = useState<string | null | undefined>(null);
	const [selectedProject, setSelectedProject] = useState<null | ProjectType>(null);

	useMemo(() => {
		const darkThemeElement = document.querySelector<HTMLElement>('[data-theme]');
		if (darkThemeElement && themeColor) {
			darkThemeElement.style.setProperty('--primary', `#${themeColor}`);
			darkThemeElement.style.setProperty('--primary-rgb', hexToRGB(themeColor));
		}
	}, [themeColor])

	const fetchData = useCallback(async () => {
		alert('here');
		const data: ProjectDocType = await getProjects(id || '');
		if(!data) return;

		setIcon(data.icon);
		setTitle(data?.title);
		setJsonData(data.groups);
		setThemeColor(data.color);
		
	}, [id]);
	const goBack = () => {
		window.history.back();
	}
	const toggleProject:ToggleProjectFunction = (project: ProjectType | null) => {
		setShowModal( prev => !prev);
		setSelectedProject(project);
	}
	useEffect(() => {
		if(!id) return;
		const m = menu.find( (menuItem) => menuItem.title === 'Project Based Learning');
		const c = m?.items.find( item => item.href === id);
		if(!c) throw new Error(`Could not find the requested ${id} menu item`);

		setCheatsheet(c);
		fetchData();
	}, [id, fetchData])
	useEffect(() => {
		if(!selectedGroup){
			setSelectedGroup(jsonData?.[0]);
		}
	}, [jsonData, selectedGroup])
	return (
		<div className="projects">
			{cheatsheet &&
				<div className={`cheatsheet__${cheatsheet.href}`}>
					<div className="project__inner">
						{/* <h3>{cheatsheet.pageTitle}</h3>
						<h5 className='text__muted'>{cheatsheet.pageSubtitle}</h5> */}
						<div className="flex flex__row">
							{icon && <img alt="Icon" src={icon} width={40}/>}
							{title && <h3 className="mtop--10">{title}</h3>}
						</div>
						<div className='flex flex__row mtop--20'>
							<div>
								<div className="btn btn__secondary btn__md" onClick={goBack}>
									<span className="material-icons font__20">
										arrow_back_ios
									</span>
									Back
								</div>
								{/* <div className="btn btn__inverted btn__md text__secondary">
									<span className="material-icons font__20">
										download
									</span>
									Download
								</div> */}
							</div>
							<div className="float--right">
								<a className="btn btn__inverted btn__md" href="https://github.com/MRmarioruci/seMastery" target='_blank' rel="noreferrer">
									<span className="material-icons font__20 mright--5">
									
										chat_bubble_outline
									</span>
									Suggest Changes
								</a>
								<LayoutSelector />
								{/* <div className="btn btn__primary btn__md" href="https://github.com/MRmarioruci/seMastery" target='_blank'>
									<span className="material-icons font__20 mright--5">
										add
									</span>
									Add cheatsheet
								</div> */}
							</div>
						</div>
					</div>
				</div>
			}
			{jsonData.length > 0 &&
				<div className='projects__menu tabs'>
					{/* <div className={`btn ${selectedGroup === 'board' ? 'btn__primary-soft' : 'btn__transparent'}`} onClick={() => setSelectedGroup('board')}>
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
								&nbsp;{group.title}
							</div>
						)
					})}
				</div>
			}
			{ selectedGroup &&
				<div className='projects__board' style={{columns: state.columns}}>
					{selectedGroup?.docs?.map((item:ProjectType, idx:number) => {
						return (
							<div className="animate__animated animate__fadeIn" style={{ animationDelay: `${idx * 30}ms` }} key={`group_item_${idx}`}>
								<ProjectItem index={idx} item={item} toggleProject={toggleProject} />
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
			{/* {showModal && <CheatsheetItemModal item={selectedCheatSheet} toggle={toggle} highlighter={highlighter} highlighterTheme={state.highlighterTheme} />} */}
		</div>
	)
}

export default Projects
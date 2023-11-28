import { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { menu } from '../utils/NavItems';
import "./Projects.scss";
import { useCustomContext } from '../../contexts/theme-context';
import ShareModal from '../utils/ShareModal';
import HighlighterThemeSelector from '../HighlighterThemeSelector';
import StaticNavigation from '../utils/StaticNavigation';
import { getProjects } from '../../api/Projectsapi';
import { hexToRGB } from '../../utils/color';
import Lottie from 'react-lottie-player';
import rocketAnimation from '../../animations/rocket.json';
import ProjectItem from './ProjectItem';
import { IProjectItem, IToggleProject } from './Projects.types';
import { Highlighter } from '../../types';
import ProjectItemModal from './ProjectItemModal';

function Projects() {
	const { id } = useParams();
	const {state} = useCustomContext();
	const [project, setProject] = useState<any>(null);
	const [jsonData, setJsonData] = useState<any[]>([]);
	const [selectedGroup, setSelectedGroup] = useState<any | null>(null);
	const [selectedGroupIndex, setSelectedGroupIndex] = useState<number>(0);
	const [highlighter, setHighlighter] = useState<Highlighter>('js');
	const [title, setTitle] = useState<string>('');
	const [icon, setIcon] = useState<string>('');
	const [showModal, setShowModal] = useState<boolean>(false);
	const [selectedProject, setSelectedProject] = useState<IProjectItem | null>(null);
	const [themeColor, setThemeColor] = useState<string | null | undefined>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchData = useCallback(async () => {
		setLoading(true);
		const data: any = await getProjects(id || '').catch(() => setLoading(false));
		console.log(data);
		if(!data){
			setLoading(false);
			return;
		}
		
		setIcon(data.icon);
		setTitle(data?.title);
		setJsonData(data.groups);
		setThemeColor(data.color);
		setTimeout(() => setLoading(false), 1000);
	}, [id]);

	const goBack = () => {
		window.history.back();
	}
	const toggleProject: IToggleProject = (project: IProjectItem | null) => {
		setShowModal( prev => !prev);
		setSelectedProject(project);
	}

	useEffect(() => {
		if(!id) return;
		const m = menu.find( (menuItem) => menuItem.title === 'Project Based Learning');
		const c = m?.items.find( item => item.href === id);
		if(!c) throw new Error(`Could not find the requested ${id} menu item`);
		setJsonData([]);
		setSelectedGroup(null);
		setProject(c);
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

	useMemo(() => {
		const darkThemeElement = document.querySelector<HTMLElement>('[data-theme]');
		if (darkThemeElement && themeColor) {
			darkThemeElement.style.setProperty('--primary', `#${themeColor}`);
			darkThemeElement.style.setProperty('--primary-rgb', hexToRGB(themeColor));
		}
	}, [themeColor])
	return (
		<div className="projects">
			{loading && <div className="loader__full"><div className="loader"></div></div>}
			<StaticNavigation />
			{project &&
				<div className={`project__${project.href}`}>
					<div className="project__inner">
						<div className="flex flex__row">
							{icon && <img alt="Icon" src={icon} width={40}/>}
							{title && 
								<h3 className="mtop--10 project__title">{title}
									<span className="text__muted">/{selectedGroup?.title}</span>
								</h3>
							}
						</div>
						<div className='flex flex__row mtop--20'>
							<div>
								<div className="btn btn__secondary btn__md project__back" onClick={goBack}>
									<i className="material-icons font__20">
										arrow_back_ios
									</i>
									<span>Back</span>
								</div>
							</div>
							<div className="float--right">
								<HighlighterThemeSelector />
								<ShareModal url={window.location.href} />
							</div>
						</div>
					</div>
				</div>
			}
			{jsonData.length > 0 &&
				<div className='projects__menu tabs'>
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
				<>
					<div className="text__center">
						<div className="btn btn__primary-soft text__normal btn__rounded timeline__label">Start here</div>
					</div>
					<section id="cd-timeline" className="cd-container">
						{selectedGroup?.docs?.map((item:IProjectItem, idx:number) => {
							return <ProjectItem
								item={item}
								index={idx}
								toggleProject={toggleProject}
							/>
						})}
					</section>
					<div className="text__center">
						<div className="btn btn__primary-soft text__normal btn__rounded timeline__label">End</div>
					</div>
				</>
			}
			{jsonData.length === 0 &&
				<div className="text__center">
					<Lottie
						loop
						animationData={rocketAnimation}
						play
						style={{ width: '250px', height: '250px', margin: 'auto' }}
					/>
					<h4>Content under development</h4>
					<h5 className="text__muted">Please be patient my lord.</h5>
				</div>
			}
			{showModal && <ProjectItemModal
				item={selectedProject}
				toggleProject={toggleProject}
				highlighter={highlighter}
				highlighterTheme={state.highlighterTheme}
			/>}
		</div>
	)
}

export default Projects
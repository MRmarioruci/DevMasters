import { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { menu } from '../utils/NavItems';
import "./Projects.scss";
import { useCustomContext } from '../../contexts/theme-context';
import StaticNavigation from '../utils/StaticNavigation';
import { getProjects } from '../../api/Projectsapi';
import Lottie from 'react-lottie-player';
import rocketAnimation from '../../animations/rocket.json';
import bookmarkAnimation from '../../animations/bookmark.json';
import ProjectItem from './ProjectItem';
import { IProjectItem, IToggleProject } from './Projects.types';
import { Highlighter } from '../../types';
import ProjectItemModal from './ProjectItemModal';
import PageNav from '../utils/PageNav';
import PageNavMeta from '../utils/PageNavMeta';
import usePageTheme from '../utils/usePageTheme';
import useLocalStorage from '../../utils/useLocalStorage';

function Projects() {
	const { id, group } = useParams();
	const {getFromLocalStorage} = useLocalStorage();
	const {setTheme} = usePageTheme();
	const {state} = useCustomContext();
	const [project, setProject] = useState<any>(null);
	const [jsonData, setJsonData] = useState<any[]>([]);
	const [highlighter, /* setHighlighter */] = useState<Highlighter>('js');
	const [showModal, setShowModal] = useState<boolean>(false);
	const [selectedProject, setSelectedProject] = useState<IProjectItem | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const localStoragePath = useMemo(() => {
		const parts = window.location.pathname.split('/');
		return `${parts[2]}_${parts[1]}`;
	}, [])

	const fetchData = useCallback(async () => {
		setLoading(true);
		const data: any = await getProjects(id || '').catch(() => setLoading(false));
		if(!data){
			setLoading(false);
			return;
		}
		
		setJsonData(data.groups);
		setTheme(data.color);
		setTimeout(() => setLoading(false), 1000);
	}, [id, setTheme]);

	const toggleProject: IToggleProject = (project: IProjectItem | null) => {
		setShowModal( prev => !prev);
		setSelectedProject(project);
	}

	const selectedGroup = useMemo(() => {
		if(!jsonData.length) return null;
		if(group === 'myboard'){
			const docs = jsonData.reduce((acc: IProjectItem[], currentValue: any) => {
				const docs = currentValue?.docs?.filter((item: IProjectItem) => getFromLocalStorage(localStoragePath, item.id!))
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
		const m = menu.find( (menuItem) => menuItem.title === 'Project Based Learning');
		const c = m?.items.find( item => item.href === id);
		if(!c) throw new Error(`Could not find the requested ${id} menu item`);
		setJsonData([]);
		setProject(c);
		fetchData();
	}, [id, fetchData])


	return (
		<div className="projects">
			{loading && <div className="loader__full"><div className="loader"></div></div>}
			<StaticNavigation />
			{ !!jsonData.length &&
				<>
					<PageNavMeta
						doc={project}
						selectedGroup={selectedGroup}
						showThemeSelector={true}
						showShareModal={true}
					/>
					<PageNav pageId={id} items={jsonData} selectedItem={selectedGroup}/>
				</>
			}
			{ selectedGroup && 
				<>
					<div className="text__center">
						<div className="btn btn__primary-soft text__normal btn__rounded timeline__label">Start here</div>
					</div>
					<section id="cd-timeline" className="cd-container" key={`${selectedGroup.id}`}>
						{selectedGroup?.docs?.map((item:IProjectItem, idx:number) => {
							return <ProjectItem
								key={`project_${item?.id}_${idx}`}
								item={item}
								index={idx}
								toggleProject={toggleProject}
								localStoragePath={localStoragePath}
							/>
						})}
					</section>
					<div className="text__center">
						<div className="btn btn__primary-soft text__normal btn__rounded timeline__label">End</div>
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
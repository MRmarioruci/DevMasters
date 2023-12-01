import { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { menu } from '../utils/NavItems';
import "./Projects.scss";
import { useCustomContext } from '../../contexts/theme-context';
import StaticNavigation from '../utils/StaticNavigation';
import { getProjects } from '../../api/Projectsapi';
import Lottie from 'react-lottie-player';
import rocketAnimation from '../../animations/rocket.json';
import ProjectItem from './ProjectItem';
import { IProjectItem, IToggleProject } from './Projects.types';
import { Highlighter } from '../../types';
import ProjectItemModal from './ProjectItemModal';
import PageNav from '../utils/PageNav';
import PageNavMeta from '../utils/PageNavMeta';
import usePageTheme from '../utils/usePageTheme';

function Projects() {
	const { id } = useParams();
	const {setTheme} = usePageTheme();
	const {state} = useCustomContext();
	const [project, setProject] = useState<any>(null);
	const [jsonData, setJsonData] = useState<any[]>([]);
	const [selectedGroup, setSelectedGroup] = useState<any | null>(null);
	const [selectedGroupIndex, setSelectedGroupIndex] = useState<number>(0);
	const [highlighter, setHighlighter] = useState<Highlighter>('js');
	const [showModal, setShowModal] = useState<boolean>(false);
	const [selectedProject, setSelectedProject] = useState<IProjectItem | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

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
	}, [id]);

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
					<PageNav items={jsonData} selectedItem={selectedGroup} setSelectedItem={setSelectedGroup}/>
				</>
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
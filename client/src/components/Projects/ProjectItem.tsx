import React from 'react'
import { IProjectItemProps } from './Projects.types';
import CardItemHeader from '../Cheatsheets/CardItemHeader';

function ProjectItem(props: IProjectItemProps) {
	const {toggleProject, item, index, localStoragePath} = props;
	const createMarkup = (htmlContent:string) => {
		return { __html: htmlContent };
	};
	
    return (
        <div className="cd-timeline-block" key={`project__${index}`}>
			{ !!index && 
				<div className="cd-timeline-img cd-movie">
					{index+1}
				</div>
			}
			<div className="cd-timeline-content" style={{width: '100% !important'}}>
				<CardItemHeader 
					id={item.id!}
					title={item.title}
					localStoragePath={localStoragePath!}
				/>
				<br />
				<div>{item.description}</div>
				<span className="text__muted">
					{item.concepts}
				</span>
				<div className="card card__secondary card__md font__12">
					{item.technologies}
				</div>
				{ (index !== undefined) && <button onClick={() => toggleProject(item)} className="btn btn__primary btn__rounded btn__sm mtop--20">View Instructions</button>}
				{ index === undefined &&
					<div className='mtop--20' dangerouslySetInnerHTML={createMarkup(item.instructions)}></div>
				}
			</div>
		</div>
    )
}

export default ProjectItem
import React from 'react'
import { ProjectItemPropType } from '../../types/index';

function ProjectItem(props: ProjectItemPropType) {
	const {toggleProject, item, index} = props;
	const createMarkup = (htmlContent:string) => {
		return { __html: htmlContent };
	};
	
    return (
        <div className={`card projects__board-item`}>
			<div className="projects__board-itemHeader">
				<div className="projects__board-itemHeaderControl">
					{/* <input type="checkbox"/> */}
					<span className="material-icons" onClick={() => toggleProject(item)}>
						fullscreen
					</span>
				</div>
				<code className="text__bold font__16 projects__board-itemHeaderText">
                    <div className="projects__board-itemCounter">{index+1}</div>
                    {item?.title}
                </code>
			</div>
			<div className="projects__board-itemBody">
                <div className="text__muted" dangerouslySetInnerHTML={createMarkup(item.description)}></div>
                <div className="mtop--20">
                    <h5>Technologies</h5>
                    <div className="text__muted">{item.technologies}</div>    
                </div>
                <div className="mtop--20">
                    <h5>Concepts</h5>
                    <div className="text__muted">{item.concepts}</div>    
                </div>
                <div className="mtop--20">
                    <h5>Instructions</h5>
                    <div className="text__muted" dangerouslySetInnerHTML={createMarkup(item.instructions)}></div>    
                </div>
				
			</div>
			<div className="projects__board-itemFooter">
				{/* <button className="btn btn__secondary text__muted btn__md">
					<span className="material-icons">
						favorite_border
					</span>
				</button> */}
			</div>
		</div>
    )
}

export default ProjectItem
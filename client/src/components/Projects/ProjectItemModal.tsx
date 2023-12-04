import React, {useState, useRef} from 'react'
import {IProjectModalItemProps} from './Projects.types';
import ProjectItem from './ProjectItem';
import html2canvas from "html2canvas";

function ProjectItemModal(props: IProjectModalItemProps) {
    const {item, toggleProject, highlighter, highlighterTheme} = props;
	const [instructions, setInstructions] = useState(null);
	const [downloading, setDownloading] = useState<boolean>(false);
	const myRef = useRef<HTMLDivElement | null>(null);
    if(!item) return;

	const get = async () => {
		const apiUrl = 'http://127.0.0.1:5000/api/devmasters/chatgpt/get_project_instructions';
		// Make the POST request using Fetch
		fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json', // Set the content type to JSON
				// Add any additional headers if needed
			},
			body: JSON.stringify({
				project: item.title +' \n'+ item.description,
				api_key: "asd"
			}), // Convert the data to JSON format
		})
		.then(response => {
			// Check if the request was successful (status code 2xx)
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			// Parse the response JSON
			return response.json();
		})
		.then(data => {
			setInstructions(data.data);
			// Handle the response data
			console.log('Response data:', data);
		})
		.catch(error => {
			// Handle errors during the fetch
			console.error('Error during fetch:', error);
		});
	}

	const handleClickTakeScreenShot = () => {
		if(!myRef.current) return;
		
		const { cropPositionTop, cropPositionLeft, cropWidth, cropHeigth } = {
			cropPositionTop: 0,
			cropPositionLeft: 0,
			cropWidth: myRef.current.offsetWidth * 2,
			cropHeigth: myRef.current.offsetHeight * 2.3
		};
		
		
		html2canvas(myRef.current, { scale: 2, backgroundColor: 'transparent' }).then(canvas => {
			let croppedCanvas = document.createElement("canvas");
			let croppedCanvasContext = croppedCanvas.getContext("2d");
			
			croppedCanvas.width = cropWidth;
			croppedCanvas.height = cropHeigth;
			
			croppedCanvasContext!.drawImage(canvas, cropPositionLeft, cropPositionTop);
			
			const a = document.createElement("a");
			a.href = croppedCanvas.toDataURL();

			a.download = `${item?.title!.replace(/[\W\s]+/g, '_')}.png`;
			a.click();
		})
		.finally(() => {
			setDownloading(false);
		})
	};
	return (
		<div className="modal__overlay active modal__project">
            <div className="modal active animate__animated animate__zoomIn modal__md">
				{ !downloading &&
					<div className="modal__header">
						<div className="modal__header-title">
						</div>
						<span className="material-icons font__40 modal__project-download" onClick={get}>
							download
						</span>
						<div className="close-modal modal__x">
							
							<svg viewBox="0 0 20 20" onClick={() => { toggleProject(null) }}>
								<path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
							</svg>
						</div>
					</div>
				}
                <div className="modal__content">
                    <div className="modal__body">
						<div ref={myRef}>
							<ProjectItem item={item} toggleProject={toggleProject} highlighter={highlighter} highlighterTheme={highlighterTheme} />
							<div dangerouslySetInnerHTML={{ __html: instructions! }}>

							</div>
						</div>
                    </div>
                </div>
            </div>
        </div>
	)
}

export default ProjectItemModal
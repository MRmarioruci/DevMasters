import React, {useState, useRef} from 'react'
import {CheatsheetModalItemProps} from '../../types/index';
import CheatsheetItem from './CheatsheetItem';
import html2canvas from "html2canvas";

function CheatsheetItemModal(props: CheatsheetModalItemProps) {
    const {item, toggleCheatsheet, highlighter, highlighterTheme} = props;
	const [downloading, setDownloading] = useState<boolean>(false);
	const myRef = useRef<HTMLDivElement | null>(null);
    if(!item) return;

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
		<div className="modal__overlay active modal__cheatsheet">
            <div className="modal active animate__animated animate__zoomIn modal__md">
				{ !downloading &&
					<div className="modal__header">
						<div className="modal__header-title">
						</div>
						<span className="material-icons font__40 modal__cheatsheet-download" onClick={handleClickTakeScreenShot}>
							download
						</span>
						<div className="close-modal modal__x">
							
							<svg viewBox="0 0 20 20" onClick={() => { toggleCheatsheet(null) }}>
								<path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
							</svg>
						</div>
					</div>
				}
                <div className="modal__content">
                    <div className="modal__body">
						<div ref={myRef}>
							<CheatsheetItem item={item} toggleCheatsheet={toggleCheatsheet} highlighter={highlighter} highlighterTheme={highlighterTheme} />
						</div>
                    </div>
                </div>
            </div>
        </div>
	)
}

export default CheatsheetItemModal
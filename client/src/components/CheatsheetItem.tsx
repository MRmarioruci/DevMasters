import React from 'react'
import { Highlight, themes } from "prism-react-renderer";
import { CheatsheetItemProps } from '../types/index';

function CheatsheetItem(props: CheatsheetItemProps) {
	const {toggleCheatsheet, item, highlighter, highlighterTheme} = props;
	const highlighterThemeKey = highlighterTheme as keyof typeof themes
	const createMarkup = (htmlContent:string) => {
		return { __html: htmlContent };
	};
	
    return (
        <div className={`card cheatsheets__board-item`}>
			<div className="cheatsheets__board-itemHeader">
				<div className="cheatsheets__board-itemHeaderControl">
					{/* <input type="checkbox"/> */}
					<span className="material-icons" onClick={() => toggleCheatsheet(item)}>
						fullscreen
					</span>
				</div>
				<code className="text__bold font__16 cheatsheets__board-itemHeaderText">{item?.title}</code>
			</div>
			<div className="cheatsheets__board-itemBody">
				<div className="text__muted" dangerouslySetInnerHTML={createMarkup(item.description)}></div>
				{item.image &&
					<div className="cheatsheets__board-itemBodyImage">
						{item.image}
					</div>
				}
				{item.code && 
					<pre className="cheatsheets__board-itemBodyCode">
						<Highlight
							theme={themes[highlighterThemeKey]}
							code={item.code}
							language={highlighter}
						>
							{({ style, tokens, getLineProps, getTokenProps }) => (
								<pre style={style} className="cheatsheets__board-itemBodyCodeInner">
									{tokens.map((line, i) => (
									<div key={i} {...getLineProps({ line })}>
										{line.map((token, key) => (
											<span key={key} {...getTokenProps({ token })} />
										))}
									</div>
									))}
								</pre>
							)}
						</Highlight>
					</pre>
				}
				
			</div>
			<div className="cheatsheets__board-itemFooter">
				{/* <button className="btn btn__secondary text__muted btn__md">
					<span className="material-icons">
						favorite_border
					</span>
				</button> */}
			</div>
		</div>
    )
}

export default CheatsheetItem
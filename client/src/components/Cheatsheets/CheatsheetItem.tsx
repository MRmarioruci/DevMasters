import React from 'react'
import { Highlight, themes } from "prism-react-renderer";
import { CheatsheetItemProps } from '../../types/index';
import CardItemHeader from './CardItemHeader';

function CheatsheetItem(props: CheatsheetItemProps) {
	const {toggleCheatsheet, item, highlighter, highlighterTheme, localStoragePath} = props;
	const highlighterThemeKey = highlighterTheme as keyof typeof themes
	const createMarkup = (htmlContent:string) => {
		return { __html: htmlContent };
	};
    return (
        <div className={`card cheatsheets__board-item`}>
			<CardItemHeader 
				id={item.id!}
				title={item.title}
				localStoragePath={localStoragePath!}
			/>
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
			<div className="cheatsheets__board-itemFooter mtop--10">
				<button className="btn btn__inverted btn__rounded btn__sm">
					<span>Ask GPT</span>
				</button>
				<div className="cheatsheets__board-itemFooterActions">
					<span className="material-icons" onClick={() => toggleCheatsheet(item)}>
						fullscreen
					</span>
				</div>
			</div>
		</div>
    )
}

export default CheatsheetItem
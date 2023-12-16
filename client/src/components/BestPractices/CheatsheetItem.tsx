import React, { useEffect, useState } from 'react'
/* import { Highlight, themes } from "prism-react-renderer"; */
import { CheatsheetItemProps } from './Cheatsheets.types';
import CardItemHeader from './CardItemHeader';
import CodeHighlighter from '../utils/CodeHighlighter';
import { askGpt } from '../../api/Cheatsheetsapi';

function CheatsheetItem(props: CheatsheetItemProps) {
	const {toggleCheatsheet, item, highlighter, /* highlighterTheme, */ localStoragePath, allCollapsed} = props;
	const [gtpResponse, setGptResponse] = useState<string>('');
	const [gptLoading, setGptLoading] = useState<boolean>(false);
	const [collapsed, setCollapsed] = useState<boolean>(allCollapsed!);

	useEffect(() => {
		setCollapsed(allCollapsed!);
	}, [allCollapsed])

	const createMarkup = (htmlContent:string) => {
		return { __html: htmlContent };
	};
	const handleAskGpt = async () => {
		setGptLoading(true);
		const gptResponse = await askGpt(`
			title: ${item.title}
			description: ${item.description}
		`)
		setGptLoading(false);
		if(!gptResponse) throw new Error('Could not get gpt response');
		if(gptResponse.status === 'ok'){
			setGptResponse(gptResponse.data);
		}
	}
    return (
        <div className={`card cheatsheets__board-item`}>
			<CardItemHeader 
				id={item.id!}
				title={item.title}
				localStoragePath={localStoragePath!}
				collapsed={collapsed}
				setCollapsed={setCollapsed}
			/>
			{!collapsed ?
				<div className="cheatsheets__board-itemBody">
					<div className="text__muted" dangerouslySetInnerHTML={createMarkup(item.description)}></div>
					{item.image &&
						<div className="cheatsheets__board-itemBodyImage">
							{item.image}
						</div>
					}
					{item.code && 
						<pre className="cheatsheets__board-itemBodyCode">
							<CodeHighlighter
								//theme={themes[highlighterThemeKey]}
								code={item.code}
								language={highlighter}
								theme={'monokai'}
							/>
						</pre>
					}
					{ gtpResponse &&
						<div className='gpt__response animate__animated animate__slideInUp'>
							<div className="gpt__response-header">GPT says</div>
							<div dangerouslySetInnerHTML={createMarkup(gtpResponse)}></div>
						</div>
					}
				</div>
				:
				<div className="cheatsheets__board-itemBody"></div>
			}
			<div className="cheatsheets__board-itemFooter mtop--10">
				<button className="btn btn__inverted btn__rounded btn__sm" onClick={handleAskGpt} disabled={gptLoading}>
					{gptLoading && <div className="btn__loader"><div className="ld"></div></div>}
					<span>Ask GPT { gtpResponse && 'Again'}</span>
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
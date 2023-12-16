import { useEffect, useState } from 'react'
import { IBestItemProps, IBestSubItem } from './BestPractices.types';
import CardItemHeader from '../Cheatsheets/CardItemHeader';
import CodeHighlighter from '../utils/CodeHighlighter';

function CardItem({
	item,
	toggleItem,
	highlighter,
	highlighterTheme,
	index,
	groupIndex,
	localStoragePath,
	allCollapsed
}: IBestItemProps) {
	const [gtpResponse, setGptResponse] = useState<string>('');
	const [gptLoading, setGptLoading] = useState<boolean>(false);
	const [collapsed, setCollapsed] = useState<boolean>(allCollapsed!);

	useEffect(() => {
		setCollapsed(allCollapsed!);
	}, [allCollapsed])

	const handleAskGpt = async () => {
		/* setGptLoading(true);
		const gptResponse = await askGpt(`
			title: ${item.title}
			description: ${item.description}
		`)
		setGptLoading(false);
		if(!gptResponse) throw new Error('Could not get gpt response');
		if(gptResponse.status === 'ok'){
			setGptResponse(gptResponse.data);
		} */
	}
	
	return (
		<div className={`card board__item`}>
			<CardItemHeader 
				id={item.id!}
				title={item.title}
				localStoragePath={localStoragePath!}
				collapsed={collapsed}
				setCollapsed={setCollapsed}
			/>
			{!collapsed ?
				<div className="board__item-body">
					<div className="text__muted font__14">{item?.description}</div>
					{item.items?.map((subItem: IBestSubItem, idx: number) => {
						return (
							<div key={`subitem__${idx}`} className={`board__item-bodySubItem board__item-bodySubItem-${subItem.type}`}>
								{subItem.type !== 'normal' && <div className='board__item-bodySubItemHeader'>
									<span className="material-icons">
										{subItem.type === 'correct' && 'check'}
										{subItem.type === 'incorrect' && 'close'}
									</span>
								</div>}
								<div>{subItem.text}</div>
								<pre className="">
									<CodeHighlighter
										code={subItem.code}
										language={highlighter!}
										theme={'monokai'}
									/>
								</pre>		
							</div>
						)
					})}
					{/* {item.code && 
						<pre className="board__item-BodyCode">
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
					} */}
				</div>
				:
				<div className="board__item-body"></div>
			}
			<div className="board__item-footer mtop--10">
				{/* <button className="btn btn__inverted btn__rounded btn__sm" onClick={handleAskGpt} disabled={gptLoading}>
					{gptLoading && <div className="btn__loader"><div className="ld"></div></div>}
					<span>Ask GPT { gtpResponse && 'Again'}</span>
				</button> */}
				{/* <div className="board__item-footerActions">
					<span className="material-icons" onClick={() => toggleItem(item)}>
						fullscreen
					</span>
				</div> */}
			</div>
		</div>
	)
}

export default CardItem
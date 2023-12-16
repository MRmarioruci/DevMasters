import React, { useEffect, useState } from 'react'
import useLocalStorage from '../../utils/useLocalStorage';

interface CardItemHeaderProps{
	id: string;
	title: string;
	localStoragePath: string;
	collapsed?: boolean;
	setCollapsed?: React.Dispatch<React.SetStateAction<boolean>>
}

function CardItemHeader({
	id,
	title,
	localStoragePath,
	collapsed,
	setCollapsed
}: CardItemHeaderProps) {
	const {getFromLocalStorage, saveItemToLocalStorage} = useLocalStorage();
	const [checked, setChecked] = useState<boolean>(!!getFromLocalStorage(localStoragePath, id))
	useEffect(() => {
		saveItemToLocalStorage(localStoragePath, id, checked)
	}, [checked, id, localStoragePath, saveItemToLocalStorage])
    return (
        <div className="card__board-itemHeader">
			<code className="text__bold font__16 card__board-itemHeaderText" dangerouslySetInnerHTML={{__html: title}}></code>
			<div className="card__board-itemHeaderRight">
				<input checked={checked} onChange={(e) => setChecked(e.target.checked)} type="checkbox"/>
				{ setCollapsed &&
					<div className="material-icons pointer" onClick={() => setCollapsed(!collapsed)}>
						{collapsed ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
					</div>
				}
			</div>
			
		</div>
    )
}

export default CardItemHeader
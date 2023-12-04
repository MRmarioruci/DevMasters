import React, { useEffect, useState } from 'react'
import useLocalStorage from '../../utils/useLocalStorage';

interface CardItemHeaderProps{
	id: string;
	title: string;
	localStoragePath: string
}

function CardItemHeader({
	id,
	title,
	localStoragePath
}: CardItemHeaderProps) {
	const {getFromLocalStorage, saveItemToLocalStorage} = useLocalStorage();
	const [checked, setChecked] = useState(getFromLocalStorage(localStoragePath, id))
	useEffect(() => {
		saveItemToLocalStorage(localStoragePath, id, checked)
	}, [checked])
    return (
        <div className="card__board-itemHeader">
			<code className="text__bold font__16 card__board-itemHeaderText" dangerouslySetInnerHTML={{__html: title}}></code>
			<input checked={checked} onChange={(e) => setChecked(e.target.checked)} type="checkbox"/>
		</div>
    )
}

export default CardItemHeader
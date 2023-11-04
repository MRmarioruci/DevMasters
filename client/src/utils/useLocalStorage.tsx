import {useEffect, useRef} from 'react'

type StorageGroupItem = number;
type StorageGroup = {
	[key:string]: StorageGroupItem[]
}
type Storage = StorageGroup[]

function useLocalStorage(container:string | undefined |  null) {
	const storage = useRef<Storage | null>(null);

	const getFromLocalStorage = (groupIndex:number | null, itemIdx:number | null) => {
		if(!storage) return null;

		console.log(storage);
	}
	const addToLocalStorage = (groupIndex:number | null, itemIdx:number | null) => {
		if(!groupIndex || !itemIdx || !container) return;
		
		let newStorage: StorageGroup = {};
		/* Create if not available */
		if(!storage){
			newStorage[groupIndex] = [itemIdx];
		}else{
			/* newStorage = storage.map((g, gIdx) => {
				if(gIdx === groupIndex){

				}
				return g
			}) */
		}
		localStorage.setItem(container, JSON.stringify(newStorage));
		console.log(localStorage.getItem(container));
	}
	useEffect(() => {
		if(!container) return;

		const s = localStorage.getItem(container);
		if(s){
			console.log(JSON.parse(s));
			//storage.current = JSON.parse(s);
		}else{
			/* Create container */
			const defaultStorage = {
				'0': []
			};
			localStorage.setItem(container, JSON.stringify(defaultStorage));
		}
	}, [container])
	return {
		getFromLocalStorage: getFromLocalStorage,
		addToLocalStorage: addToLocalStorage
	}
}
export default useLocalStorage
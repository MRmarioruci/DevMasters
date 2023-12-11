function useLocalStorage() {
	const getFromLocalStorage = (container: string, id: string) => {
		const compContainer = `${window.location.host}_${container}`;
		const storage = JSON.parse(localStorage.getItem(compContainer) || '[]');
		if(!Array.isArray(storage)) return [];
		const d = id ? !!storage?.find((element: string) => element === id) : storage;
		return d;
	}
	const saveItemToLocalStorage = (container: string, id: string, checked: boolean) => {
		const compContainer = `${window.location.host}_${container}`;
		let storage = JSON.parse(localStorage.getItem(compContainer) || '[]');
		const saved = getFromLocalStorage(compContainer, id);
		if(checked){
			if(!saved) storage.push(id)
		}else{
			if(saved) storage = storage.filter((savedElement: string) => savedElement !== id)
		}
		localStorage.setItem(compContainer, JSON.stringify(storage));
	}
	return {
		getFromLocalStorage: getFromLocalStorage,
		saveItemToLocalStorage: saveItemToLocalStorage
	}
}
export default useLocalStorage
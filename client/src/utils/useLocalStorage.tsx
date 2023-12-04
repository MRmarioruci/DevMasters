function useLocalStorage() {
	const getFromLocalStorage = (container: string, id: string) => {
		const storage = JSON.parse(localStorage.getItem(container) || '[]');
		const d = id ? !!storage.find((element: string) => element === id) : storage;
		return d;
	}
	const saveItemToLocalStorage = (container: string, id: string, checked: boolean) => {
		let storage = JSON.parse(localStorage.getItem(container) || '[]');
		const saved = getFromLocalStorage(container, id);
		if(checked){
			if(!saved) storage.push(id)
		}else{
			if(saved) storage = storage.filter((savedElement: string) => savedElement !== id)
		}
		localStorage.setItem(container, JSON.stringify(storage));
	}
	return {
		getFromLocalStorage: getFromLocalStorage,
		saveItemToLocalStorage: saveItemToLocalStorage
	}
}
export default useLocalStorage
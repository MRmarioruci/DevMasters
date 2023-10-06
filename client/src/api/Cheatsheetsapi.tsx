import { CheatsheetDoc } from "../types";

const BASE = window.location.origin;
const getCheatsheet = async (id: string): Promise<CheatsheetDoc> => {
	const res = await fetch(`${BASE}/cheatsheets/${id}.json`);
	return await res.json();
}
export{
	getCheatsheet
}
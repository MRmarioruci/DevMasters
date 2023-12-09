import { CheatsheetDoc } from "../types";

const BASE = window.location.origin;
const BACKEND_API_ENDPOINT = process.env.REACT_APP_BACKEND_API_ENDPOINT;

const getCheatsheet = async (id: string): Promise<CheatsheetDoc> => {
	const res = await fetch(`${BASE}/cheatsheets/${id}.json`);
	return await res.json();
}
const askGpt = async (data: string): Promise<any> => {
	const res = await fetch(`${BACKEND_API_ENDPOINT}/api/devmasters/chatgpt/get_cheatsheet_details`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
			// You may need to add other headers like authorization if required
		},
		body: JSON.stringify({
			data: data,
			apiKey: ''
		})
	});
	//const apiResponse =  await res.json();
	return await res.json();
}
export{
	getCheatsheet,
	askGpt
}
import { IDoc } from "../types";
import { BASE, BACKEND_API_ENDPOINT } from "./Constants";

const getProjects = async (id: string): Promise<IDoc> => {
	const res = await fetch(`${BASE}/projects/${id}.json`);
	return await res.json();
}
export{
	getProjects
}
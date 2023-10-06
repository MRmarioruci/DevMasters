import { ProjectDocType } from "../types";

const BASE = window.location.origin;
const getProjects = async (id: string): Promise<ProjectDocType> => {
	const res = await fetch(`${BASE}/projects/${id}.json`);
	return await res.json();
}
export{
	getProjects
}
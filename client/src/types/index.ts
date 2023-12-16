/* Cheatsheets */

export type Cheatsheet = {
    "title": string,
    "description"?: any,
    "code"?: string,
    "image"?: string,
    "id"?: string,
    "saved"?: boolean
}
export type CheatSheetGroup = {
    "id"?: string,
    "title": string,
    "docs": Cheatsheet[]
}
export type Highlighter = 'js' | 'tsx' | 'py'
export type CheatsheetDoc = {
    "collectionName": string,
	"title": string,
	"icon": string,
    "color"?: string,
	"groups": CheatSheetGroup[],
    "highlighter": Highlighter
}
export type html = {
    htmlContent: string
}
export type ToggleCheatsheetFunction = (cheatsheet: Cheatsheet | null) => void;
export interface CheatsheetItemProps {
	item: Cheatsheet,
    highlighter: Highlighter,
    highlighterTheme: string,
	toggleCheatsheet: ToggleCheatsheetFunction,
    groupIndex?: number | null,
    index?: number | null,
    localStoragePath?: string
}
export interface CheatsheetModalItemProps {
	item: Cheatsheet | null,
    highlighter: Highlighter,
    highlighterTheme: string,
	toggleCheatsheet: ToggleCheatsheetFunction
}


/* Projects */
export type ProjectType = {
    title: string,
    description: string,
    technologies: string,
    concepts: string,
    instructions: string,
}
export type ProjectGroupType = {
    "title": string,
    "docs": ProjectType[]
}
export type ProjectDocType = {
    "collectionName": string,
	"title": string,
	"icon": string,
    "color"?: string,
	"groups": ProjectGroupType[],
    "highlighter": Highlighter
}
export type ToggleProjectFunction = (project: ProjectType | null) => void;
export interface ProjectItemPropType {
	item: ProjectType,
    index: number,
	toggleProject: ToggleProjectFunction
}
export interface ProjectModalItemProps {
	item: ProjectType | null,
	toggleProject: ToggleProjectFunction
}

/* KEEP */
export type IDoc = {
    "collectionName": string,
	"title": string,
	"icon": string,
    "color"?: string,
	"groups": CheatSheetGroup[] | ProjectGroupType[],
    "highlighter": Highlighter,
    "href": string
}
export type IDocGroup = {
    "id"?: string,
    "title": string,
    "docs": any[]
}
export type THighlighter = 'js' | 'tsx' | 'py'
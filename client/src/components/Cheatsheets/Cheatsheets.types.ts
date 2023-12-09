export interface ICheatsheet{
    
}
export interface CheatsheetItemProps {
	item: Cheatsheet,
    highlighter: Highlighter,
    highlighterTheme: string,
	toggleCheatsheet: ToggleCheatsheetFunction,
    groupIndex?: number | null,
    index?: number | null,
    localStoragePath?: string,
    allCollapsed?: boolean
}
export interface CheatsheetModalItemProps {
	item: Cheatsheet | null,
    highlighter: Highlighter,
    highlighterTheme: string,
	toggleCheatsheet: ToggleCheatsheetFunction
}
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
export type ToggleCheatsheetFunction = (cheatsheet: Cheatsheet | null) => void;
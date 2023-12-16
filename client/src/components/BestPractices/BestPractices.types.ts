import { THighlighter } from "../../types";
export interface IBestItem{
    id: string;
    title: string;
    description?: string;
    items: IBestSubItem[]
}
export interface IBestSubItem{
    type: 'correct' | 'incorrect' | 'normal' ;
    text: string;
    code: string
}
export interface IBestItemProps {
	item: IBestItem,
    highlighter?: THighlighter,
    highlighterTheme?: string,
	toggleItem: TToggleItem,
    groupIndex?: number | null,
    index?: number | null,
    localStoragePath?: string,
    allCollapsed?: boolean
}
/* export interface IBestModalItemProps {
	item: IBest | null,
    highlighter: THighlighter,
    highlighterTheme: string,
	toggleBest: TToggleBestFunction
} */
export type TToggleItem = (iten: IBestItem) => void;
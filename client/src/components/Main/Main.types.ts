export type TMenuItem = {
	title: string;
	href: string;
	icon: string;
	hasContent: boolean
}
export type TMenuGroup = {
	title: string;
	id: string;
	description: string;
	items: TMenuItem[];
}
export interface IMainGroupProps{
	id: string;
	title: string;
	description: string;
	baseLink: string;
}
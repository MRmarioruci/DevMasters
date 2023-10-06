import {useContext, useReducer, createContext} from 'react';

export type ThemeType = 'theme-dark' | 'theme-light';
type ProviderProps = {
	children: React.ReactNode
}
type State = {
	theme: ThemeType,
	highlighterTheme: string,
	columns: number
}
type StateAction = {
	type: 'SET_THEME',
	payload: ThemeType
} | {
	type: 'SET_HIGHLIGHT_THEME',
	payload: string
} | {
	type: 'SET_COLUMNS',
	payload: number
}
type ThemeContextType = { state: State; dispatch: React.Dispatch<StateAction> } | undefined;

const reducer = (state: State, action: StateAction): State => {
	switch (action.type) {
		case 'SET_THEME':
			return { ...state, theme: action.payload };
		case 'SET_HIGHLIGHT_THEME':
			return { ...state, highlighterTheme: action.payload };
		case 'SET_COLUMNS':
			return { ...state, columns: action.payload };
		default:
			return state;
	}
};
export const ThemeContext = createContext<ThemeContextType>(undefined);
export const useCustomContext = () => {
	const context = useContext(ThemeContext);
	if(!context) {
		throw new Error('useCustomContext must be used within a ThemeContextProvider');
	}
	return context;
}

export default function ThemeContextProvider({children}: ProviderProps) {
	const initialState: State = { 
		theme: 'theme-light',
		highlighterTheme: '',
		columns: 3
	}
	const [state, dispatch] = useReducer(reducer, initialState);
	
	return (
		<ThemeContext.Provider value={{ state, dispatch }}>
			{children}
		</ThemeContext.Provider>
	)
}
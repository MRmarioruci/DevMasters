import {useState, useEffect} from 'react'
import { hexToRGB } from '../../utils/color';

function usePageTheme() {
    const [theme, setTheme] = useState<string | undefined>();

    useEffect(() => {
        if(!theme) return;
        const darkThemeElement = document.querySelector<HTMLElement>('[data-theme]');
        if (darkThemeElement) {
            darkThemeElement.style.setProperty('--primary', `#${theme}`);
            darkThemeElement.style.setProperty('--primary-rgb', hexToRGB(theme));
        }
    }, [theme])
	return {
		setTheme
	}
}
export default usePageTheme
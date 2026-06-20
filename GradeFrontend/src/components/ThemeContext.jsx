import { useContext, useState, createContext } from 'react';

export const ThemeContext = createContext('light');

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState('light');

	const toggleTheme = () => {
		setTheme((prev) => (prev === 'light'? 'dark' : 'light'));
	};

	return (
		<ThemeContext value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext>
	);

}

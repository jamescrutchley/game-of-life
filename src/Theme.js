import { createContext } from 'react';

const ThemeContext = createContext({
    theme: 'pink',
    setTheme: () => {}
});


export default ThemeContext;
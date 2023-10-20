import Game from './Game';
import './Game.css';
import { useState, createContext } from 'react';
import ThemeContext from './Theme';

function App() {

  const [theme, setTheme] = useState('green');
  const appClassList = `App ${theme}`;

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme
    }}>
      <div className={appClassList}>
          <Game/>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

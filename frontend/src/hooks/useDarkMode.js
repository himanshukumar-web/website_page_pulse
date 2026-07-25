import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const useDarkMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a ThemeProvider');
  }
  return context;
};

export default useDarkMode;

import { ThemeProvider } from './contexts/ThemeContext';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <ThemeProvider>
      <MainLayout>
        <HomePage />
      </MainLayout>
    </ThemeProvider>
  );
};

export default App;

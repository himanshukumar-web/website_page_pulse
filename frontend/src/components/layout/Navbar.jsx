import { FiActivity, FiMoon, FiSun } from 'react-icons/fi';
import useDarkMode from '../../hooks/useDarkMode';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-slate-950/70 border-b border-gray-200/50 dark:border-slate-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <FiActivity className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            Page<span className="gradient-text">Pulse</span>
          </span>
        </div>

        <button
          onClick={toggleDarkMode}
          className="w-10 h-10 rounded-xl flex items-center justify-center
                     bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700
                     transition-all duration-200 active:scale-95"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <FiSun className="w-5 h-5 text-amber-400" />
          ) : (
            <FiMoon className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

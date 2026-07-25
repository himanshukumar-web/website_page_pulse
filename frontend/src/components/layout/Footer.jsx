import { FiHeart } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200/50 dark:border-slate-800/50 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-sm text-gray-400 dark:text-gray-500 flex items-center justify-center gap-1">
          Built with <FiHeart className="w-3.5 h-3.5 text-red-400" /> using React & Express
        </p>
        <p className="text-xs text-gray-300 dark:text-gray-600 mt-1">
          Page Pulse &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

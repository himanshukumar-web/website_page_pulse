const Footer = () => {
  return (
    <footer className="border-t border-gray-200/80 dark:border-purple-900/40 py-8 mt-16 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center gap-2">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Built for Digital Heroes (
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 hover:text-purple-600 dark:hover:text-purple-300 underline underline-offset-2 transition-colors font-semibold"
          >
            digitalheroesco.com
          </a>
          ) Training Task
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 font-normal tracking-wide">
          &copy; 2026 Himanshu Kumar
        </p>
      </div>
    </footer>
  );
};

export default Footer;


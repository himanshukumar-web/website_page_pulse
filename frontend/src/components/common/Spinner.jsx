const Spinner = () => (
  <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
    <div className="relative">
      <div className="w-16 h-16 spinner" />
      <div className="absolute inset-0 w-16 h-16 rounded-full border-3 border-purple-500/20 animate-pulse-slow" />
    </div>
    <p className="mt-6 text-gray-500 dark:text-gray-400 font-medium text-lg">
      Analyzing website...
    </p>
    <p className="mt-1 text-gray-400 dark:text-gray-500 text-sm">
      This may take a few seconds
    </p>
  </div>
);

export default Spinner;

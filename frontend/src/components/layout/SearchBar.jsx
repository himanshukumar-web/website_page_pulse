import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ onSubmit, loading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim() && !loading) {
      onSubmit(url.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center bg-white/95 dark:bg-slate-800/95 rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/30 backdrop-blur-sm border border-white/20 dark:border-slate-700/50">
        <FiSearch className="absolute left-5 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL (e.g., https://openai.com)"
          className="w-full py-4 pl-13 pr-36 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-base rounded-2xl"
          style={{ paddingLeft: '3rem' }}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="absolute right-2 px-6 py-2.5 rounded-xl font-semibold text-sm text-white
                     bg-gradient-to-r from-indigo-500 to-purple-600
                     hover:from-indigo-600 hover:to-purple-700
                     disabled:opacity-50 disabled:cursor-not-allowed
                     active:scale-[0.97] transition-all duration-200
                     shadow-lg shadow-indigo-500/25"
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;

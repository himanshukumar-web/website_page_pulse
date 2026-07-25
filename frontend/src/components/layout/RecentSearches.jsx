import { FiClock, FiX, FiTrash2 } from 'react-icons/fi';

const RecentSearches = ({ searches, onSelect, onRemove, onClear }) => {
  if (!searches || searches.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-sm text-white/60">
          <FiClock className="w-3.5 h-3.5" />
          <span>Recent searches</span>
        </div>
        <button
          onClick={onClear}
          className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          <FiTrash2 className="w-3 h-3" />
          Clear all
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {searches.map((url) => (
          <div
            key={url}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-200 cursor-pointer"
          >
            <span
              onClick={() => onSelect(url)}
              className="text-sm text-white/80 truncate max-w-[200px]"
              title={url}
            >
              {url.replace(/^https?:\/\//, '')}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(url);
              }}
              className="opacity-0 group-hover:opacity-100 text-white/40 hover:text-white/80 transition-all"
              aria-label={`Remove ${url}`}
            >
              <FiX className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;

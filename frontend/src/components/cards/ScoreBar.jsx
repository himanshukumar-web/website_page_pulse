import { useEffect, useState } from 'react';

const ScoreBar = ({ score }) => {
  const [width, setWidth] = useState(0);

  // Animate the bar on mount
  useEffect(() => {
    const timer = setTimeout(() => setWidth(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  // Color based on score range
  const getColor = () => {
    if (score >= 80) return { bg: 'from-emerald-400 to-green-500', text: 'text-emerald-600 dark:text-emerald-400', label: 'Excellent' };
    if (score >= 60) return { bg: 'from-yellow-400 to-amber-500', text: 'text-amber-600 dark:text-amber-400', label: 'Good' };
    if (score >= 40) return { bg: 'from-orange-400 to-orange-500', text: 'text-orange-600 dark:text-orange-400', label: 'Needs Work' };
    return { bg: 'from-red-400 to-red-500', text: 'text-red-600 dark:text-red-400', label: 'Poor' };
  };

  const { bg, text, label } = getColor();

  return (
    <div className="glass-card p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          SEO Score
        </h3>
        <div className="flex items-center gap-2">
          <span className={`text-3xl font-extrabold ${text}`}>{score}</span>
          <span className="text-gray-400 dark:text-gray-500 text-lg font-medium">/100</span>
        </div>
      </div>

      <div className="w-full h-3 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${bg} score-fill`}
          style={{ width: `${width}%` }}
        />
      </div>

      <p className={`mt-2 text-sm font-medium ${text}`}>{label}</p>
    </div>
  );
};

export default ScoreBar;

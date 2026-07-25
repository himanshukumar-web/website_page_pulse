import { FiAlertCircle, FiX } from 'react-icons/fi';

const ErrorAlert = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div className="animate-slide-up mx-auto max-w-2xl mb-8">
      <div className="flex items-start gap-3 px-5 py-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50">
        <FiAlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
        <p className="flex-1 text-red-700 dark:text-red-300 text-sm font-medium">
          {message}
        </p>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-red-400 hover:text-red-600 dark:hover:text-red-200 transition-colors"
            aria-label="Dismiss error"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorAlert;

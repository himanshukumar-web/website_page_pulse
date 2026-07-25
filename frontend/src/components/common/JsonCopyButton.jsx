import { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';

const JsonCopyButton = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = JSON.stringify(data, null, 2);
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button onClick={handleCopy} className="btn-secondary flex items-center gap-2">
      {copied ? (
        <>
          <FiCheck className="w-4 h-4 text-green-500" />
          <span className="text-green-600 dark:text-green-400">Copied!</span>
        </>
      ) : (
        <>
          <FiCopy className="w-4 h-4" />
          <span>Copy JSON</span>
        </>
      )}
    </button>
  );
};

export default JsonCopyButton;

import { FiDownload } from 'react-icons/fi';

const DownloadButton = ({ data, filename = 'seo-report.json' }) => {
  const handleDownload = () => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleDownload} className="btn-secondary flex items-center gap-2">
      <FiDownload className="w-4 h-4" />
      <span>Download Report</span>
    </button>
  );
};

export default DownloadButton;

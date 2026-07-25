import {
  FiGlobe, FiClock, FiType, FiFileText,
  FiHash, FiImage, FiAlertTriangle, FiAlignLeft,
} from 'react-icons/fi';
import useAnalyze from '../hooks/useAnalyze';
import useRecentSearches from '../hooks/useRecentSearches';
import calculateSeoScore from '../utils/calculateSeoScore';
import HeroSection from '../components/layout/HeroSection';
import SearchBar from '../components/layout/SearchBar';
import RecentSearches from '../components/layout/RecentSearches';
import DashboardCard from '../components/cards/DashboardCard';
import ScoreBar from '../components/cards/ScoreBar';
import Spinner from '../components/common/Spinner';
import ErrorAlert from '../components/common/ErrorAlert';
import JsonCopyButton from '../components/common/JsonCopyButton';
import DownloadButton from '../components/common/DownloadButton';

const HomePage = () => {
  const { data, loading, error, analyze, reset } = useAnalyze();
  const { searches, addSearch, removeSearch, clearAll } = useRecentSearches();

  const handleAnalyze = async (url) => {
    reset();
    const result = await analyze(url);
    if (result) addSearch(url);
  };

  const report = data?.data;
  const score = report ? calculateSeoScore(report) : 0;

  // Card configuration
  const cards = report
    ? [
        { icon: FiGlobe, label: 'HTTP Status', value: report.status, color: '#6366f1', detail: report.url },
        { icon: FiClock, label: 'Response Time', value: `${report.responseTime}ms`, color: '#8b5cf6' },
        { icon: FiType, label: 'Page Title', value: report.title || '—', color: '#a855f7', detail: report.title },
        { icon: FiFileText, label: 'Meta Description', value: report.metaDescription ? 'Found' : 'Missing', color: '#d946ef', detail: report.metaDescription || 'No meta description found' },
        { icon: FiHash, label: 'H1 Tags', value: report.h1Count, color: '#ec4899' },
        { icon: FiImage, label: 'Total Images', value: report.totalImages, color: '#f43f5e' },
        { icon: FiAlertTriangle, label: 'Missing Alt', value: report.missingAlt, color: report.missingAlt > 0 ? '#ef4444' : '#22c55e' },
        { icon: FiAlignLeft, label: 'Word Count', value: report.wordCount, color: '#14b8a6' },
      ]
    : [];

  return (
    <>
      {/* Hero + Search */}
      <HeroSection>
        <SearchBar onSubmit={handleAnalyze} loading={loading} />
        <RecentSearches
          searches={searches}
          onSelect={handleAnalyze}
          onRemove={removeSearch}
          onClear={clearAll}
        />
      </HeroSection>

      {/* Results Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Error */}
        {error && <ErrorAlert message={error} onDismiss={reset} />}

        {/* Loading */}
        {loading && <Spinner />}

        {/* Results */}
        {report && !loading && (
          <div className="animate-fade-in">
            {/* Analyzed URL */}
            <div className="text-center mb-8">
              <p className="text-sm text-gray-400 dark:text-gray-500">Results for</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {report.url}
              </p>
            </div>

            {/* SEO Score */}
            <div className="mb-8">
              <ScoreBar score={score} />
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {cards.map((card) => (
                <DashboardCard key={card.label} {...card} />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              <JsonCopyButton data={data} />
              <DownloadButton data={data} filename={`pagepulse-${new Date().toISOString().slice(0, 10)}.json`} />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default HomePage;

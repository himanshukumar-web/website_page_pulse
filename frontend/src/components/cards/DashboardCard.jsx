import formatNumber from '../../utils/formatNumber';

const DashboardCard = ({ icon: Icon, label, value, color, detail }) => {
  return (
    <div className="glass-card card-enter p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {typeof value === 'number' ? formatNumber(value) : value}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
      </div>
      {detail && (
        <p className="text-xs text-gray-400 dark:text-gray-500 truncate" title={detail}>
          {detail}
        </p>
      )}
    </div>
  );
};

export default DashboardCard;

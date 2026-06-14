import { useLogs } from "../hooks/useLogs";
import Navbar from "../components/layout/Navbar";
import DashboardLayout from "../components/layout/DashboardLayout";
import ActivityLogItem from "../components/logs/ActivityLogItem";
import ActivityLogSkeleton from "../components/logs/ActivityLogSkeleton";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";
import PageLoader from "../components/common/PageLoader";

const ClockIcon = () => (
  <svg
    className="w-7 h-7 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default function Activities() {
  const { logs, loading, error, refreshLogs } = useLogs();

  return (
    <>
      <Navbar />
      <DashboardLayout>
        <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Activity Log
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Complete history of all task-related actions
            </p>
          </div>

          {!loading && !error && logs.length > 0 && (
            <button
              type="button"
              onClick={refreshLogs}
              aria-label="Refresh activity logs"
              className="self-start sm:self-auto px-4 py-2 text-sm font-medium text-primary border border-primary/30 rounded-lg hover:bg-primary-light transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Refresh
            </button>
          )}
        </div>

        {loading && (
          <div>
            <PageLoader message="Loading activity logs..." />
            <div className="mt-6">
              <ActivityLogSkeleton />
            </div>
          </div>
        )}

        {!loading && error && (
          <ErrorMessage
            title="Failed to Load Activity Logs"
            message={error}
            onRetry={refreshLogs}
          />
        )}

        {!loading && !error && logs.length > 0 && (
          <div className="max-w-4xl">
            <p className="text-gray-500 text-sm mb-6">
              {logs.length} {logs.length === 1 ? "entry" : "entries"} &mdash;
              newest first
            </p>
            <div>
              {logs.map((log, index) => (
                <ActivityLogItem
                  key={log.id}
                  log={log}
                  isLast={index === logs.length - 1}
                />
              ))}
            </div>
          </div>
        )}

        {!loading && !error && logs.length === 0 && (
          <EmptyState
            title="No activity logs found"
            description="Task actions will appear here once tasks are created or updated."
            icon={ClockIcon}
          />
        )}
      </DashboardLayout>
    </>
  );
}

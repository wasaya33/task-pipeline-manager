import MetricCard from "./MetricCard";

const TasksIcon = () => (
  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
    <path
      fillRule="evenodd"
      d="M4 5a2 2 0 012-2 1 1 0 000 2H3a1 1 0 00-1 1v10a1 1 0 001 1h14a1 1 0 001-1V6a1 1 0 00-1-1h-3a1 1 0 000-2h2a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"
      clipRule="evenodd"
    />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

const ProgressIcon = () => (
  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
      clipRule="evenodd"
    />
  </svg>
);

const TodoIcon = () => (
  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

const PriorityIcon = () => (
  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

const PercentIcon = () => (
  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm2 4a1 1 0 000 2h.01a1 1 0 100-2H8zm4 0a1 1 0 100 2h.01a1 1 0 100-2H12zm-4 4a1 1 0 100 2h.01a1 1 0 100-2H8zm4 0a1 1 0 100 2h.01a1 1 0 100-2H12z"
      clipRule="evenodd"
    />
  </svg>
);

const PendingIcon = () => (
  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
      clipRule="evenodd"
    />
  </svg>
);

export default function MetricsSection({ metrics }) {
  const primaryMetrics = [
    {
      title: "Total Tasks",
      value: metrics.totalTasks,
      icon: TasksIcon,
      color: "blue",
    },
    {
      title: "Completed Tasks",
      value: metrics.completedTasks,
      icon: CheckIcon,
      color: "green",
    },
    {
      title: "In Progress Tasks",
      value: metrics.inProgressTasks,
      icon: ProgressIcon,
      color: "orange",
    },
    {
      title: "To Do Tasks",
      value: metrics.todoTasks,
      icon: TodoIcon,
      color: "purple",
    },
    {
      title: "High Priority Tasks",
      value: metrics.highPriorityTasks,
      icon: PriorityIcon,
      color: "red",
    },
  ];

  const advancedMetrics = [
    {
      title: "Completion Rate",
      value: `${metrics.completionPercentage}%`,
      icon: PercentIcon,
      color: "green",
      description: "Tasks marked as Done",
    },
    {
      title: "Pending Tasks",
      value: metrics.pendingTasks,
      icon: PendingIcon,
      color: "gray",
      description: "Not yet completed",
    },
    {
      title: "High Priority Pending",
      value: metrics.highPriorityPendingTasks,
      icon: PriorityIcon,
      color: "red",
      description: "Urgent tasks still open",
    },
  ];

  return (
    <section className="mb-10 sm:mb-12 space-y-6">
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
          Metrics Overview
        </h3>
        <p className="text-gray-500 text-sm">
          Live stats from your task pipeline
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
        {primaryMetrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {advancedMetrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>
    </section>
  );
}

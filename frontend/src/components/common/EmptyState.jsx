export default function EmptyState({
  title,
  description,
  icon: Icon,
  action,
  actionLabel,
}) {
  return (
    <div className="card-base p-8 sm:p-12 text-center">
      <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        {Icon ? (
          <Icon />
        ) : (
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
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        )}
      </div>
      <p className="text-gray-900 font-medium text-lg">{title}</p>
      {description && (
        <p className="text-gray-500 text-sm mt-2 max-w-sm mx-auto">{description}</p>
      )}
      {action && actionLabel && (
        <button
          type="button"
          onClick={action}
          className="mt-6 px-4 py-2 bg-primary hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

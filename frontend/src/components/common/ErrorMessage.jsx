export default function ErrorMessage({
  title = "Something went wrong",
  message,
  onRetry,
  retryLabel = "Retry",
}) {
  return (
    <div
      className="card-base bg-red-50 border-l-4 border-red-500 p-6 sm:p-8"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start gap-3">
        <svg
          className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium text-red-800">{title}</h3>
          {message && (
            <p className="mt-2 text-sm text-red-700 break-words">{message}</p>
          )}
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-4 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-smooth focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              {retryLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

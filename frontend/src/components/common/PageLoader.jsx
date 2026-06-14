import LoadingSpinner from "./LoadingSpinner";

export default function PageLoader({ message = "Loading..." }) {
  return (
    <div
      className="flex items-center gap-3 text-gray-600"
      role="status"
      aria-live="polite"
    >
      <LoadingSpinner size="sm" label={message} />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}

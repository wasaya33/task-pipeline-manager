import LoadingSpinner from "../common/LoadingSpinner";
import { getStatusTransition } from "../../utils/taskStatus";

export default function TaskCard({
  task,
  onStatusChange,
  isUpdating = false,
  updateError = null,
}) {
  const priorityStyles = {
    High: "bg-orange-100 text-accent",
    Medium: "bg-primary-light text-primary",
    Low: "bg-gray-100 text-gray-600",
  };

  const transition = getStatusTransition(task.status);

  const handleStatusChange = () => {
    if (!transition || isUpdating) return;
    onStatusChange(task.id, transition.nextStatus);
  };

  return (
    <div className="card-base card-hover p-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h4 className="font-semibold text-gray-900 text-sm leading-snug min-w-0">
          {task.title}
        </h4>
        <span
          className={`px-2 py-1 rounded-md text-xs font-semibold whitespace-nowrap flex-shrink-0 ${
            priorityStyles[task.priority]
          }`}
        >
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="pt-2 border-t border-gray-100 space-y-3">
        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
          {task.status}
        </span>

        {transition && onStatusChange && (
          <div>
            <button
              type="button"
              onClick={handleStatusChange}
              disabled={isUpdating}
              aria-label={`${transition.label} for ${task.title}`}
              aria-busy={isUpdating}
              className={`w-full px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${transition.buttonClass}`}
            >
              {isUpdating ? (
                <>
                  <LoadingSpinner size="sm" label="Updating task status" />
                  Updating...
                </>
              ) : (
                transition.label
              )}
            </button>

            {updateError && (
              <p
                className="text-red-600 text-xs mt-2 leading-relaxed"
                role="alert"
              >
                {updateError}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

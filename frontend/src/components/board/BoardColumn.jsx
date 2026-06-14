import TaskCard from "./TaskCard";

export default function BoardColumn({
  title,
  color,
  tasks,
  onStatusChange,
  updatingTaskIds = {},
  taskUpdateErrors = {},
  emptyMessage = "No tasks in this column",
}) {
  const headerColor = {
    blue: "bg-primary-light border-t-4 border-primary",
    orange: "bg-orange-50 border-t-4 border-accent",
    green: "bg-green-50 border-t-4 border-green-500",
  };

  const badgeColor = {
    blue: "bg-blue-100 text-primary",
    orange: "bg-orange-100 text-accent",
    green: "bg-green-100 text-green-600",
  };

  return (
    <div className="card-base flex flex-col h-full min-h-72 sm:min-h-96">
      <div className={`p-4 sm:p-6 ${headerColor[color]}`}>
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-bold text-gray-900">{title}</h3>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold flex-shrink-0 ${
              badgeColor[color]
            }`}
            aria-label={`${tasks.length} tasks in ${title}`}
          >
            {tasks.length}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              isUpdating={Boolean(updatingTaskIds[task.id])}
              updateError={taskUpdateErrors[task.id]}
            />
          ))
        ) : (
          <div className="py-6 sm:py-8">
            <p className="text-center text-gray-400 text-sm">{emptyMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}

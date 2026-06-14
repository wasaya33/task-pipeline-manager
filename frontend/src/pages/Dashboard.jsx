import { useMemo, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { createTask } from "../services/taskService";
import { calculateTaskMetrics } from "../utils/taskMetrics";
import { getNetworkErrorMessage } from "../utils/networkError";
import {
  showErrorToast,
  showSuccessToast,
  TOAST_MESSAGES,
} from "../utils/toast";
import Navbar from "../components/layout/Navbar";
import DashboardLayout from "../components/layout/DashboardLayout";
import MetricsSection from "../components/metrics/MetricsSection";
import BoardColumn from "../components/board/BoardColumn";
import TaskForm from "../components/forms/TaskForm";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";
import PageLoader from "../components/common/PageLoader";

const SkeletonCard = () => (
  <div className="card-base p-6 sm:p-8 animate-pulse">
    <div className="h-5 bg-gray-200 rounded mb-4" />
    <div className="h-10 bg-gray-300 rounded w-1/2" />
  </div>
);

const SkeletonTaskCard = () => (
  <div className="card-base p-4 space-y-3 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4" />
    <div className="h-3 bg-gray-200 rounded w-full" />
    <div className="h-6 bg-gray-200 rounded w-1/4" />
  </div>
);

const TasksEmptyIcon = () => (
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
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    />
  </svg>
);

export default function Dashboard() {
  const {
    tasks,
    logs,
    loading,
    error,
    refreshTasks,
    updateTaskStatus,
    updatingTaskIds,
    taskUpdateErrors,
  } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleCreateTask = async (formData) => {
    try {
      setFormLoading(true);
      setFormError(null);
      await createTask(formData);
      setIsModalOpen(false);
      await refreshTasks();
      showSuccessToast(TOAST_MESSAGES.TASK_CREATED);
    } catch (err) {
      console.error("Failed to create task:", err);
      const message = getNetworkErrorMessage(err, TOAST_MESSAGES.API_ERROR);
      setFormError(message);
      showErrorToast(message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    const result = await updateTaskStatus(taskId, newStatus);

    if (result.success) {
      showSuccessToast(TOAST_MESSAGES.STATUS_CHANGED);
    } else {
      showErrorToast(result.error || TOAST_MESSAGES.API_ERROR);
    }
  };

  const handleCloseModal = () => {
    if (formLoading) return;
    setIsModalOpen(false);
    setFormError(null);
  };

  const handleClearFormError = () => {
    if (formError) {
      setFormError(null);
    }
  };

  const metrics = useMemo(() => calculateTaskMetrics(tasks), [tasks]);

  const todoTasks = tasks.filter((t) => t.status === "To Do");
  const inProgressTasks = tasks.filter((t) => t.status === "In Progress");
  const doneTasks = tasks.filter((t) => t.status === "Done");
  const recentActivities = logs.slice(0, 6);

  if (loading) {
    return (
      <>
        <Navbar />
        <DashboardLayout>
          <div className="mb-10 sm:mb-12">
            <div className="h-10 bg-gray-200 rounded w-1/4 mb-2 animate-pulse" />
            <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse" />
          </div>

          <PageLoader message="Loading dashboard..." />

          <section className="mb-10 sm:mb-12 mt-8 space-y-6">
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
              {[...Array(5)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(3)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </section>

          <section className="mb-10 sm:mb-12">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((col) => (
                <div key={col} className="space-y-4">
                  <SkeletonTaskCard />
                  <SkeletonTaskCard />
                </div>
              ))}
            </div>
          </section>
        </DashboardLayout>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <DashboardLayout>
          <div className="mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Here&apos;s what&apos;s happening with your tasks today
            </p>
          </div>

          <ErrorMessage
            title="Failed to Load Tasks"
            message={error}
            onRetry={refreshTasks}
          />
        </DashboardLayout>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <DashboardLayout>
        <div className="mb-10 sm:mb-12 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Here&apos;s what&apos;s happening with your tasks today
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            aria-label="Create a new task"
            className="px-4 py-2 bg-primary hover:bg-blue-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Task
          </button>
        </div>

        <MetricsSection metrics={metrics} />

        <section className="mb-10 sm:mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Task Board</h3>

          {tasks.length === 0 ? (
            <EmptyState
              title="No tasks found"
              description="Get started by creating your first task to populate the board."
              icon={TasksEmptyIcon}
              action={() => setIsModalOpen(true)}
              actionLabel="Create Task"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <BoardColumn
                title="To Do"
                color="blue"
                tasks={todoTasks}
                onStatusChange={handleStatusChange}
                updatingTaskIds={updatingTaskIds}
                taskUpdateErrors={taskUpdateErrors}
                emptyMessage="No tasks in To Do"
              />
              <BoardColumn
                title="In Progress"
                color="orange"
                tasks={inProgressTasks}
                onStatusChange={handleStatusChange}
                updatingTaskIds={updatingTaskIds}
                taskUpdateErrors={taskUpdateErrors}
                emptyMessage="No tasks in progress"
              />
              <BoardColumn
                title="Done"
                color="green"
                tasks={doneTasks}
                onStatusChange={handleStatusChange}
                updatingTaskIds={updatingTaskIds}
                taskUpdateErrors={taskUpdateErrors}
                emptyMessage="No completed tasks"
              />
            </div>
          )}
        </section>

        <section>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Recent Activity
          </h3>
          {recentActivities.length > 0 ? (
            <div className="card-base p-6 sm:p-8 overflow-hidden">
              <div className="space-y-6">
                {recentActivities.map((activity, index) => (
                  <div key={activity.id} className="flex gap-4 min-w-0">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-3 h-3 bg-primary rounded-full mt-1.5" />
                      {index !== recentActivities.length - 1 && (
                        <div className="w-0.5 h-12 bg-gray-200 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pt-0.5 min-w-0">
                      <p className="text-gray-900 font-medium text-sm break-words">
                        Task{" "}
                        <span className="font-bold">
                          &quot;{activity.task_title}&quot;
                        </span>{" "}
                        {activity.action.toLowerCase().replace(/_/g, " ")}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        {new Date(activity.created_at).toLocaleDateString()} at{" "}
                        {new Date(activity.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <EmptyState
              title="No activity logs found"
              description="Recent task actions will appear here."
              icon={TasksEmptyIcon}
            />
          )}
        </section>
      </DashboardLayout>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-task-title"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center gap-4">
              <h3
                id="create-task-title"
                className="text-2xl font-bold text-gray-900"
              >
                Create New Task
              </h3>
              <button
                type="button"
                onClick={handleCloseModal}
                disabled={formLoading}
                aria-label="Close create task dialog"
                className="text-gray-500 hover:text-gray-700 disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-lg p-1"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <TaskForm
                onSubmit={handleCreateTask}
                loading={formLoading}
                error={formError}
                onClearError={handleClearFormError}
                submitButtonText="Create Task"
                onCancel={handleCloseModal}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

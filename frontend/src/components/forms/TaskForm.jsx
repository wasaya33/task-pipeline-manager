import { useRef, useState } from "react";
import ErrorMessage from "../common/ErrorMessage";
import LoadingSpinner from "../common/LoadingSpinner";

const TaskForm = ({
  onSubmit,
  loading = false,
  error = null,
  onClearError = null,
  initialValues = {
    title: "",
    description: "",
    priority: "Medium",
  },
  submitButtonText = "Create Task",
  onCancel = null,
}) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const isSubmittingRef = useRef(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (formData.title.trim().length > 100) {
      newErrors.title = "Title must not exceed 100 characters";
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = "Description must not exceed 500 characters";
    }

    if (!["Low", "Medium", "High"].includes(formData.priority)) {
      newErrors.priority = "Please select a valid priority";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (onClearError) {
      onClearError();
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const newErrors = validateForm();
    if (newErrors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: newErrors[name],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading || isSubmittingRef.current) return;

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({
        title: true,
        description: true,
        priority: true,
      });
      return;
    }

    isSubmittingRef.current = true;

    try {
      await onSubmit(formData);
      setFormData(initialValues);
      setErrors({});
      setTouched({});
    } catch (err) {
      console.error("Form submission error:", err);
    } finally {
      isSubmittingRef.current = false;
    }
  };

  const handleReset = () => {
    if (loading || isSubmittingRef.current) return;
    setFormData(initialValues);
    setErrors({});
    setTouched({});
    if (onCancel) {
      onCancel();
    }
  };

  const isDisabled = loading || isSubmittingRef.current;

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {error && (
        <ErrorMessage title="Unable to save task" message={error} />
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Title <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter task title"
          disabled={isDisabled}
          required
          aria-required="true"
          aria-invalid={Boolean(errors.title && touched.title)}
          aria-describedby={errors.title && touched.title ? "title-error" : "title-hint"}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
            errors.title && touched.title
              ? "border-red-500 focus:ring-red-500 bg-red-50"
              : "border-gray-300 focus:ring-blue-500 hover:border-gray-400"
          } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        />
        {errors.title && touched.title && (
          <p id="title-error" className="text-red-500 text-sm mt-1" role="alert">
            {errors.title}
          </p>
        )}
        <p id="title-hint" className="text-gray-500 text-xs mt-1">
          {formData.title.length}/100 characters
        </p>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description <span className="text-gray-500">(Optional)</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter task description"
          disabled={isDisabled}
          rows="4"
          aria-invalid={Boolean(errors.description && touched.description)}
          aria-describedby={
            errors.description && touched.description
              ? "description-error"
              : "description-hint"
          }
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-colors ${
            errors.description && touched.description
              ? "border-red-500 focus:ring-red-500 bg-red-50"
              : "border-gray-300 focus:ring-blue-500 hover:border-gray-400"
          } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        />
        {errors.description && touched.description && (
          <p id="description-error" className="text-red-500 text-sm mt-1" role="alert">
            {errors.description}
          </p>
        )}
        <p id="description-hint" className="text-gray-500 text-xs mt-1">
          {formData.description.length}/500 characters
        </p>
      </div>

      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
          Priority <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isDisabled}
          required
          aria-required="true"
          aria-invalid={Boolean(errors.priority && touched.priority)}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
            errors.priority && touched.priority
              ? "border-red-500 focus:ring-red-500 bg-red-50"
              : "border-gray-300 focus:ring-blue-500 hover:border-gray-400"
          } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        {errors.priority && touched.priority && (
          <p className="text-red-500 text-sm mt-1" role="alert">
            {errors.priority}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
        <button
          type="submit"
          disabled={isDisabled}
          aria-busy={isDisabled}
          className="flex-1 bg-primary hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {isDisabled && <LoadingSpinner size="sm" label="Submitting task" />}
          {isDisabled ? "Creating..." : submitButtonText}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={handleReset}
            disabled={isDisabled}
            className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900 font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;

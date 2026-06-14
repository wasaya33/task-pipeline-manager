import { useState, useEffect, useCallback } from "react";
import { getAllLogs } from "../services/taskService";
import { getLogsErrorMessage, sortLogsByDateDesc } from "../utils/activityLog";

/**
 * Custom Hook: useLogs
 * Fetches and manages activity log data
 */
export const useLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const logsData = await getAllLogs();
      setLogs(sortLogsByDateDesc(logsData));
    } catch (err) {
      console.error("Failed to fetch logs:", err);
      setError(getLogsErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const refreshLogs = async () => {
    await fetchLogs();
  };

  return {
    logs,
    loading,
    error,
    refreshLogs,
  };
};

const pool = require("../config/db");

// Create a log entry
const createLog = async (taskId, action, oldStatus, newStatus) => {
  try {
    const query = `
      INSERT INTO logs (task_id, action, old_status, new_status)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const result = await pool.query(query, [taskId, action, oldStatus || null, newStatus || null]);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating log:", error);
    throw error;
  }
};

// Get all logs
const getAllLogs = async (req, res) => {
  try {
    const query = `
      SELECT logs.id, logs.task_id, logs.action, logs.old_status, logs.new_status, logs.created_at,
             tasks.title as task_title
      FROM logs
      JOIN tasks ON logs.task_id = tasks.id
      ORDER BY logs.created_at DESC;
    `;

    const result = await pool.query(query);

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching logs",
      error: error.message,
    });
  }
};

module.exports = {
  createLog,
  getAllLogs,
};

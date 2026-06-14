const pool = require("../config/db");
const { createLog } = require("./logController");

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    // Validate required fields
    if (!title || !priority) {
      return res.status(400).json({
        success: false,
        message: "Title and priority are required",
      });
    }

    // Validate priority values
    if (!["High", "Medium", "Low"].includes(priority)) {
      return res.status(400).json({
        success: false,
        message: "Priority must be High, Medium, or Low",
      });
    }

    // Insert task with parameterized query
    const query = `
      INSERT INTO tasks (title, description, priority, status)
      VALUES ($1, $2, $3, 'To Do')
      RETURNING *;
    `;

    const result = await pool.query(query, [title, description || null, priority]);
    const createdTask = result.rows[0];

    // Create log entry for task creation
    try {
      await createLog(createdTask.id, "TASK_CREATED", null, "To Do");
    } catch (logError) {
      console.error("Error creating log entry:", logError);
    }

    res.status(201).json({
      success: true,
      data: createdTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({
      success: false,
      message: "Error creating task",
      error: error.message,
    });
  }
};

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const query = "SELECT * FROM tasks ORDER BY created_at DESC;";
    const result = await pool.query(query);

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching tasks",
      error: error.message,
    });
  }
};

// Get task by ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const query = "SELECT * FROM tasks WHERE id = $1;";
    const result = await pool.query(query, [id]);

    // Check if task exists
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching task",
      error: error.message,
    });
  }
};

// Update task by ID
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status } = req.body;

    // Validate ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    // Validate priority if provided
    if (priority && !["High", "Medium", "Low"].includes(priority)) {
      return res.status(400).json({
        success: false,
        message: "Priority must be High, Medium, or Low",
      });
    }

    // Fetch existing task first
    const fetchQuery = "SELECT * FROM tasks WHERE id = $1;";
    const fetchResult = await pool.query(fetchQuery, [id]);

    if (fetchResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const existingTask = fetchResult.rows[0];

    // Build update query dynamically
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (title !== undefined) {
      updates.push(`title = $${paramCount}`);
      values.push(title);
      paramCount++;
    }

    if (description !== undefined) {
      updates.push(`description = $${paramCount}`);
      values.push(description);
      paramCount++;
    }

    if (priority !== undefined) {
      updates.push(`priority = $${paramCount}`);
      values.push(priority);
      paramCount++;
    }

    if (status !== undefined) {
      updates.push(`status = $${paramCount}`);
      values.push(status);
      paramCount++;
    }

    // If no updates provided
    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields to update",
      });
    }

    // Add ID as last parameter
    values.push(id);

    const updateQuery = `
      UPDATE tasks
      SET ${updates.join(", ")}
      WHERE id = $${paramCount}
      RETURNING *;
    `;

    const result = await pool.query(updateQuery, values);
    const updatedTask = result.rows[0];

    // Create log entry for task update
    try {
      const oldStatus = existingTask.status;
      const newStatus = updatedTask.status;
      const action = oldStatus !== newStatus ? "STATUS_UPDATED" : "TASK_UPDATED";
      await createLog(id, action, oldStatus, newStatus);
    } catch (logError) {
      console.error("Error creating log entry:", logError);
    }

    res.json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({
      success: false,
      message: "Error updating task",
      error: error.message,
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
};

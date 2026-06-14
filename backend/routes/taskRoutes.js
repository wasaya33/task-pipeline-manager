const express = require("express");
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
} = require("../controllers/taskController");

const router = express.Router();

// Task Routes
router.post("/", createTask);              // POST /api/tasks → Create task
router.get("/", getAllTasks);              // GET /api/tasks → Get all tasks
router.get("/:id", getTaskById);           // GET /api/tasks/:id → Get task by ID
router.patch("/:id", updateTask);          // PATCH /api/tasks/:id → Update task

module.exports = router;

const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// 1. CREATE A TASK INSIDE A PROJECT
// router.post('/create', auth, async (req, res) => {
//   try {
//     const { projectId, title, description, assignedTo, dueDate } = req.body;

//     const newTask = new Task({
//       projectId,
//       title,
//       description,
//       assignedTo, // Collaboration (User ID)
//       dueDate
//     });

//     const savedTask = await newTask.save();
//     res.status(201).json(savedTask);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// CREATE TASK WITH ASSIGNED MEMBER NAME
router.post('/create', auth, async (req, res) => {
  try {
    const { projectId, title, description, assignedTo, dueDate } = req.body;

    const newTask = new Task({
      projectId,
      title,
      description,
      assignedTo: assignedTo || "Unassigned", // Frontend dropdown se naam milega
      dueDate
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET ALL TASKS OF A SPECIFIC PROJECT (For Kanban Board)
router.get('/project/:projectId', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId }).populate('assignedTo', 'name email');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. TRACKING: UPDATE TASK STATUS OR DETAILS (e.g., Move from To-Do to Done)
router.put('/:taskId/update', auth, async (req, res) => {
  try {
    const { title, description, status, assignedTo, dueDate } = req.body;

    // Status validate karein agar user update kar raha hai
    if (status && !['To-Do', 'In Progress', 'Done'].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      { title, description, status, assignedTo, dueDate },
      { new: true } // updated document return karne ke liye
    );

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
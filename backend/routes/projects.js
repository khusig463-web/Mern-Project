const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const User = require('../models/User');
const auth = require('../middleware/auth'); // Hamein har route par check karna hai ki user logged in hai ya nahi

// 1. CREATE A NEW PROJECT
router.post('/create', auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    
    // req.user.id hamein auth middleware se mil raha hai (logged-in user)
    const newProject = new Project({
      title,
      description,
      owner: req.user.id,
      members: [req.user.id] // Owner khud bhi member list mein hoga
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET ALL PROJECTS FOR THE LOGGED-IN USER
router.get('/my-projects', auth, async (req, res) => {
  try {
    // Wo saare projects dhoondo jismein user ya toh owner hai ya fir member array mein hai
    const projects = await Project.find({ members: req.user.id }).populate('owner', 'name email');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD A MEMBER BY NAME DIRECTLY
router.post('/:projectId/add-member', auth, async (req, res) => {
  try {
    const { name } = req.body; // Email ki jagah name le rahe hain
    const project = await Project.findById(req.params.projectId);

    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.members.includes(name)) {
      return res.status(400).json({ message: "Member already added." });
    }

    project.members.push(name);
    await project.save();

    res.json({ message: `${name} added successfully!`, members: project.members });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// DELETE A PROJECT
router.delete('/:projectId', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // Check karo ki delete karne waala owner hi hai na
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this project" });
    }

    await Project.findByIdAndDelete(req.params.projectId);
    res.json({ message: "Project deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET A SINGLE PROJECT BY ID
router.get('/:projectId', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
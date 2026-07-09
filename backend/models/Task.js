// const mongoose = require('mongoose');

// const TaskSchema = new mongoose.Schema({
//   projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
//   title: { type: String, required: true },
//   description: { type: String },
//   status: { type: String, enum: ['To-Do', 'In Progress', 'Done'], default: 'To-Do' }, // For tracking
//   assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // For collaboration
//   dueDate: { type: Date }
// }, { timestamps: true });

// module.exports = mongoose.model('Task', TaskSchema);







const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['To-Do', 'In Progress', 'Done'], default: 'To-Do' },
  assignedTo: { type: String, default: "Unassigned" }, // ID ki jagah ab Member Name save hoga!
  dueDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: String }] // Ab yahan direct names (Strings) save honge!
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
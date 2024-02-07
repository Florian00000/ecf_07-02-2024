const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new mongoose.Schema({
    projectName: { type: String, require: true},
    projectDescription: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User'}
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project; 
const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new mongoose.Schema({
    taskTitle: { type: String, required: true},
    taskDescription: { type: String, required: false},
    priority: { type: Boolean, default: true},
    deadline: { type: Date, required: false},
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true}
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
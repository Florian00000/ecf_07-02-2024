const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.post("/create", taskController.createTask);
router.get("/getTasks/:id", taskController.getAllTaskByProject);
router.put("/update/:idProject/:idTask", taskController.updateTask);
router.delete("/deleteTask/:idProject/:idTask", taskController.deleteTask);
router.put("/changePriority/:idProject/:idTask", taskController.changePriority);

module.exports = router;
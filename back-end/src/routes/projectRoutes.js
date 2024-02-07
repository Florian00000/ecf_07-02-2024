const express = require('express');
const projectController = require('../controllers/projectController');

const router = express.Router();

router.post("/create", projectController.createProject);
router.get("/getMyProjects", projectController.getAllProjectsByUser);
router.put("/updateProject/:id", projectController.updatePoject);
router.delete("/deleteProject/:id", projectController.deleteProject);

module.exports = router;
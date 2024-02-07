const Task = require("../models/task");
const Project = require("../models/project");

const taskController = {
    createTask: async (req, res) => {
        const { taskTitle, taskDescription, deadline, projectId} = req.body;        

        //On crée un nouvel objet tâche
        const newTache = new Task({
            taskTitle: taskTitle,
            taskDescription: taskDescription,
            deadline: deadline,
            projectId: projectId
        });
        try {
            await newTache.save();
            res.status(201).json(newTache);
        } catch (error) {
            res.status(400).json({ error: error.message});
        }
    },

    getAllTaskByProject: async (req, res) => {
        //On récuppère l'id du projet 
        const projectId = req.params.id

        try {
            const tasks = await Task.find({ projectId: projectId });
            res.status(200).json(tasks);
        } catch (error) {
            res.status(400).json({ error: error.message});
        }
    },

    updateTask: async (req, res) => {
        //On réccuppère les informations sur le projet
        const { taskTitle, taskDescription, deadline } = req.body;
        const projectId = req.params.idProject;
        const taskId = req.params.idTask;

        //On récuppère l'id de la personne identifiée
        const userId = req.auth.userId;

        try {
            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ error: "Tâche non trouvée" });
            } else {

                //On vérifie le projet
                const project = await Project.findById(projectId);
                if (!project) {
                    return res.status(404).json({ error: "Projet non trouvé" });
                }else{
                    if (project.userId != userId) {
                        return res.status(403).json("Vous ne pouvez pas modifier ce projet");
                    } else {
                        //Si l'utilisateur est bien en lien avec le projet, on peut modifier la tâche
                        const taskUpdated = await Task.updateOne({_id: taskId}, {$set: {taskTitle: taskTitle, taskDescription: taskDescription, deadline: deadline}})
                        //Vérification de la modification de la tâche
                        if (taskUpdated.modifiedCount ===  1) {
                            return res.status(200).json("Tâche mise à jour avec succès");
                        } else {
                            return res.status(500).json({ error: "Échec de la mise à jour de la tâche" });
                        }
                    }
                }                
            }
        } catch (error) {
            res.status(400).json({ error: error.message});
        }
    },

    deleteTask: async (req, res) => {
        const projectId = req.params.idProject;
        const taskId = req.params.idTask;

        //On récuppère l'id de la personne identifiée
        const userId = req.auth.userId;

        try {
            //On vérifie la tâche
            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ error: "Tâche non trouvée" });
            };

            //On vérifie le projet
            const project = await Project.findById(projectId);
            if (!project) {
                return res.status(404).json({ error: "Projet non trouvé" });
            }

            //On vérifie les droits de l'utilisateur
            if (project.userId != userId) {
                return res.status(403).json("Vous ne pouvez pas modifier ce projet");
            } else {
                await Task.findByIdAndDelete(taskId);
                res.status(200).json("Tâche supprimé avec succès");
            }
        } catch (error) {
            res.status(400).json({ error: error.message});
        }
    },

    changePriority: async (req, res) => {
        const projectId = req.params.idProject;
        const taskId = req.params.idTask;

        //On récuppère l'id de la personne identifiée
        const userId = req.auth.userId;
        try {
            //On vérifie la tâche
            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ error: "Tâche non trouvée" });
            };

            //On vérifie le projet
            const project = await Project.findById(projectId);
            if (!project) {
                return res.status(404).json({ error: "Projet non trouvé" });
            }

            //On vérifie les droits de l'utilisateur
            if (project.userId != userId) {
                return res.status(403).json("Vous ne pouvez pas modifier ce projet");
            } else {
                //On modifie l'objet tâche
                task.priority = !task.priority;
                
                const taskUpdated = await Task.updateOne({_id: taskId}, {$set: {priority: task.priority}})
                //Vérification de la modification de la tâche
                if (taskUpdated.modifiedCount ===  1) {
                    return res.status(200).json("Priorité de la tâche mise à jour avec succès");
                } else {
                    return res.status(500).json({ error: "Échec de la mise à jour de la priorité de la tâche" });
                }
            }

        } catch (error) {
            res.status(400).json({ error: error.message});
        }
    }
}

module.exports = taskController;
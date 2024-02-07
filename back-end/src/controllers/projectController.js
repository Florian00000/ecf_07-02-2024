const Project = require('../models/project');

const projectController = {
    createProject: async (req, res) => {
        const { projectName, projectDescription} = req.body;
        const userId = req.auth.userId;

        //On crée un nouvel objet projet
        const newProject = new Project({
            projectName: projectName,
            projectDescription: projectDescription,
            userId: userId
        });
        try {
            await newProject.save();
            res.status(201).json(newProject);
        } catch (error) {
            res.status(400).json({ error: error.message});
        }
    },

    getAllProjectsByUser: async (req, res) => {
        //On récuppère l'id de la personne identifiée
        const userId = req.auth.userId;

        try {
            const projects = await Project.find({userId: userId});
            res.status(200).json(projects);
        } catch (error) {
            res.status(400).json({ error: error.message});
        }
    },

    updatePoject: async (req, res) => {
        //On récuppère les informations sur le projet
        const { projectName, projectDescription} = req.body;
        const projectId = req.params.id;

        //On récuppère l'id de la personne identifiée
        const userId = req.auth.userId;

        try {
            const project = await Project.findById(projectId);
            if (!project) {
                return res.status(404).json({ error: "Projet non trouvé" });
            }
            //Si le projet existe, on vérifie que l'utilisateur peut modifier le projet, et on le modifie ensuite
            if (project.userId == userId) {
                const projectUpdated = await Project.updateOne({ _id: projectId }, { $set: { projectName: projectName, projectDescription: projectDescription } });
                //Vérification de la modification du projet
                if (projectUpdated.modifiedCount === 1) {
                    return res.status(200).json("Projet mis à jour avec succès");
                } else {                    
                    return res.status(500).json({ error: "Échec de la mise à jour du projet" });
                }
            } else {
                res.status(403).json("Vous ne pouvez pas modifier ce projet");
            }
        } catch (error) {
            res.status(400).json({ error: error.message});
        }
    },

    deleteProject: async (req, res) => {
        const projectId = req.params.id;

        //On récuppère l'id de la personne identifiée
        const userId = req.auth.userId;

        try {
            const project = await Project.findById(projectId);
            if (!project) {
                return res.status(404).json({ error: "Projet non trouvé" });
            }else{
                //Si le projet existe, on vérifie qu'il s'agit bien d'un projet de l'utilisateur
                if (project.userId == userId) {
                    //On supprime alors le projet
                    await Project.findByIdAndDelete(projectId);
                    res.status(200).json("Projet supprimé avec succès")
                } else {
                    res.status(403).json("Vous ne pouvez pas supprimer ce projet");
                }
            }
        } catch (error) {
            res.status(400).json({ error: error.message});
        }
    }
}; 

module.exports = projectController;
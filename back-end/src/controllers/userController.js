const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    signup: (req, res) => {
        const { username, password } = req.body;

        //on hash le mdp avant de créer l'objet à envoyer dans la bdd
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) throw err;
            const newUser = new User({
                username: username,
                password: hash
            });
            try {
                //On enregistre l'utilisateur
                await newUser.save();
                res.status(201).json(newUser);
            } catch (error) {
                res.status(400).json({ error: error.message});
            }
        })
    },

    login: async (req, res) => {
        const { username, password } = req.body;

        try {
            //On recherche l'utilisateur dans la bdd
            const user = await User.findOne({ username: username})
            if (!user) {
                return res.status(401).send("Pseudo ou mot de passe incorrect");
            }else{
                //Si l'utilisateur existe, on vérifie le mdp et on renvoie un token jwt avec en info l'id de l'utilisateur
                bcrypt.compare(password, user.password, (_err, result) => {
                    if (result) {
                        res.status(200).json({
                            //On crée un jwt avec dans le payload l'id de l'utilisateur
                            token: jwt.sign({ 
                                userId: user.id,
                                username: user.username
                             }, "RANDOM_TOKEN_SECRET", {
                                expiresIn: "1d", //Le token expire dans 1 jour
                            })
                        })
                    } else {
                        res.status(401).send("Pseudo ou mot de passe incorrect");
                    }
                })
            }


        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = userController;
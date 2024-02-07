const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        //On met des informations sur l'utilisateur dans la requête
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        const userId = decodedToken.userId;
        const username = decodedToken.username
        req.auth = {
            userId: userId,
            username: username
        }

        return next();
    } catch (error) {
        res.status(401).json({ message: "Merci de vous connecter pour accéder à cette page" });
    }
}

module.exports = isAuthenticated;
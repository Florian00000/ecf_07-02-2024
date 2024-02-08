const expres = require('express');
const app = expres();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

const userRoutes = require('./src/routes/userRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

const isAuthenticated = require('./src/middlewares/authentification');

//mongoose
const mongoose = require('mongoose');
const taskController = require('./src/controllers/taskController');
mongoose.connect('mongodb://localhost:27017/ecf_project_management');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB'));
db.once('open', () => {
    console.log("Coonecté à Mongo DB");
});

app
.use(expres.json())
.use(cors())
.use("/api/user", userRoutes)
.use("/api/project", isAuthenticated, projectRoutes)
.use("/api/task", isAuthenticated, taskRoutes);


//On lance le serveur
app.listen(PORT, () => {
    console.log(`serveur en route sur http://localhost:${PORT}`);
});
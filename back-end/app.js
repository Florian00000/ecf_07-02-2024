const expres = require('express');
const app = expres();
const PORT = process.env.PORT || 3000;
const userRoutes = require('./src/routes/userRoutes');

//mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ecf_project_management');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB'));
db.once('open', () => {
    console.log("Coonecté à Mongo DB");
});

app
.use(expres.json())
.use("/api/user", userRoutes);

//On lance le serveur
app.listen(PORT, () => {
    console.log(`serveur en route sur http://localhost:${PORT}`);
});
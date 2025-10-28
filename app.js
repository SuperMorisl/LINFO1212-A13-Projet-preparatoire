var express = require('express');
var session = require('express-session');
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");
const path = require('path');
const { MongoClient } = require('mongodb');

// Connexion à la database
const client = new MongoClient("mongodb://localhost:27017");
let incidentsCollection = null; // Collection incidents

// Initialisation DB + seed si vide
async function initDB() {
    await client.connect();
    const dbo = client.db("incidents");
    incidentsCollection = dbo.collection("incidents");
    console.log("Connexion à MongoDB réussie !");

    // Si la collection est vide, on la remplie automatiquement avec les données du fichier JSON
    const count = await incidentsCollection.countDocuments();
    if (count === 0) {
        const dataRaw = fs.readFileSync(path.join('database', 'problems.json'), 'utf8');
        const documents = dataRaw
            .split("\n") // les sauts à la ligne marque un élément
            .filter(line => line.trim() !== '') // ignore les lignes vides
            .map(line => JSON.parse(line)); // chaque ligne JSON -> JS
        await incidentsCollection.insertMany(documents); // Puis on insert les entrées dans la collection vide
        console.log("La collection 'incidents' a bien été initialisée !");
    }
}

// Récupération des incidents
async function getIncidents() {
    // on recupère toutes les données si la collection 'incidents' existe
    if (!incidentsCollection) throw new Error("La collection incidents n'a pas été trouvée...");
    return await incidentsCollection.find().toArray();
}


// Configuration de l'app
app.use(session({ // On crée une session (Cookies)
  secret: 'monsecret',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static('static'));  // Utilise les fichiers de front-end du dossier static
app.set('views', 'templates'); // Les fichiers html/ejs sont dans templates
app.set('view engine', 'ejs'); // On utilise ejs comme moteur de vue
app.use(bodyParser.urlencoded({ extended: true })); // Permet de recupérer les éléments obtenus par la méthode POST


// Route de la page d'accueil
app.get('/', async function (req, res) {
  try {
    const incidents = await getIncidents();
    res.render('index', {
      today: new Date().toLocaleDateString('fr-FR',
        {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
      username: req.session.username,
      incidents: incidents   //les incidents sont stockés dans incidents
    })
  } catch (err) {
    res.status(500).send("Probléme avec la récup des données dans la db");
  }
});

// Route de la page login
app.get('/login', function (req, res) {
  res.render('login', { error: null }); // error permet de vérifier si le mot de passe est correct (voir dans login.ejs)
});

// Fonction qui regarde le résultat du formulaire (login)
app.post('/login', function (req, res) {
  if (req.body.username && req.body.password == "admin123456789") {
    req.session.username = req.body.username;   // Stocke dans le username dans la session
    res.redirect('/');
  }
  else {
    res.render('login', { error: "Mot de passe incorrect" });
  }
  console.log("Page login :", req.body); // Pour le debugging (voir ce que l'utilisateur a entrée comme username et mot de passe)
});

// Route de la page report
app.get('/report', function (req, res) {
  if (req.session.username) { // On peut report que si on est connecté, sinon on est redirigé vers la page de connexion
    res.render('report', { username: req.session.username });
  }
  else {
    res.render('login', { error: "Pour reporter un incident il faut être connecté" })
  }
});

// Fonction qui regarde le résultat du formulaire (report)
app.post('/report', function (req, res) {
  if (req.session.username) { // Si l'utilisateur est connecté, on stocke la description et l'adresse dans la session
    req.session.description = req.body.description;
    req.session.adresse = req.body.adresse;
    res.redirect('/');
  }
  else {
    res.redirect('login'); // error permet de vérifier si le mot de passe est correct (voir dans login.ejs)
  }
  console.log("Page report : ", req.body); // Pour le debugging (voir ce que l'utilisateur a entrée comme username et mot de passe)
});


// Démarrage du serveur après initialisation de la DB
async function startServer() {
    try {
        await initDB();              // On attend que la DB soit prête
        app.listen(8080);            // Puis on démarre le serveur
        console.log("Url du serveur : http://localhost:8080");
    } catch (err) {
        console.error("Erreur lors de l'initialisation de MongoDB... :", err);
    }
}

startServer();  

module.exports = app; // Pour les SuperTests
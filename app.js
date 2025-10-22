var express = require('express');
var session = require('express-session');
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");
const { builtinModules } = require('module');
const { MongoClient } = require('mongodb');


//configuration et connexion a la db
async function getIncidents() {
  const client = await MongoClient.connect("mongodb://localhost:27017/");
  const dbo = client.db("incidents");
  const result = await dbo.collection("incidents").find({}).toArray();
  client.close();
  return result;
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
app.get('/', async function (req, res, next) {
  try{
  const incidents = await getIncidents();
  res.render('index', {
    today: new Date().toLocaleDateString('fr-FR', 
    { weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric' }),
    username: req.session.username,
    incidents : incidents         //les incidents sont stcokés dans incidents
  })
  }catch (err) {
    res.status(500).send("Probléme avec la récup des données dans la db");
  }
});

// Route de la page login
app.get('/login', function (req, res, next) {
  res.render('login', { error: null }); // error permet de vérifier si le mot de passe est correct (voir dans login.ejs)
});

// Fonction qui regarde le résultat du formulaire (login)
app.post('/login', function (req, res, next) {
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
app.get('/report', function (req, res, next) {
  if (req.session.username) { // On peut report que si on est connecté, sinon on est redirigé vers la page de connexion
    res.render('report', { username: req.session.username });
  }
  else {
    res.render('login', {error: "Pour reporter un incident il faut être connecté"})
  }
});

// Fonction qui regarde le résultat du formulaire (report)
app.post('/report', function (req, res, next) {
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

app.listen(8080);
console.log("Url du serveur : http://localhost:8080");

module.exports = app; // Pour les SuperTests
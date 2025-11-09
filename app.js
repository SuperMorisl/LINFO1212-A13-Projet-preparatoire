var express = require('express');
var session = require('express-session');
var app = express();
var bodyParser = require("body-parser");

const checkuserInput = require('./tests/checkInput');
const checkReportInput = require('./tests/checkReportInput');

const { initDB, getIncidents } = require('./database/db');
let incidentsCollection = null; // Collection incidents
let loginCollection = null; // Collection login

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
      incidents: incidents,   // Les incidents sont stockés dans incidents
      error: null
    })
  } catch (err) {
    res.status(500).send("Probléme avec la récup des données dans la db");
  }
});

// Route de la page login
app.get('/login', function (req, res) {
  res.render('login', { error: null, hasAccount: null }); // error permet de vérifier si le mot de passe est correct (voir dans login.ejs)
});

// Fonction qui regarde le résultat du formulaire (login)
app.post('/login', async function (req, res) {

  try {
    const actualUser = await loginCollection.findOne({ username: req.body.username }); // On réccupère l'utilisateur s'il existe dans la db
    if (actualUser && req.body.password == actualUser.password) { // Vérification de si l'utilisateur existe dans db
      req.session.username = req.body.username;   // Stocke le username dans la session
      res.redirect('/');
    }
    else if (!actualUser) {
      res.render('login', { error: "Utilisateur non trouvé", hasAccount: true });
    }
    else if (req.body.password != actualUser.password) {
      res.render('login', { error: "Mot de passe incorrect", hasAccount: true });
    }
  }
  catch (err) {
    res.status(500).send("Probléme avec la récup des données dans la db");
  }

});

// Fonction qui regarde le résultat du formulaire (register)
app.post('/register', async function (req, res) { // Il faudra rajouter des tests pour cette partie 
  try {
    const user = await loginCollection.findOne({ username: req.body.username });
    if (user) { // si l'utilisateur existe déjà dans la db
      res.render('login', { error: "L'utilisateur existe déjà", hasAccount: false });
    }
    else if (req.body.username && req.body.password && req.body.name && req.body.email) {
      if (!checkuserInput.isValidUsername(req.body.username)) {
        res.render('login', { error: "Nom d'utilisateur invalide", hasAccount: false });
      }
      if (!checkuserInput.isValidEmail(req.body.email)) {
        res.render('login', { error: "Adresse email invalide", hasAccount: false });
      }
      if (!checkuserInput.isValidPassword(req.body.password)) {
        res.render('login', { error: "Mot de passe invalide", hasAccount: false });
      }

      const newUser = { "username": req.body.username, "password": req.body.password, "name": req.body.name, "email": req.body.email };
      await loginCollection.insertOne(newUser);
      console.log("Nouvel utilisateur ajouté :", req.body.username); // Pour vérifier que ça fonctionne bien
      // /!\ le nouvel utilisateur n'est pas ajouté dans le fichier .json
      req.session.username = req.body.username;
      res.redirect('/');
    }
  }
  catch (err) {
    res.status(500).send("Probléme avec la récup des données dans la db");
  }
});

// Route de la page report
app.get('/report', function (req, res) {
  if (req.session.username) { // On peut report que si on est connecté, sinon on est redirigé vers la page de connexion
    res.render('report', { username: req.session.username, error: null });
  }
  else {
    res.render('login', { error: "Pour reporter un incident il faut être connecté", hasAccount: true }) // hasAccount ici est arbitraire
  }
});

// Fonction qui regarde le résultat du formulaire (report)
app.post('/report', async function (req, res) {
  if (!checkReportInput.isValidDescription(req.body.description)) {
    res.render('report', { username: req.session.username, error: "Description invalide" });
  }
  else if (!checkReportInput.isValidAdress(req.body.adresse)) {
    res.render('report', { username: req.session.username, error: "Adresse invalide" });
  }
  else {
    req.session.description = req.body.description;
    req.session.adresse = req.body.adresse;
    const date = `${String(new Date().getDate()).padStart(2, '0')}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${new Date().getFullYear()}`;
    const newIncident = { "Description": req.session.description, "Adresse": req.session.adresse, "Username": req.session.username, "Date": date }; // Rajouter l'incident entré par l'utilisateur 
    await incidentsCollection.insertOne(newIncident);
    console.log("Un incident a bien été ajouté à la base de données !"); // pour tester 
  }
  res.redirect('/');
});

// Fonction pour la barre de recherche de la page index
app.post('/search', async function (req, res) { // Il faudra passer les tests pour vérifier que l'adresse entrée est bien valide 
  const adress = req.body.searchBar.trim(); // On réccupère l'adresse entrée par l'utilisateur et on vérifie qu'il n'y ait pas d'espaces à la fin et/ou au début

  try {

    if (adress && adress !== "") { // Si l'utilisateur entre une adresse
      const incidents = await incidentsCollection.find({ "Adresse": { $regex: adress, $options: "i" } }).toArray(); // De sorte que en majuscule ou minuscule l'adresse soit prise en compte 

      if (incidents.length > 0) {
        res.render('index', {
          today: new Date().toLocaleDateString('fr-FR',
            {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
          username: req.session.username,
          incidents: incidents,
          error: null
        });
      }

      else {
        res.render('index', {
          today: new Date().toLocaleDateString('fr-FR',
            {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
          username: req.session.username,
          incidents: incidents,
          error: "Aucun incident n'a été signalé à l'adresse fournie."
        });
      }
    }

    else {
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
        incidents: incidents,
        error: null
      });
    }

  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur dans la réccupération des données");
  }

})

// Démarrage du serveur après initialisation de la DB
async function startServer() {
  try {
    const db = await initDB();              // On attend que la DB soit prête
    incidentsCollection = db.incidentsCollection;
    loginCollection = db.loginCollection;
    app.listen(8080);            // Puis on démarre le serveur
    console.log("Url du serveur : http://localhost:8080");
  } catch (err) {
    console.error("Erreur lors de l'initialisation de MongoDB... :", err);
  }
}

startServer();

module.exports = app; // Pour les SuperTests
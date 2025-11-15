const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Connexion à la database
const client = new MongoClient("mongodb://localhost:27017");
let incidentsCollection = null; // Collection incidents
let loginCollection = null; // Collection login

// Initialisation DB + seed si vide
async function initDB() {
  await client.connect();
  const dbo = client.db("fixmycity");
  incidentsCollection = dbo.collection("incidents");
  loginCollection = dbo.collection("login");
  console.log("Connexion à MongoDB (fixmycity) réussie !");

  // Si la collection est vide, on la remplie automatiquement avec les données du fichier JSON
  const countIncidents = await incidentsCollection.countDocuments();
  if (countIncidents === 0) {
    const dataRaw = fs.readFileSync(path.join('database', 'problems.json'), 'utf8');
    const documents = dataRaw
      .split("\n") // les sauts à la ligne marque un élément
      .filter(line => line.trim() !== '') // ignore les lignes vides
      .map(line => JSON.parse(line)); // chaque ligne JSON -> JS
    await incidentsCollection.insertMany(documents); // Puis on insert les entrées dans la collection vide
    console.log("La collection 'incidents' a bien été initialisée !");
  }

  // Même chose mais pour la collection login
  const countUsers = await loginCollection.countDocuments();
  if (countUsers === 0) {
    const dataRaw = fs.readFileSync(path.join('database', 'login.json'), 'utf8');
    const documents = dataRaw
      .split("\n")
      .filter(line => line.trim() !== '')
      .map(line => JSON.parse(line));
    await loginCollection.insertMany(documents);
    console.log("La collection 'login' a bien été initialisée !");
  }

  return { incidentsCollection, loginCollection };
}

// Récupération des incidents
async function getIncidents() {
  // on recupère toutes les données si la collection 'incidents' existe
  if (!incidentsCollection) throw new Error("La collection incidents n'a pas été trouvée...");
  return await incidentsCollection.find().toArray();
}

module.exports = {
  initDB,
  getIncidents
};
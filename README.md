# 🎓 LINFO1212 : Projet préparatoire

## 👥 Membres du groupe A13 :
- **P. Maurice**
- **B. Younes**
- **S. Sofia**

## 🎯 Objectif du projet
L'objectif de ce projet est de créer une **application web** dans le style de **(https://fixmystreet.brussels)**.  
Celle-ci permettra à des citoyens de la commune d'**Ottignies-Louvain-la-Neuve** de **reporter des incidents** ayant eu lieu dans l'espace public.

## 🗂️ Organisation du projet

#### 📁 Database
- Fichiers **.JSON**

#### 📁 Features
- Fichiers **.features**

#### 📁 Static
- Fichiers "photos" (**.png, .jpg**,...)
- Fichier **.css**
- Fichier **.js**
  
#### 📁 Templates
- Fichiers **.ejs**

#### 📁 Tests
- Fichiers **.test.js**
  
#### 🌱 Racine
- 📄 **README**
- **.gitignore**
- **app.js**
- **package.json**

## 🛠️ Stack
### 🎨 - Front-end
**HTML/CSS, JavaScript**

### ⚙️ - Back-end
**Node.js, MongoDB**

## ❓ Comment utiliser le projet ?

Après avoir cloné le projet :  
- `git clone git@github.com:SuperMorisl/LINFO1212-A13-Projet-preparatoire.git`  

Installez les dépendances (assurez-vous d’avoir **Node.js** et **MongoDB** installés sur votre machine) :  
- `npm install`  

---
#### 🔹 Lancer l'application web
`sudo systemctl start mongod`
`node app.js`

---
#### 🔹 Exécuter les tests  
`npm test`  

---
#### 🔹 Explorer la base de données (après avoir lancé l'application web !)  
`sudo systemctl start mongod`  
`mongosh`  
`use fixmycity`

2 collections :  
- 🧾 **incidents** `db.incidents.find()`
- 👤 **login** `db.login.find()`

---

## 📅 Échéances
- 📌 **Fin de la phase préparatoire 1** pour le **30/09/2025**

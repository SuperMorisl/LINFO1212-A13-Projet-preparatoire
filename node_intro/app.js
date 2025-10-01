const express = require('express');
const path = require('path');
const app = express();

// configurer EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// servir fichiers statiques
app.use(express.static(path.join(__dirname, 'static')));


// route de test
app.get('/hello',(req,res) => {
      res.send(`
    Hola el mundo!<br>
    привет мир !<br>
    Hello World!<br>
    你好世界<br>
    Bonjour le monde!<br>
    Buona notte!<br>
    مرحبا بالعالم<br>
    Hallo Welt!<br>
    здравей свят!<br>
    hei maailma!<br>
    mbote na mokili!<br>
    hallo wereld!<br>
    안녕하세요 세계<br>
    හලෝ ලෝකය<br>
    merhaba dünya
  `);
})
// route page d'accueil
app.get('/', (req, res) => {
  res.render('index', { today: new Date() }); 
});

// route login
app.get('/login', (req, res) => {
  res.render('login');
});

// route report
app.get('/report', (req, res) => {
  res.render('report');
});

app.listen(8080, () => {
  console.log("On est good : http://localhost:8080");
});

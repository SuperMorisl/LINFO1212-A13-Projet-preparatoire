var express = require('express');
var session = require('express-session');
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");

app.use(session({
  secret: 'monsecret',       
  resave: false,             
  saveUninitialized: true    
}));

app.use(express.static(__dirname + '/static'));  // poir les fichiers static

// configurer EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/templates');
app.use(bodyParser.urlencoded({ extended: true })); 


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
app.get('/', function(req, res, next)  {
  res.render('index', { today: new Date(), username: req.session.username || null }); 
});

// route login
app.get('/login', function(req, res,next)  {
  res.render('login',{ error: null });
});
app.post('/login', function(req,res,next){
  if (req.body.username && req.body.password == "123pass"){
  req.session.username = req.body.username;   // stocke dans la session
  res.redirect('/');  
  }else {
    res.render('login', { error: "Mot de passe incorrect" });

  }
  console.log(req.body);
});

// route report
app.get('/report', function(req, res) {
  res.render('report');
});


app.listen(8080);
import express from 'express';
import immeuble from './models/immeuble.js';


const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"))

app.set('view engine', 'ejs');

app.get("/", async function (req, res) {
  const room1 = await immeuble.loadMany();
  let totalarea = ""
  res.render('listImmeuble.ejs', { room1, totalarea });
});

app.post("/add", async function (req, res) {
  const newligne = new immeuble();
  newligne.name = req.body.name
  newligne.length = req.body.length
  newligne.width = req.body.width
  await newligne.save();
  res.redirect('/');
});

app.post("/calcul", async function (req, res) {
  const room2 = await immeuble.loadMany();
  let totalarea = 0
  for(let elem of room2){
    let area = elem.length * elem.width 
    totalarea += area 
  }
  res.render('listImmeuble.ejs', { room1 : room2, totalarea });
});

app.post("/calculoneroom", async function (req, res) {
  const room3 = await immeuble.loadMany();
  let onearea = 0
  for(let elem of room3){
    let area = elem.length * elem.width 
    onearea += area 
  }
  res.render('Ajout.ejs', { room1 : room3, onearea });
});

app.get("/addapiece", async function(req,res){
  const room4 = await immeuble.loadMany();
  let totalarea = 0
  for(elem of room4){
    let area = elem.length * elem.width 
    totalarea += area 
  }
  res.render("Ajout.ejs",{ room1 : room4, totalarea}) 
})

app.get("/delete/:id", async function (req, res) {
  await immeuble.delete({ id: req.params.id });
  res.redirect('/');
});

app.get("/autrepiece", async function (req, res) {
  res.render('Ajout.ejs');
});



app.listen(80);

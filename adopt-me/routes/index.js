const express = require('express');
const data = require('../data/data.json');
const axios = require('axios');

const router = express.Router();
let animals = [];//arreglo sin imagen

let finalAnimals = [];//arreglo con imagen

for (let i = 0; i < 10; i ++){
  animals.push(data[i])
}

/* GET home page. */
router.get('/', async function (req, res, next) {
  //El arreglo de animales lo convierte en promesas
  const animalsPromises = animals.map(() => {
    return new Promise((resolve, reject) => {
      axios.get('https://api.thecatapi.com/v1/images/search')
        //body es como el response
        .then(function ({ data}) {
          const [cat] = data;
          const { url } = cat;
          resolve(url);
        }).catch(function (error) {
          reject(error);
        });
    });
  });
  //Resuelve todas las promesas ejecutandose en paralelo
  Promise.all(animalsPromises)
    //las promesas rgresan en el object de urls
    .then(function (urls) {
      const animalsWithImage = animals.map((animal, index) => ({ ...animal, image: urls[index]}));
      //finalAnimals.push(animalsWithImage)
      res.render('index', { animalsWithImage });
    })
    .catch(function(errors){
      res.send(`${errors}`)
    });
});

router.get('/:id', (req, res) => {
  const {id, imageUrl} = req.params;
  const {url} = req.query;
  const animal = animals.find(animal => animal.id == id)
  res.render('details', {animal: animal, image: url})
});

router.get('/adopt/:id', (req, res) => {
  const {id} = req.params;
  const animal = animals.find(animal => animal.id == id)
  res.render('adopt', {animal: animal})
})


module.exports = router;
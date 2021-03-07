const express = require('express');
const router = express.Router();
const Joi = require('joi');
const animalsAPI = require('../Animals/animalsAPI')
const usersAPI = require('../Users/userAPI')

let finalAnimals = animalsAPI.getArray();
let userData = usersAPI.getData();

const schema = Joi.object({
  animalname: Joi.string().min(5).required(),
  breedname: Joi.string(),
  speciesname: Joi.string(),
  animalage: Joi.string().required(),
  basecolour: Joi.string(),
  owner: Joi.string()

});


/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('index', { finalAnimals, isLogged:Boolean(req.user) });
});

router.get('/:id', (req, res) => {
  const { id, imageUrl } = req.params;
  const { url } = req.query;
  const animal = animalsAPI.getAnimalById(id)
  console.log(animal)
  res.render('details', { animal: animal, image: url, isLogged:Boolean(req.user) })
});

router.get('/adopt/:id', (req, res) => {
  const { id } = req.params;
  const animal = animalsAPI.getAnimalById(id)
  res.render('adopt', { animal: animal, isLogged:Boolean(req.user) })
})

router.post('/owner/:id', function (req, res) {
  const iduser = req.body.iduser
  const { id } = req.params;
  const animal = animalsAPI.getAnimalById(id)
  animal.owner = userData.find(user => user.id == iduser).fullName;
  res.render('index', { finalAnimals, isLogged:Boolean(req.user) });
})

//Creamos animal
router.post('/animals', function (req, res) {
  const { animalname, breedname, speciesname, animalage, basecolour, owner } = req.body;
  const result = schema.validate({ animalname, breedname, speciesname, animalage, basecolour, owner });
  if (result.error) return res.status(400).send(result.error.details[0].message);
  const animal = animalsAPI.createAnimal(animalname, breedname, speciesname, animalage, basecolour, owner);
  res.send(animal);
});

//Actulizamos animal
router.put('/animals/:id', function (req, res) {
  const { id } = req.params
  const { animalname, breedname, speciesname, animalage, basecolour } = req.body;
  const result = schema.validate({ animalname, breedname, speciesname, animalage, basecolour })
  if (result.error) return result.status(400).send(result.error.deails)
  res.send(animalsAPI.updateAnimal(id, animalname, breedname, speciesname, animalage, basecolour));
})
//Eliminamos animal 
router.delete('/animals/:id', function (req, res) {
  const { id } = req.params;
  const animal = animalsAPI.deleteAnimal(id)
  res.send(animal);
})

module.exports = router;
var express = require('express');
var router = express.Router();
const Joi = require('joi');
const usersAPI = require('../Users/userAPI')

let finalUsers = usersAPI.getData()

const schema = Joi.object({
  fullName: Joi.string().min(5).required(),
  age: Joi.number().min(1).required()
})

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send({finalUsers});
});

//Creamos usuario
router.post('/users',function(req, res){
 const {fullName, age} = req.body;
 const result = schema.validate({ fullName, age});
  if (result.error) return res.status(400).send(result.error.details[0].message);
 const user = usersAPI.createUser(fullName, age)
 res.send(user);
})
//Actualizamos usuario
router.put('/users/:id',function(req, res, next){
  const {id} = req.params;
  const {fullName, age} = req.body
  const result = schema.validate({ fullName, age});
  if (result.error) return res.status(400).send(result.error.details[0].message);
  const user = usersAPI.updateUser(id,fullName,age)
  res.send(user);
})
//eliminamos usuario
router.delete('/users/:id',function(req, res, next){
  const {id} = req.params
  console.log(id)
  const user = usersAPI.deleteUser(id)
  res.send(user);
})
module.exports = router;

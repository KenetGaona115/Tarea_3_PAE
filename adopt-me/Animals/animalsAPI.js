
const data = require('../data/data.json');
const axios = require('axios');

let animals = [];//arreglo sin imagen

let finalAnimals = [];//arreglo con imagen

function getArray() {

    for (let i = 0; i < 10; i++) {
        animals.push(data[i])
    }
    //Creamos el arreglo final 
    const animalsPromises = animals.map(() => {
        return new Promise((resolve, reject) => {
            axios.get('https://api.thecatapi.com/v1/images/search')
                .then(function ({ data }) {
                    const [cat] = data;
                    const { url } = cat;
                    resolve(url);
                }).catch(function (error) {
                    reject(error);
                });
        });
    });

    Promise.all(animalsPromises)
        .then(function (urls) {
            const animalsWithImage = animals.map((animal, index) => ({ ...animal, image: urls[index], owner: "" }));
            finalAnimals.push(...animalsWithImage)
        })
        .catch(function (errors) {
            console.log(errors)
        });

    return finalAnimals;
}

function getAnimalById(id) {
    return finalAnimals.find(animal => animal.id == id)
}

function deleteAnimal(id) {
    const animalToDelete = getAnimalById(id)
    console.log(animalToDelete);
    finalAnimals.splice(finalAnimals.indexOf(animalToDelete), finalAnimals.indexOf(animalToDelete) + 1)
    console.log("Animal borrado")
    return animalToDelete
}

function updateAnimal(id, name, breed, specie, age, color) {
    getAnimalById(id).animalname = name;
    getAnimalById(id).breedname = breed;
    getAnimalById(id).speciesname = specie;
    getAnimalById(id).animalage = age;
    getAnimalById(id).basecolour = color;

    console.log("Animal actualizado")
    return getAnimalById(id);
}

function createAnimal(name, breed, specie, age, color, owner) {
    finalAnimals.push({
        id: finalAnimals.length + 1,
        animalname:name,
        breedname:breed,
        speciesname:specie,
        animalage:age,
        basecolour:color,
        owner
    })

    console.log("Animal creado")
    return getAnimalById(finalAnimals.length)
}

module.exports = {
    getArray: getArray,
    deleteAnimal: deleteAnimal,
    getAnimalById: getAnimalById,
    updateAnimal: updateAnimal,
    createAnimal: createAnimal
}
//importamos las dependencia mongoose
const { Schema, model } = require("mongoose");

// Segenera el esquema base
const User = new Schema({
    name: { type: String, require: true },
    email: String,
    picture: String,
});

// exportamon el schema generado
exports.user = model("user", User);
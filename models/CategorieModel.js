const { Schema, default: mongoose } = require("mongoose");

const categorieSchema =  new Schema({
    categ : {type : String , require : true}
})

const categorieModel = mongoose.model('Categorie' , categorieSchema)
module.exports = categorieModel
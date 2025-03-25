const { default: mongoose, Schema } = require("mongoose");

const projectSchema = new Schema({
   nom : {type : String , require : true}, 
   description : {type : String , require : true}, 
   date_debut : {type : Date , require : true}, 
   date_fin : {type : Date , require : true}, 
   status : {type : String , require : true}, 
   category_id : {type : mongoose.Types.ObjectId , ref : "Categorie" , require : true}, 
})

const ProjectModel = mongoose.model('Project' , projectSchema)
module.exports = ProjectModel
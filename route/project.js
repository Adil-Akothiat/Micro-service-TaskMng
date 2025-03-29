const express = require("express");
const Router = express.Router();
const { welcom, read_all , create, update, supprimer, search, read_one, create_categ} = require("../controllers/Project_Management");

// routes
Router.get('/', welcom);

Router.get('/all' ,read_all )

Router.get('/find/:id' , read_one)

Router.post('/add' , create)

Router.put('/update/:id' , update)

Router.delete('/delete/:id' , supprimer)

Router.post('/categ' , create_categ)

Router.get('/filter' , search)

module.exports = Router;

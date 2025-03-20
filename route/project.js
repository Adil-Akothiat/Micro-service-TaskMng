const express = require("express");
const Router = express.Router();
const { welcom, read , create, update, supprimer, search} = require("../controllers/Project_Management");

// routes
Router.get('/', welcom);

Router.get('/all' ,read )

Router.post('/add' , create)

Router.put('/update/:id' , update)

Router.delete('/delete/:id' , supprimer)

Router.get('/filter' , search)
module.exports = Router;

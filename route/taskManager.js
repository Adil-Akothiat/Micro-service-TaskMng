const express = require("express");
const Router = express.Router();
const { get } = require("../controllers/taskManager");

// routes
Router.get('/task', get);

module.exports = Router;

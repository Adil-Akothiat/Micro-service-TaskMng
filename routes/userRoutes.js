const express = require("express");

const{verifyToken,checkRole}=require("../middlewares/auth");
const userController = require("../controllers/userController");

const app = express();

app.post("/register",userController.register);
app.post("/login",userController.login);

// checkRole(["admin"])
app.get("/users",verifyToken,userController.getUser);
app.put("/:id",verifyToken,userController.updateUser);
app.delete("/:id",verifyToken,userController.deleteUser);
app.patch("/:id/block",verifyToken,userController.BlockUser);
app.get("/search",verifyToken,userController.search);

module.exports = app ;

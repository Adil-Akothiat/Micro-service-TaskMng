const express = require("express");

const{verifyToken,checkRole}=require("../middlewares/auth");
const userController = require("../controllers/userController");

const app = express();

app.post("/register",userController.register);
app.post("/login",userController.login);

// 
app.get("/users",verifyToken, checkRole(["admin"]),userController.getUser);
app.put("/:id",verifyToken,checkRole(["admin"]),userController.updateUser);
app.delete("/:id",verifyToken,checkRole(["admin"]),userController.deleteUser);
app.patch("/:id/block",verifyToken,checkRole(["admin"]),userController.BlockUser);
app.get("/search",verifyToken,checkRole(["admin"]),userController.search);

module.exports = app ;  
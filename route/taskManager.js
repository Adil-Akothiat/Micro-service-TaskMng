const express = require("express");
const Router = express.Router();
const { createTask, getTasks, getTask, updateTask, deleteTask, assignTaskToUser, removeTaskFromUser, getTaskByStatus, createComment, getComments, deleteComment } = require("../controllers/taskManager");

Router.post('/task/create', createTask);
Router.get("/tasks", getTasks);
Router.get("/tasks/:id", getTask);
Router.put("/tasks/:id", updateTask);
Router.delete("/tasks/:id", deleteTask);

// Assign task to user
Router.post("/userTask", assignTaskToUser);
Router.delete("/userTask", removeTaskFromUser);
Router.get("/tasksByStatus/:status", getTaskByStatus);

// task comments
Router.post("/comment", createComment);
Router.get("/comments/:userId/:taskId", getComments);
Router.delete("/comments/:id", deleteComment);

module.exports = Router;

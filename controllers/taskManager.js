const { errorHandler } = require("../errorHandler/error");
const { Task, UserTask, TaskComment } = require("../models/taskManager");

const createTask = (req, res)=> errorHandler(async ()=> {
    const { titre, description, date_debut, date_fin, status } = req.body;
    const task = new Task({ titre, description, date_debut, date_fin, status });
    await task.save();
    res.status(200).json(task);
})(req, res);

const getTasks = (req, res)=> errorHandler(async ()=> {
    const tasks = await Task.find();
    res.status(200).json(tasks);
})(req, res);

const getTask = (req, res)=> errorHandler(async ()=>{
  const { id } = req.params;
  const task = await Task.findById(id);
  if(!task) {
    throw new Error("Task not found");
  }
  res.status(200).json(task);
})(req, res);

const updateTask = (req, res)=> errorHandler(async ()=>{
  const { id } = req.params;
  const { titre, description, date_debut, date_fin, status } = req.body;
  const task = await Task.findByIdAndUpdate(id, { titre, description, date_debut, date_fin, status }, { new: true });
  if(!task) {
    throw new Error("Task not found");
  }
  res.status(200).json(task);
})(req, res);

const deleteTask = (req, res)=> errorHandler(async ()=>{
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  if(!task) {
    throw new Error("Task not found");
  }
  res.status(200).json({ message: "Task deleted successfully" });
})(req, res);

const assignTaskToUser = (req, res)=> errorHandler(async ()=> {
  const { id_task, id_user } = req.body;
  const task = new UserTask({ user: id_user, task: id_task });
  await task.save();
  res.status(200).json(task);
})(req, res);
const removeTaskFromUser = (req, res)=> errorHandler(async ()=> {
  const { id_task, id_user } = req.body;
  const task = new UserTask({ user: id_user, task: id_task });
  await task.save();
  res.status(200).json(task);
})(req, res);

const getTaskByStatus = (req, res)=> errorHandler(async ()=> {
  const { status } = req.params;
  const tasks = await Task.find({ status });
  res.status(200).json(tasks);
})(req, res);

const createComment = (req, res)=> errorHandler(async ()=> {
  const { user_id, task_id, comment } = req.body;
  const taskComment = new TaskComment({ user: user_id, task: task_id, comment});
  await taskComment.save();
  res.status(200).json(taskComment);
})(req, res);

const getComments = (req, res)=> errorHandler(async ()=> {
  const { userId, taskId } = req.params;
  const comments = await TaskComment.find({ user: userId, task: taskId });
  res.status(200).json(comments);
})(req, res);

const deleteComment = (req, res)=> errorHandler(async ()=> {
  const { id } = req.params;
  const comment = await TaskComment.findByIdAndDelete(id);
  if(!comment) {
    throw new Error("Comment not found");
  }
  res.status(200).json({ message: "Comment deleted successfully" });
})

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  assignTaskToUser,
  removeTaskFromUser,
  getTaskByStatus,
  createComment,
  getComments,
  deleteComment
}
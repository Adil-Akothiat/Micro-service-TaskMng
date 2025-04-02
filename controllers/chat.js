const Chat = require('../models/chat');
const { errorHandler } = require('../errorHandler/error');
const axios = require("axios");


const createChat = (req, res)=> errorHandler(async ()=> {
  const { room, message } = req.body;
  const sender = req.user.id;
  const token = req.user.token;
  await axios.get('http://localhost:4000/api/v1/project/find/'+room, {
    headers: {
      'Authorization': 'Bearer '+token
    }
  });
  const chat = new Chat({ room, sender, message });
  await chat.save();
  const messages = await Chat.find({ room });
  return res.status(201).json({ messages });
})(req, res);

const getMessages = (req, res)=> errorHandler(async ()=> {
  const { room } = req.params;
  const messages = await Chat.find({ room });
  return res.status(200).json({ messages });
})(req, res);

const deleteMessage = (req, res)=> errorHandler(async ()=>{
  const { chatId } = req.params;
  const chat = await Chat.findByIdAndDelete(chatId);
  return res.status(200).json({ deleted: true, chat });
})(req, res);

const updateMessage = (req, res)=> errorHandler(async ()=>{
  const { chatId } = req.params;
  const { message } = req.body;
  const chat = await Chat.findByIdAndUpdate(chatId, { message }, { new: true });
  return res.status(200).json({ updated: true, chat });
})(req, res);

module.exports = { createChat, getMessages, deleteMessage, updateMessage }
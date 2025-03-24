const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config()


const register =  async (req , res)=>{
    try{
        const{username , email , password , role} = req.body ;

        const verify_user = await User.findOne({email});
        if(verify_user){
            return res.status(400).json({message:'User already exists'})
        };

        const hashedPassword = await bcrypt.hash(password ,10);
        const user = await  User.insertOne({username , email , password:hashedPassword , role});
        res.status(201).json({message:"User create succes" , user}) ; 
    }catch(error){
        res.status(500).json(error.message)
    }

}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json('error in password');
        }
        const token = jwt.sign({ id: user._id , username : user.username}, process.env.SECRET);
        res.json({message:"Login success", token  , user : req.user});
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const getUser = async (req, res) => {
    const users = await User.find();
    res.json(users);
  };
  
  const updateUser = async (req, res) => {
    const { username, email, role } = req.body;
  
    if (req.user.role !== "admin") {
      return res.status(400).json({ message: "Block update" });
    }
  
    const updatedUser = await User.updateOne({"id":req.params._id}, { username, email, role });
    res.json(updatedUser);
  };
  
  const deleteUser = async (req, res) => {
    await User.deleteOne(req.params.id);
    res.json({ message: "Utilisateur supprimé" });
  };
  
  const BlockUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    user.Blocked = !user.Blocked;
    await user.save();
    res.json({ message: `Utilisateur ${user.Blocked ? "bloque" : "debloque"}` });
  };
  
  const search = async (req, res) => {
      try {
          const { keyword } = req.query;
          const users = await User.find({
              $or: [
                  { titre: { $regex: keyword } },
                  { description: { $regex: keyword } }
              ]
          });
  
          res.json(users);
      } catch (err) {
          res.status(500).json({ message: "Error" });
      }
  };
  
module.exports = { register , login , getUser , updateUser , deleteUser , BlockUser , search};
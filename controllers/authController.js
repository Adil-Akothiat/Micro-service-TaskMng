const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config()



const welcom = (req,res)=>{
    res.send('welcom to auth page')
};


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


module.exports = {welcom , register , login};
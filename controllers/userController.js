const User = require("../models/User");

const getUsers = async (req , res)=>{
    const users = await User.find();
    res.json(users);
};

const updateUser = async (req , res)=>{
    const {username , email , role }=req.body;

    // if(req.user.role !== "administrateur" ){
    //     return res.status(400).json("Modification is not allowed");
    // }

    try{        
        const update_user = await User.updateOne({'id': req.params._id },
            {
                $set: { username, email , role }
            }
        );
        if (update_user.modifiedCount === 0) {
            return res.json({ message: "User not found" });
        }

        res.status(400).json({message:"User updated successufly",update_user})
    }catch(error){
        res.status(500).json(error.message);
    }
};

const deleteUser = async (req,res)=>{
    const delete_user = await User.deleteOne({'id' : req.params._id});
    res.send({message:"delete success",delete_user})
}

const toggleBlockUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    user.Blocked = !user.Blocked;
    await user.save();
    res.json({ message: `Utilisateur ${user.isBlocked ? "bloqué" : "débloqué"}` });
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

module.exports = { getUsers, updateUser, deleteUser, search , toggleBlockUser };
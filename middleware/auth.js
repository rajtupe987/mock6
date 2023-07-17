const jwt =require('jsonwebtoken')
const {userModal}=require("../modals/user.model")
require("dotenv").config();

const auth = async(req,res,next)=>{
    try {
        const token=req.headers.authorization;

      if(token){
        jwt.verify(token,process.env.secret,(err,decoded)=>{
                if(decoded){
                    req.body.creator=decoded.userId;
                    next();
                }else{
                    res.send(err)
                }
        });
    }
    } catch (error) {
        console.log("middware error")
        return res.status(401).json({message:error.message})
    }
}

module.exports = {auth}

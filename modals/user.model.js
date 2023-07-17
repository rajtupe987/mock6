const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    Username:{type:String,required:true},
    Email:{type:String,required:true}
});


const userModal=mongoose.model("user",userSchema);

module.exports=userModal
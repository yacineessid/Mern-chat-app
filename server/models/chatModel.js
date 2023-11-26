// create chat model with mongoose
const  mongoose=require('mongoose')

// const chatSchema 
const chatSchema = new mongoose.Schema(
   {members:Array}
   ,
{timestamps:true})

//const chatModel
module.exports=chatModel=mongoose.model("Chat",chatSchema)

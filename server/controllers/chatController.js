const chatModel=require('../models/chatModel')

//create  chat 
// getUsers chat
//find chat

const createChat=async(req,res)=>{
const {firstId,secondId}=req.body
try
{
    let chat= await chatModel.findOne({
        members:{$all:[firstId,secondId]}
    })
    if(chat){
        return res.status(201).json(chat)
    }
    let newChat = await chatModel.create({ members:[firstId,secondId] })
    const response= await newChat.save()
    res.status(201).json(response)
    }catch (err){
        console.log("error in creating a chat", err);
        res.status(500).json(err)
        }
}

const findUsersChat=async(req,res)=>{
const userId= req.params.userId
try{
    let chats=await chatModel.find({members:{$in:[userId]}})
    res.status(200).json(chats)
}
catch(error){
    console.log(error);
    res.status(500).json(error)
}
}

const findChat=async(req,res)=>{
    const {firstId,secondId}=req.params
    try{
        let chat=await chatModel.findOne({members:{$all:[firstId,secondId]}})
        res.status(200).json(chat)
        }
        catch(error){
            console.log(error);
            res.status(500).json(error)
            }
}

module.exports={createChat,findUsersChat,findChat}
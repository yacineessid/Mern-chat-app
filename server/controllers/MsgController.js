const messageModel =require('../models/MessageModel')

//create messagee
const createMessage=async(req,res)=>{
    const {chatId,senderId,text}=req.body
    const message= new messageModel({
        chatId,
        senderId,
        text
    })
    try{
       const response= await message.save()
        res.status(201).json(response)
        }catch(err){
            console.log(err);
            res.status(500).send("Error creating a message")
            }

}

//find Message  function
const findMessagesByChatID= async (req,res)=> {
    const {chatId}= req.params
    try{
        const messages=await messageModel.find({chatId})
        console.log(messages,'messsage');
        if(!messages){
            return res.status(404).json(`No Messages found`)
            }
            res.json(messages)
            } catch(err){
                console.error(err.message);
                res.status(500).json('Server Error');
                }
                }


module.exports={createMessage,findMessagesByChatID}

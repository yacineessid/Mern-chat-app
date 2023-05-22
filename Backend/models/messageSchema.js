const mongoose=require ('mongoose')

const messsageSchema= mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    content:{type:String,required:true},
    chat:{type:mongoose.Schema.Types.ObjectId,ref:'chat'}
},{timetamps:true})

const Message= mongoose.model('Message',messsageSchema)
module.exports=Message
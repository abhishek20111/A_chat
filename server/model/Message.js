const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types
const MessageSchema = new mongoose.Schema({
    conversationId: {
        type:[ObjectId],
        ref:'Conversation',
    },
    senderId: {
        type:[ObjectId],
        ref:'User_Mini_Project',
    },
    receiverId: {
        type:[ObjectId],
        ref:'User_Mini_Project',
    },
    text: {
        type: String
    }
},
{ 
        timestamps: true
})

module.exports = mongoose.model('Message', MessageSchema);

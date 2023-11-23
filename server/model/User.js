const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const userMiniProjectSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    photo : String,
    friend:{
        type:[ObjectId],
        ref:'User_Mini_Project',
        default:[]
    },
    gender:Boolean

}, { timestamps: true })

module.exports = mongoose.model('User_Mini_Project', userMiniProjectSchema);
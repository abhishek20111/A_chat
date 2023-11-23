const express = require('express')
const router = express.Router()

const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const User = mongoose.model('User_Mini_Project')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode')
const authentication = require('../middleware/midealware');
const Conversation = require('../model/Conversation');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());



router.post('/addUser', async (req, res) => {
    console.log("addUser");
    try {
        const { name, email, photo } = req.body;
        console.log(name + " " + email + " " + photo);

        // Check if required fields have data
        if (!name || !email || !photo) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if the user with the given email already exists
        const existingUser = await User.findOne({ email });
 
        if (existingUser) {
            // If the user exists, send the existing user's data
            console.log("sended User data");
            return res.status(200).json(existingUser);
        } 
  
        // If the user doesn't exist, create a new user
        const newUser = new User({
            name,
            email,
            photo,
        });

        const savedUser = await newUser.save();
        console.log("Created account");
        res.status(200).json(savedUser);
    } catch (error) {
        console.error('Error while adding/retrieving user:', error);
        res.status(500).json({ error: 'Internal Server Error in backWork' });
    }
});

router.get('/getProfile',async(req, res)=>{
    console.log("getProfile");
    try{
        const id = req.body;
        const user = await User.findById(id);
        return res.status(200).json(user);
    }catch(error){
        console.log("Error from backend "+error);
    }
})

router.get('/users', async (req, res) => {
    console.log("get all user data");
    try {
        const users = await User.find().populate('friend');
        res.status(200).json(users);
    } catch (error) {
        console.error('Error while fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/addFriend', async (req, res) => {
    console.log("add friends");
    try {
      const { userEmail, friendId } = req.body;
       
      // Find the user and friend by email and ID, respectively
      const user = await User.findOne({ email: userEmail });
      const friendUser = await User.findById(friendId);
  
      if (!user || !friendUser) {
        return res.status(404).json({ error: 'User or friend not found' });
      }
   
      // Update the user's friend array
      user.friend.push(friendId);
  
      // Update the friend's friend array (assuming you have a friend property in your schema)
      friendUser.friend.push(user._id);
  
      // Save changes to both users
      await user.save();
      await friendUser.save();
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Error while adding friend:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router.post('/conversation/add', async(req, res)=>{
    console.log("conversation/add");
    let senderId = request.body.senderId;
    let receiverId = request.body.receiverId;

    const exist = await Conversation.findOne({ members: { $all: [receiverId, senderId]  }})
    
    if(exist) {
        response.status(200).json('conversation already exists');
        return;
    }
    const newConversation = new Conversation({
        members: [senderId, receiverId]
    });

    try {
        const savedConversation = await newConversation.save();
        response.status(200).json(savedConversation);
    } catch (error) {
        response.status(500).json(error);
    }
})

router.get('/conversation/get', async(req, res)=>{
    console.log("conversation/get");
    try {
        const conversation = await Conversation.findOne({ members: { $all: [ request.body.senderId, request.body.receiverId] }});
        response.status(200).json(conversation);
    } catch (error) {
        response.status(500).json(error);
    }
})
  





module.exports = router; 
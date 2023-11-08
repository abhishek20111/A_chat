const { Server } = require("socket.io");

let io;
const users = [];

function setupSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*", // Adjust the origin as needed
        },
    });

    io.on("connection", (socket) => {
        //when ceonnect
        // console.log( "a user connected.");
        //take userId and socketId from user
        socket.on("addUser", (userId) => {
            // console.log("userId-- "+userId, socket.id);
            addUser(userId, socket.id);
            console.log(users);
            io.emit("getUsers", users); 
        });
        
     
        //send and get message
        socket.on("sendMessage", ({ senderId, receiverId, text }) => {
            sendMessageToUser({ senderId, receiverId, text });
        });
        
    
        //when disconnect 
        socket.on("disconnect", () => {
            // console.log("a user disconnected!");
            removeUser(socket.id);
            io.emit("getUsers", users);
        });
    });
}

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

const sendMessageToUser = async ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);

    if (user) {
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
        });
    } else {
        await new Promise((resolve) => {
            io.once("connection", (socket) => {
                if (socket.id === receiverId) {
                    resolve(socket);
                }
            });
        });

        const onlineUser = getUser(receiverId);
        if (onlineUser) {
            io.to(onlineUser.socketId).emit("getMessage", {
                senderId,
                text,
            });
        }
    }
}

module.exports = setupSocket;

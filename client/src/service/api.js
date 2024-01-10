import axios from 'axios';

const url = 'http://localhost:8080';

export const addUser = async (data) => {
    try {
        let response = await axios.post(`${url}/addUser`, data);
        // console.log(data);
        return response.data;
    } catch (error) {
        console.log('Error while calling addUser API ', error);
    }
}

export const getUsers = async () => {
    try {
        let response = await axios.get(`${url}/users`);
        return response.data
    } catch (error) {
        console.log('Error while calling getUsers API ', error);
    }
}

export const addFriend = async (email, id)=> {
    try {
        const response = await axios.post(`${url}/addFriend`, {
            userEmail: email,
            friendId: id,
        });
        return response.data
      } catch (error) {
        console.error('Error adding friend:', error);
      }
}

export const setConversation = async (data) => {
    try {
        await axios.post(`${url}/conversation/add`, data);
    } catch (error) {
        console.log('Error while calling setConversation API ', error);
    }
}

export const getConversation = async (users) => {
    try {
        let response = await axios.post(`${url}/conversation/get`, users);
        return response.data;
    } catch (error) {
        console.log('Error while calling getConversation API ', error);
    }
}

export const getProfile = async (id) => {
    try {
        const response = await axios.get(`${url}/getProfile/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getProfile API ', error);
        throw error;  // Rethrow the error to handle it in the component if needed
    }
};

export const getMessages = async (id) => {
    try {
        let response = await axios.get(`${url}/message/get/${id}`);
        return response.data
    } catch (error) {
        console.log('Error while calling getMessages API ', error);
    }
}

export const newMessages = async (data) => {
    try {
        return await axios.post(`${url}/message/add`, data);
    } catch (error) {
        console.log('Error while calling newConversations API ', error);
    }
}



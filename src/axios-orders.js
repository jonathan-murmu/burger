import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-305e5.firebaseio.com/'
});

export default instance;
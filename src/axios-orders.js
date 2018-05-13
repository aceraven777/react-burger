import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://react-my-burger-48e6c.firebaseio.com/',
});

export default instance;
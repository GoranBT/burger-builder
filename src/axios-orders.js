import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://my-react-burger-ab717.firebaseio.com/'
});

export default instance;

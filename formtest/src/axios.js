import axios from 'axios';

const instansce = axios.create({
    baseURL:'http://localhost:8001'
});

export default instansce;
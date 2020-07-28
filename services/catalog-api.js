import Axios from 'axios';

const baseURL = 'http://localhost:3333/';

export default Axios.create({ baseURL });

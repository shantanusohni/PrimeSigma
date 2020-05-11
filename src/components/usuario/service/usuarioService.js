import axios from 'axios';


export class UsuarioService {

    getAllUsers() {
        return axios.get('http://localhost:3001/clientes')
            .then(res => res.data);
    }
    getUserInfo(id) {
        return axios.get(`http://localhost:3001/clientes/${id}`)
            .then(res => res.data);
    }

    getUsersSummary(name) {
        return axios.get(`http://localhost:3001/clientes?name_like=${name}`)
            .then(res => res.data);
    }


}
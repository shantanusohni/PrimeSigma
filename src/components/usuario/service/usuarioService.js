
import CrudService from '../../../service/CrudService';


export class UsuarioService extends CrudService{
    constructor(props){
        super({...props,url:'clientes'});
    }

    getAllUsers() {
        console.log(`jairo proceso env${process.env.REACT_APP_API_URI}`);
        return this.get()
            .then(res => res.data);
    }
    getUserInfo(id) {
        return this.get(id)
            .then(res => res.data);
        // return axios.get(`http://localhost:3001/clientes/${id}`)
        //     .then(res => res.data);
    }

    getUsersSummary(name) {

        ;
        return this.getQueryUrl(`?name_like=${name}`)
            .then(res => res.data);
        // return axios.get(`http://localhost:3001/clientes?name_like=${name}`)
        //     .then(res => res.data);
    }


}
// import axios from 'axios';
import CrudService from '../../service/CrudService';


export default class TareaService extends CrudService{
    constructor(props){
        super({...props,url:'tareas'});
    }

    getTareasVisita (visitaId){
        return this.getQueryUrl(`?visitaId=${visitaId}`);
    }

    getTareasUsuario(usuarioId){
        return this.getQueryUrl(`?userId=${usuarioId}&&estado=abierta&_page=1&_limit=5&_sort=id&_order=DESC`);
    }

}




// const requestHelper = axios.create({
//     baseURL: "http://localhost:3001/tareas",

// });



// export default {
//     get: () => requestHelper({
//         method: 'get'
//     })
//     ,create: data=>requestHelper({
//         method:'post'
//     }),
//     ,update:data=>requestHelper.put(data.id);
// };

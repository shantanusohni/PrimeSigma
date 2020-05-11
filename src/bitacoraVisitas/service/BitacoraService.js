// import axios from 'axios';
import CrudService from '../..//service/CrudService';


export default class BitacoraService extends CrudService{
    constructor(props){
        super({...props,url:'bitacoraVisitas'});
    }
    getRecent (top) {
         return this.getQueryUrl(`?_page=1&_limit=${top}&_sort=fechaVisita&_order=DESC`);            
    }
}


// const requestHelper = axios.create({
//     baseURL: "http://localhost:3001/bitacoraVisitas",

// });

// export default {
//     get: () => requestHelper({
//         method: 'get'
//     })
//     ,create: data=>requestHelper({        
//         method:'post',
//         data
//     })
//     ,update: data=>requestHelper.put(`${data.id}`,data),
// };

import react from 'react';
import axios from 'axios';


 export default class CrudService{
    constructor(props){
        this.requestHelper = axios.create({
         baseURL: `/${props.url}`
        });
    }

    get = (id) => this.requestHelper.get(`${id?id:''}`)
    getQueryUrl =(queryUrl) => this.requestHelper.get(queryUrl)
    create = data =>this.requestHelper({        
        method:'post',
        data
    })
    update = (data) =>this.requestHelper.put(`${data.id}`,data);
    delete = (id) =>this.requestHelper.delete(`${id}`);


}
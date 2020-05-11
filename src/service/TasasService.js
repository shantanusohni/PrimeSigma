// import axios from 'axios';
import CrudService from './CrudService';


export class TasasService extends CrudService{
    constructor(props){
        super({...props,url:'tasas'});
    }
}

export class TasasProductosService extends CrudService{
    constructor(props){
        super({...props,url:'tasasProductos'});
    }

    getTasasProducto (productoId){
        return this.getQueryUrl(`?productoId=${productoId}&_sort=rangoMinimo`);
    }

}


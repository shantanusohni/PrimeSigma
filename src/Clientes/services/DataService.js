import CrudService from '../../service/CrudService';


export class ClienteDataService extends CrudService{
    constructor(props){
        super({...props,url:'clientes'});
    }
  //  getRecent (top) {
  //       return this.getQueryUrl(`?_page=1&_limit=${top}&_sort=fechaVisita&_order=DESC`);            
  //  }
}

export class ProductosClienteDataService extends CrudService{
    constructor(props){
        super({...props,url:'productos'});
    }

   getProductosCliente (clienteId) {
        return this.getQueryUrl(`?clienteId=${clienteId}`);            
   }
}

export class TasasProductoDataService extends CrudService{
    constructor(props){
        super({...props,url:'tasasProductos'});
    }

   getValorProducto(clienteId) {
        return this.getQueryUrl(`?clienteId=${clienteId}`);            
   }

}

export class ValorProductoDataServise extends CrudService{
    constructor(props){
        super({...props,url:'valoresProductos'});
    }

   getValorProducto (cuentaId) {
        return this.getQueryUrl(`?idProducto=${cuentaId}`);            
   }

}


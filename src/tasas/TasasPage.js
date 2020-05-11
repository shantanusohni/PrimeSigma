import React, {Component} from 'react';


export class TasasPage extends Component {
    constructor(props){
        super(props);
        this.state ={
            clienteId : props.match.params.id,
            productos: null,
            cuentaId : null,
            clientes : null 
        }
     this.seleccionarCuenta.bind(this.seleccionarCuenta) ;
    }

    seleccionarCuenta = id => {       
        this.setState({cuentaId:id});
    }

    render() {
        return (
        
            <div className="p-grid p-justify-center" >
                <div className="p-col-11">
                <div className="card card-w-title">
                       <h1>Tasas</h1>
                       <div>este es el contenido de las tasas</div>
                </div>
                </div>
            </div>
            
         );
    }

}
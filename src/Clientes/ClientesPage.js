import React, {Component} from 'react';
import ComClientes from './components/ComClientes';
import ComCuentas from './components/ComCuentas';
import ComDesCuenta from './components/ComDesCuenta';
import Grafico1 from './components/Grafico1';
import Grafico2 from './components/Grafico2';
import PageSearch from '../components/PageSearch';
export class ClientesPage extends Component {
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


    componentDidUpdate(){
        if(this.state.clienteId!==this.props.match.params.id){
            this.setState({clienteId: this.props.match.params.id,cuentaId:null});
            
        }
        console.log("clientePage didUpdate - parametro id " + this.props.match.params.id);
    }


    componentDidMount() {
        PageSearch.setAutocompleteMode(true);
        PageSearch.setPageSearchCallback(cliente=>{
            // this.setState({clienteId: cliente.id});
            document.location =  `#/cliente/${cliente.id}`;
        } );
        //  document.location.reload();
            console.log("clientePage didMount - parametro id " + this.props.match.params.id);
    }

    render() {
        return (
            
            this.state.clienteId ?
            <>
            <div className="p-grid p-fluid" >
            <div className="p-col-12 p-lg-6">
                <div className="p-grid">
                    <div className="p-col-12">
                    <ComClientes clienteId={this.state.clienteId}/>               
                    </div> 
                    <div className="p-col-12">
                        <ComCuentas clienteId={this.state.clienteId} selCuenta={this.seleccionarCuenta}/>
                    </div>         
                    <div className="p-col-12">
                        {this.state.cuentaId && <ComDesCuenta cuentaId={this.state.cuentaId}/> }
                    </div>         
                </div>
            </div>
                <div className="p-col-12 p-lg-6"> 
                    <div className="p-col-12 card card-w-title ">
                        <Grafico1 cuentaId={this.state.cuentaId}/>
                     </div>
                     <div className="p-col-12 card card-w-title">
                        <Grafico2 cuentaId={this.state.cuentaId}/>
                     </div>
                 </div>              
             </div>
             </>
             :
            <div className="p-col-12"> 
                    <div className="card card-w-title">
                        Debe seleccionar un cliente
                     </div>                              
             </div>
         );
    }

}
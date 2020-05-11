import {Panel} from 'primereact/panel';
import {RadioButton} from 'primereact/radiobutton';
import React, {useState, useEffect} from 'react';
import {ProductosClienteDataService} from '../services/DataService';

export default function ComCuentas(props) {

        const [clienteId, setClienteId] = useState(props.clienteId);
        const [cuentas, setCuentas] = useState([]);
        const dataService = new ProductosClienteDataService();
        const [cuentaId, setCuentaId] = useState(props.cuentaId);
        const {selCuenta} = props;
    
        const handleServiceResult = data=>{
                setCuentas(data.data);
                setCuentaId(null) ;
                if(data.data && data.data[0]){
                        setCuentaId(data.data[0].id)                                
                        selCuenta(data.data[0].id);
                }

            };
    
        const handleChange = e =>{
                setCuentaId(e.value)                
                selCuenta(e.value);                
        };

        useEffect(()=>{
            setClienteId(props.clienteId);            
            dataService.getProductosCliente(props.clienteId).then(handleServiceResult);
        },[props.clienteId])
    
    
        return(
                <div className="card card-w-title">
                <h1>Producto Cliente</h1>
                <div className="content-section implementation">
                    <div className="p-grid" style={{width:'250px',marginBottom:'10px'}}>
                        {     
                          cuentas && cuentas.map(item=>

                        <div key={item.id} className="p-col-12" >
                                <RadioButton inputId = {`rb${item.id}`}  name="cuentaid" value={item.id} 
                                onChange={(e) => handleChange(e)} checked={item.id===cuentaId} />
                                <label htmlFor={`rb${item.id}`} className="p-radiobutton-label">{item.Nombreproducto}</label>
                        </div>
                          ) 
                        }
                      
                    </div>
                    Selected product : {cuentaId}
                </div>                
                
                </div>
        ); 
}
import React, {useState} from 'react';
import Calendario from '../calendario/Calendario';
import BitacoraVisita from './BitacoraVisita';

export default function BitacoraVisitasPage(props){
    const visitaId = props.match.params.id;
    // const {cliente,setCliente} = useState(null);
    // const handleClientChange = (cliente)=>{
    //     console.log(`Seleccion cliente ${ cliente? cliente.name: 'null'}`);
    //     //setCliente(cliente);
    // }
    // const[clientChange:setHandleChange] = useState(handleClientChange);
    return(
            <div className="card card-w-title">
            <h1>Bitacora visitas</h1>
            <div className="p-grid">
                <div className="p-col-12">
                    {
                    visitaId && <BitacoraVisita visitaId={visitaId}/>
                    }{
                        !visitaId && <Calendario />
                    }   
                 </div>                
            </div>
        </div>
    )
}
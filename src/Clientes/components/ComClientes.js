import React, {useState, useEffect} from 'react';
import {ClienteDataService} from '../services/DataService';
import LabelInfo from '../../components/LabelInfo';

export default function ComClientes(props) {

    const [clienteId, setClienteId] = useState(props.clienteId);
    const [cliente, setCliente] = useState(null);
    const dataService = new ClienteDataService();

    const handleServiceResult = data=>{
        setCliente(data.data);
        };

    useEffect(()=>{
        setClienteId(props.clienteId);
        dataService.get(props.clienteId).then(handleServiceResult);
        console.log("comCliente - cambio el cliente:" + props.clienteId);
    },[props.clienteId])

    // useEffect(()=>{
    //     console.log("cambio el cliente:" + clienteId);
    // })


    return(
cliente && <div className="p-lg-12 card card-w-title">
                <h1>{cliente.name} </h1>
                <div className="p-grid">
                    <LabelInfo label="Empresa" info={cliente.company.name}/>
                    <LabelInfo label="Ciudad" info={cliente.address.city}/>
                    <LabelInfo label="Correo" info={cliente.email}/>
                    <LabelInfo label="Teléfono" info={cliente.phone}/>
                </div>
            </div> 
    ); 
}
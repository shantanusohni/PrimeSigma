import React from 'react'

export default function Ejecutivo(props) {
const  vercliente = id => {
    document.location = `#/cliente/${id}`; 
}

    return (
        <div className="p-sm-6 p-md-6 p-lg-4 p-col-12">
            <div className="card" style={{ backgroundColor: '#FFDAD6', borderRadius: '4px'}} >
                <div className="pointerLink" onClick = { event => {vercliente(props.cliente.id)}} style={{height:'32px', overflow:'hidden'}}><h2 style={{ fontWeight: "bold"}}>{props.cliente.name}</h2></div>
            <div className="">
            <span style={{ fontWeight: "bold" }}>Contacto:</span>Pepito Perez
            </div>
                <div style={{ 'fontSize': '2em' }}>
                    <span className="pi pi-info-circle" style={{ color: '#E6360F' }} />
                    <span className="pi pi-clock" style={{ color: '#E6360F' }} />
                    <span className="pi pi-calendar" style={{ color: '#E6360F' }} />
                    <span className="pi pi-check-circle" style={{ color: '#E6360F' }} />
                </div>
                <div>
                    <span >{props.cliente.email}</span>
            </div>
            </div>
        </div>
    );

}
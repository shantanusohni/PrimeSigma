import React from 'react';
import { Button } from 'primereact/button';

export default function DetalleBitacoraVisita(props) {
    //const [visita,setTarea] = React.useState(props.visita);
    const { seleccionarVisita, visita } = props;
    const handleOnClick = e => { seleccionarVisita(null); };
   
    return (
        <div className="">
        <div className="p-link p-link-hover" onClick={(e)=>{ window.location = `#/bitacoraVisitas/${visita.id}`}}>
            <div className="cliente" style={{
                paddingLeft: "0px",
                paddingTop: "2px",
                fontSize: "15px",
                fontWeight: "bold"
            }}>
            {visita.clienteNombre}
            </div>
            <div className="" style={{fontWeight: "bold", fontSize:'12px', position:'relative', textAlign: 'right'}}>{visita.fechaVisita}</div>            
            </div>
                <div style={{marginBottom:"3px"}}>Resument visita</div>        
                <div className="comment" style={{ borderBottom: "1px solid #c8c8c8",textAlign:"justify" }}><p>{visita.resumen}</p></div>        
                <div style={{height:"2em", marginTop:'4px'}}>
                    <Button type="submit" icon="pi pi-check" className="p-button-success2" style={{float:"left",marginLeft:"1em"}} />
                    <Button type="button" icon="pi pi-chevron-left" className="p-button-danger2"  style={{float:"right", marginRight:"1em"}} onClick={(e) => seleccionarVisita(null)} />
                </div>

        </div>
    );
}



import React from 'react';

export default function Visitas(props) {
    const { visitas,seleccionarVisita } = props;
     const handleOnClick  = (e) => {
        seleccionarVisita(e);
    };

    return (
        <>        
        <ul>
            {visitas.map(t => (
                <li key={t.id}>
                   <Visita visita={t} onClick={handleOnClick}/>
                </li>
            ))}
        </ul>
        </>
    );
}



export function Visita(props) {
    const {onClick,visita} = props;
    const handleOnClick = e => { onClick(visita);};
        
    return (
        
        <div  className="p-link task" style={{paddingTop:'3px'}} onClick={handleOnClick}>        
            
            <div className="" style={{fontWeight: "bold" , position:'relative'}}>{visita.clienteNombre}</div>            
            <div className="" style={{fontWeight: "bold", fontSize:'12px', position:'relative', textAlign: 'right'}}>{visita.fechaVisita}</div>            
            <div className="comment collapsed-content" style={{marginLeft:'3px'}}>{visita.resumen}</div>

        </div>
    );
}


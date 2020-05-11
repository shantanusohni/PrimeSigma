import React from 'react';
import {findUITaskType} from './PanelTareas';

export default function Tareas(props) {
    const { tareas,seleccionarTarea } = props;
     const handleOnClick  = (e) => {
        seleccionarTarea(e);

    };

    return (
        <>
        
        <ul>
            {tareas.map(t => (
                <li key={t.id}>
                   <Tarea tarea={t} onClick={handleOnClick}/>
                </li>
            ))}
        </ul>
        </>
    );
}



export function Tarea(props) {
    const {onClick,tarea} = props;
    const handleOnClick = e => { onClick(tarea);};
    let taskType =  findUITaskType(tarea);
    
    return (        
        <div  className="p-link task" onClick={handleOnClick}>        
            <div className={`pi ${taskType.className}`} />
            <div className="cliente">{tarea.clienteNombre}</div>
            <div className="comment collapsed-content">{tarea.resumen}</div>
        </div>
    );
}


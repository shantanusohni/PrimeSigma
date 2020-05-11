import React,{useEffect, useState, useReducer, useContext} from 'react';
import { Panel } from 'primereact/panel';
import {Toolbar} from 'primereact/toolbar'
import {Button} from 'primereact/button'
import ResumenTareas from './ResumenTareas';
import EditarTarea from './EditarTarea';
import TareaService from './service/TareaService';
import {UserContext} from '../context/UserContext';

import DetalleTarea from './DetalleTarea'
import { relative } from 'path';

export function PanelTareas(props) {
    const {cliente,visitaId} = props; 
    const {userId} = useContext(UserContext);

    const [tarea, setTarea] = useState(null);
    const [tareas, setTareas] = useState([]);
    const tareaService = new TareaService();

    const backToSummary =(reloadSumary)=>{
        reloadSumary && getData();
        setTarea(null);
    };
    

    const getData = ()=>{
        visitaId && tareaService.getTareasVisita(visitaId).then(data =>{
            setTareas(data.data);
            console.log('busco tareas por visita');
        }
        )
        !visitaId && tareaService.getTareasUsuario(userId).then(data =>{
            setTareas(data.data);
            console.log('busco tareas por usuario');
        }
        );
    };

    useEffect(()=>{    

        getData();
        
    },[visitaId]);

    return (
        <>
            {/* <Counter /> */}
            <div className="p-col-12" className="mistareas">
                <Panel>
                    <Toolbar>                       
                        
                        <div style={{verticalAlign:"middle"}}> 
                        {
                            tarea && <span className="pi pi-chevron-left" style={{ fontSize: "2em", position:"absolute", cursor:"pointer"}} onClick={e=>{setTarea(null)}}/>
                        }
                        <div style={{height:"2em",position:"inherit", border:"thin none red",paddingLeft:(tarea?"2em":"4px"),paddingRight:"2em",paddingTop:"3px",fontWeight:"bold"}}>
                            {!tarea? !cliente? "Mis tareas":`Tareas visita ${cliente.name}`  : cliente?"Editar Tarea": "Detalle Tarea"}
                        </div>
                        {
                        visitaId && visitaId>0 && !tarea && <span className="p-button-success pi pi-calendar-plus" style={{fontSize: "2em", float:"right",marginTop:"-1em",cursor:"pointer"}} onClick={e=>{setTarea({})}} />
                        }      
                        </div>
                    </Toolbar>
                    {!tarea ?
                        <ResumenTareas tareas={tareas} seleccionarTarea={setTarea} />
                        : visitaId?  <EditarTarea tarea={tarea} cliente={cliente} visitaId={visitaId}  backToSummary={backToSummary}/>   
                        : <DetalleTarea tarea={tarea} backToSummary={backToSummary} />
                    }
                </Panel>
            </div>
        </>
    );
}


const initialState = { count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        default:
            throw new Error();
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
            Count: {state.count}
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
        </>
    );
}

export const taskTypes = [
        {label: 'Recordatorio', value: 'RE'},
        {label: 'Correo', value: 'CR'},
        {label: 'Archivo', value: 'AR'},
        {label: 'Solicitud', value: 'IN'},
        {label: 'Pregunta', value: 'PRS'},
        {label: 'LLamar', value: 'LL'},
        {label: 'Oportunidad', value: 'OP'}
    ];

export const localTaskTypes = [
    {tooltip: 'Recordatorio', value: 'RE', className:'pi-bookmark'},
    {tooltip: 'Correo', value: 'CR', className:'pi-envelope'},
    {tooltip: 'Archivo', value: 'AR', className:'pi-paperclip'},
    {tooltip: 'Solicitud', value: 'IN', className:'pi-info-circle'},
    {tooltip: 'Pregunta', value: 'PRS', className:'pi-question-circle'},
    {tooltip: 'LLamar', value: 'LL', className:'pi-mobile'},
    {tooltip: 'Oportunidad', value: 'OP', className:'pi-briefcase'}
];

export const findUITaskType = tarea => localTaskTypes.find(item=>{
    //console.log(`${item.value}==${tarea}`);    
    return  item.value==(tarea?tarea.tipo:"RE")
});

import React from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import {SelectButton} from 'primereact/selectbutton';
import { Toolbar } from 'primereact/toolbar';
import TareaService from './service/TareaService';
import {UserContext} from '../context/UserContext';
import {findUITaskType,localTaskTypes} from './PanelTareas';


export default function EditarTarea(props) {
    const { backToSummary, tarea, cliente, visitaId } = props;
    const {userId} = React.useContext(UserContext);
    const tareaService = new TareaService();    
    const [taskSummary, setTaskSummary] = React.useState(tarea?tarea.resumen:"");
    const tipo = findUITaskType(tarea);
    const [taskType, setTaskType] = React.useState(tipo);
    const handleSubmit = e => {
        e.preventDefault();
        let action = tarea.id?tareaService.update:tareaService.create;

        action({
            userId,
            clienteId:cliente.Id,
            clienteNombre:cliente.name,
            visitaId,
            resumen:taskSummary,
            tipo:taskType.value,
             id:tarea?tarea.id:null,
            estado: "abierta",
            comentario: ""
        }).then(data=> {
            //console.log(data);
            backToSummary(true);
        });

    }
    return (
        <div className="">
            
                <form onSubmit={handleSubmit}>
                <div>
                <SelectButton value={taskType} options={localTaskTypes} optionLabel="tooltip"  onChange={(e) => setTaskType(e.value)}></SelectButton>
                
                
                
                </div>
                <span className={`pi ${tarea.className}`} style={{ fontSize: "2em", position: "relative", verticalAlign: "middle" }} />
                <div>Resumen de la tarea:</div>
                <div className="comment" style={{ borderBottom: "1px solid #c8c8c8", textAlign: "justify" }}>
                    <p>
                    <InputTextarea id="tareaUI" style={{ width: "100%" }} rows={5} cols={30} value={taskSummary} onChange={(e) => setTaskSummary(e.target.value)} autoResize={true} />
                  </p>
                </div>
                <div style={{ height: "2em" }}>

                    <Button type="submit" icon="pi pi-check" className="p-button-success2" style={{ float: "left", marginLeft: "1em" }} />

                    <Button type="button" icon="pi pi-chevron-left" className="p-button-danger2" style={{ float: "right", marginRight: "1em" }} onClick={(e) => backToSummary(false)} />

                </div>

            </form>
        </div>
    );
}



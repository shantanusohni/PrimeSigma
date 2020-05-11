import React from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar'
import TareaService from './service/TareaService';

export default function DetalleTarea(props) {
    const { backToSummary, tarea } = props;
    const [successComment, setSuccessComment] = React.useState("");    
    const tareaService = new TareaService();
    const handleSubmit = e => {
        e.preventDefault();
        let t = {...tarea, comentario:successComment, estado:"cerrada"};
        tareaService.update(t).then((data)=>{
            alert("La tarea se cerro correctamente");
            backToSummary(true);
        });


    }
    
    return (
        <div className="">
            <div className="cliente" style={{
                paddingLeft: "0px",
                paddingTop: "2px",
                fontSize: "15px",
                fontWeight: "bold"

            }}>
                <span className={`pi ${tarea.className}`} style={{ fontSize: "2em", position: "relative", verticalAlign: "middle" }} />{tarea.clienteNombre}</div>
            <div className="comment" style={{ borderBottom: "1px solid #c8c8c8",textAlign:"justify" }}><p>{tarea.resumen}</p></div>
            <form onSubmit={handleSubmit}>
                <div style={{marginBottom:"3px"}}>Comentario de cierre</div>
                <InputTextarea style={{width:"100%"}} rows={3} cols={30} value={successComment} onChange={(e) => setSuccessComment(e.target.value)} autoResize={true} />
                <div style={{height:"2em"}}>

                    <Button type="submit" icon="pi pi-check" className="p-button-success2" style={{float:"left",marginLeft:"1em"}} />

                    <Button type="button" icon="pi pi-chevron-left" className="p-button-danger2"  style={{float:"right", marginRight:"1em"}} onClick={(e) => backToSummary(false)} />

                </div>

            </form>
        </div>
    );
}



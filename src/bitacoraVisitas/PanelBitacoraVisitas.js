import React, {useEffect, useState}from 'react';
import { Panel } from 'primereact/panel';
import {Toolbar} from 'primereact/toolbar'
import {Button} from 'primereact/button'
import ResumenBitacoraVisita from './ResumenBitacoraVisitas';
import DetalleBitacoraVisita from './DetalleBitacoraVisita';
import BitacoraService from './service/BitacoraService';
import { relative } from 'path';

export function PanelBitacoraVisitas(props) {

    const [visita, setVisita] = useState(null);
    const [visitas, setVisitas] = useState([]);
    const [loaded,setLoaded] = useState(true);
   
    const bitacoraService = new BitacoraService();

    useEffect(()=>{
            bitacoraService.getRecent(5).then(data =>
             {
                 setLoaded(true);
                 setVisitas(data.data); 
             
             }); 
        }
    ,[loaded]);

    const nuevaVisita =()=>{
        document.location = '/#/bitacoraVisitas/0'
    };

    return (
        <>
            {/* <Counter /> */}
            <div className="p-col-12" className="mistareas">
                <Panel>
                    <Toolbar>                       
                        
                        <div style={{verticalAlign:"middle"}}> 
                        {
                            visita && <span className="pi pi-chevron-left" style={{ fontSize: "2em", position:"absolute", cursor:"pointer"}} onClick={e=>{setVisita(null)}}/>
                        }
                        <div style={{height:"2em",position:"inherit", border:"thin none red",paddingLeft:(visita?"2em":"4px"),paddingRight:"2em",paddingTop:"3px",fontWeight:"bold"}}>
                            {!visita?  "Resumen bitacora visitas"  :"Detalle bitacora visita"}
                        </div>
                        {
                            <span className="p-button-success pi pi-calendar-plus" style={{fontSize: "2em", float:"right",marginTop:"-1em",cursor:"pointer"}} onClick={e=>{nuevaVisita()}} />
                        }      
                        </div>
                    </Toolbar>
                    {!visita ?
                        <ResumenBitacoraVisita visitas={visitas} seleccionarVisita={setVisita} />
                        : <DetalleBitacoraVisita visita={visita} seleccionarVisita={setVisita} />
                    }
                </Panel>
            </div>
        </>
    );
}

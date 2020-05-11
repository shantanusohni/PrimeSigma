import React, { useState, useEffect } from 'react';
import {PanelTareas} from '../tareas/PanelTareas'
import { AutoComplete } from 'primereact/autocomplete';
import { Calendar } from 'primereact/calendar';
import {Slider} from 'primereact/slider';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
// import {clienteService} from '../service/clienteService';
import { UsuarioService } from '../components/usuario/service/usuarioService';
import bitacoraApi from './service/BitacoraService';
import {UserContext} from '../context/UserContext';
import { withRouter  } from 'react-router-dom';

export default withRouter(function BitacoraVisita(props) {

    const [loaded, setLoaded] = useState(true);
    const [resumen, setResumen] = useState("");
    const [fechaVisita, setFechaVisita] = useState(null);
    const [filteredClients, setFilteredClients] = useState(null);
    const [cliente, setCliente] = useState(null);
    const {userId} = React.useContext(UserContext);
    const {visitaId,history} = props;
    const [rangeValues, setRangeValues] = useState([1, 8]);

    const bitacoraService = new bitacoraApi();
    const usuarioService = new UsuarioService();
  

    useEffect(()=>{
            visitaId && visitaId > 0 && bitacoraService.get(visitaId).then(data => {
            setFechaVisita(new Date(data.data.fechaVisita));
            setResumen(data.data.resumen);
            setRangeValues([data.data.startValue,data.data.endValue]);
            setCliente({id:data.data.clienteId, name:data.data.clienteNombre});  
            });
    }    
    ,[]);

    const goBack = () => {
        history.goBack();
    };

    const handleClientChange = (cli)=>{
        setCliente(cli);
    }

    const filtercliente = (event) => {
        usuarioService.getUsersSummary(event.query.toLowerCase())
            .then(data => setFilteredClients(data));
        
    };
    const handleSubmit = (event) => {
        event.preventDefault();
       console.log(fechaVisita);
        let action = visitaId && visitaId>0 ? bitacoraService.update:bitacoraService.create;

        action({
            userId,
            clienteId:cliente.id,
            clienteNombre:cliente.name,
            // fechaVisita:fechaVisita.toISOString().substr(0,10),
            fechaVisita:`${fechaVisita.toISOString().substr(0,10)}T${horas[rangeValues[0]].value}`,
            resumen,
            id:visitaId && visitaId>0? visitaId:null,
            title: cliente.name,
            start: `${fechaVisita.toISOString().substr(0,10)}T${horas[rangeValues[0]].value}`,
            end: `${fechaVisita.toISOString().substr(0,10)}T${horas[rangeValues[1]].value}`,
            startValue:rangeValues[0],
            endValue:rangeValues[1]
        }).then(data=>{/*console.log(data); alert(data.statusText);*/document.location=`/#/bitacoraVisitas/${data.data.id}`});
    };
    return (


        
            <div className="p-grid">
               
                <div className="p-col-8">
                <form onSubmit={handleSubmit}>
                <div className="p-col-12">
                    <label htmlFor="clienteUI">Cliente:</label>
                </div>
                <div className="p-col-12" style={{ marginBottom: '10px' }}>
                    <AutoComplete minLength={1}
                        placeholder="Nombre del cliente"
                        id="clienteUI" size={30}
                        field="name"
                        suggestions={filteredClients}
                        completeMethod={filtercliente}
                        value={cliente}
                        // onSelect={e=>{alert(e.value.name)}}
                        // onUnselect={e=>{alert(e.value.name)}}
                        onChange={event => { handleClientChange(event.value); setFilteredClients(null); }}/>
                        
                </div>
                {/* <div>{cliente && cliente.id}</div> */}

                <div className="p-col-12">
                    <div className="p-grid">
                        <div className="p-col-6">
                            <div className="p-col-12">
                                <label htmlFor="fechaUI">Fecha:</label>
                            </div>
                            <div className="p-col-12" style={{ marginBottom: '10px' }}>
                                <Calendar id="fechaUI"
                                    placeholder="mm/dd/yy"
                                    dateFormat="mm/dd/yy"
                                    value={fechaVisita} onChange={(e) => setFechaVisita(e.value)} />
                            </div>
                        </div>
                        <div className="p-col-6">
                            <div className="p-col-12">
                                <label htmlFor="horaUI">Hora reunión:</label>
                            </div>
                            <div className="p-col-12" style={{ marginBottom: '10px' }}>
                                <div style={{ marginBottom: '10px' }}>Desde: {horas[rangeValues[0]].label} hasta {horas[rangeValues[1]].label}</div>
                                <Slider id="horaUI" min={0} max={52} increment="1" value={rangeValues} onChange={(e) => setRangeValues(e.value)} range={true} />
                            </div>
                        </div>

                    </div>
                </div>

                

                <div className="p-col-12">
                <label htmlFor="resumenUI">Resumen:</label>
                </div>
                <div className="p-col-12" style={{ marginBottom: '10px' }}>                    
                    <InputTextarea id="resumenUI" style={{ width: "100%" }} rows={5} cols={30} value={resumen} onChange={(e) => setResumen(e.target.value)} autoResize={true} />
                </div>
                <div style={{ height: "2em" }}>

                    <Button label="Gruardar" type="submit" icon="pi pi-check" className="p-button-success2" style={{ float: "left", marginLeft: "1em" }} />

                    <Button label="Cancelar" type="button" icon="pi pi-chevron-left" className="p-button-danger2" style={{ float: "right", marginLeft: "1em" }} onClick={(e) => goBack()} />

                </div>   
                </form>
                </div>
                <div className="p-col-4">
                    <div className="p-col-12">
                        <PanelTareas visitaId = {visitaId} cliente={cliente} />
                    </div>
                    <div className="p-col-12">Tareas de visita</div>
                </div>
            </div>
        
    );
}
);

const horas = [
{label:"07:00 a.m.",value:"07:00:00"},
{label:"07:15 a.m.",value:"07:15:00"},
{label:"07:30 a.m.",value:"07:30:00"},
{label:"07:45 a.m.",value:"07:45:00"},
{label:"08:00 a.m.",value:"08:00:00"},
{label:"08:15 a.m.",value:"08:15:00"},
{label:"08:30 a.m.",value:"08:30:00"},
{label:"08:45 a.m.",value:"08:45:00"},
{label:"09:00 a.m.",value:"09:00:00"},
{label:"09:15 a.m.",value:"09:15:00"},
{label:"09:30 a.m.",value:"09:30:00"},
{label:"09:45 a.m.",value:"09:45:00"},
{label:"10:00 a.m.",value:"10:00:00"},
{label:"10:15 a.m.",value:"10:15:00"},
{label:"10:30 a.m.",value:"10:30:00"},
{label:"10:45 a.m.",value:"10:45:00"},
{label:"11:00 a.m.",value:"11:00:00"},
{label:"11:15 a.m.",value:"11:15:00"},
{label:"11:30 a.m.",value:"11:30:00"},
{label:"11:45 a.m.",value:"11:45:00"},
{label:"12:00 p.m.",value:"12:00:00"},
{label:"12:15 p.m.",value:"12:15:00"},
{label:"12:30 p.m.",value:"12:30:00"},
{label:"12:45 p.m.",value:"12:45:00"},
{label:"1:00 p.m.",value:"13:00:00"},
{label:"1:15 p.m.",value:"13:15:00"},
{label:"1:30 p.m.",value:"13:30:00"},
{label:"1:45 p.m.",value:"13:45:00"},
{label:"2:00 p.m.",value:"14:00:00"},
{label:"2:15 p.m.",value:"14:15:00"},
{label:"2:30 p.m.",value:"14:30:00"},
{label:"2:45 p.m.",value:"14:45:00"},
{label:"3:00 p.m.",value:"15:00:00"},
{label:"3:15 p.m.",value:"15:15:00"},
{label:"3:30 p.m.",value:"15:30:00"},
{label:"3:45 p.m.",value:"15:45:00"},
{label:"4:00 p.m.",value:"16:00:00"},
{label:"4:15 p.m.",value:"16:15:00"},
{label:"4:30 p.m.",value:"16:30:00"},
{label:"4:45 p.m.",value:"16:45:00"},
{label:"5:00 p.m.",value:"17:00:00"},
{label:"5:15 p.m.",value:"17:15:00"},
{label:"5:30 p.m.",value:"17:30:00"},
{label:"5:45 p.m.",value:"17:45:00"},
{label:"6:00 p.m.",value:"18:00:00"},
{label:"6:15 p.m.",value:"18:15:00"},
{label:"6:30 p.m.",value:"18:30:00"},
{label:"6:45 p.m.",value:"18:45:00"},
{label:"07:00 p.m.",value:"19:00:00"},
{label:"07:15 p.m.",value:"19:15:00"},
{label:"07:30 p.m.",value:"19:30:00"},
{label:"07:45 p.m.",value:"19:45:00"},
{label:"08:00 p.m.",value:"20:00:00"}];
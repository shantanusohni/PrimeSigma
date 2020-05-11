
import React, {useState,useEffect} from 'react';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button'
import {Dropdown} from 'primereact/dropdown'
import {Slider} from 'primereact/slider';
import {TasasProductosService} from '../../service/TasasService'


export default function (props){

    const {callback,tasas} = props;
    const [tasaProducto,setTasaProducto] = useState(props.tasaProducto);
    const [tasa,setTasa] = useState(tasas.filter(t=>t.id===tasaProducto.tasaId)[0]);
    const [rangeValues, setRangeValues] = useState([tasaProducto.rangoMinimo || 0, tasaProducto.rangoMaximo || 0]);
    const [puntos, setPuntos] = useState(tasaProducto.puntos);
    const tasasProductoService = new TasasProductosService();
  
    const save = ()=> {
          if(!tasa){return;}
        
        if(tasaProducto.id){
            updateProperty("fechaCreacion",new Date().toISOString());
        }
        updateProperty("fechaModificacion",new Date().toISOString());
        updateProperty("rangoMinimo",rangeValues[0]);
        updateProperty("rangoMaximo",rangeValues[1]);

        let action = tasaProducto.id?tasasProductoService.update:tasasProductoService.create;
        console.log(tasaProducto);
         action(tasaProducto)
            .then(data=> {
                callback(true);
            });
    };

    const _delete = () => {
       if(tasaProducto.id){
       tasasProductoService.delete(tasaProducto.id)
       .then(data=> {
                callback(true);
            });;
       }else{
        callback(false);
       }
    };

    // useEffect(()=>{
    //      let _tasa = tasas.filter(t=>t.id===tasaProducto.tasaId);
    //      setTasa(_tasa);
    // },[]);
    

    const updateTasa =(tasa)=>{
        setTasa(tasa);
        updateProperty('tasaId', tasa.id);
    };
    const updateProperty = (property, value) => {
        let tasaProd = tasaProducto;
        tasaProd[property] = value;
        setTasaProducto(tasaProd);
        
    };

    
    let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
                <Button label="Borrar" icon="pi pi-times" onClick={_delete}/>
                <Button label="Grabar" icon="pi pi-check" onClick={save}/>
            </div>;

    let tasasInput = <Dropdown style={{width: '100%'}}
                id="tasaUI"
                value={tasa} 
                placeholder="Selecione la tasa"
                optionLabel="nombre"
                options={tasas} onChange={(e) => {updateTasa(e.target.value)}}/>


    return (

        tasaProducto && <Dialog visible={true} width="300px" header="Tasa Producto" modal={true} footer={dialogFooter} onHide={() => callback(false)}>
                            {
                                 
                               tasaProducto && 
                                
                                <div className="p-grid p-fluid">
                                    <div className="p-col-3" style={{padding:'.75em'}}><label htmlFor="tasaUI">Tasa:</label></div>
                                    <div className="p-col-9" style={{padding:'.5em'}}>
                                        {tasasInput}
                                    </div>

                                    <div className="p-col-3" style={{padding:'.75em'}}><label htmlFor="rangoUI">Saldo (Mill):</label></div>
                                    <div className="p-col-9" style={{padding:'.5em'}}>
                                        <div style={{ marginBottom: '5px' }}>Desde: {Intl.NumberFormat("es-CO").format(rangeValues[0])} hasta {Intl.NumberFormat("es-CO").format(rangeValues[1])}</div>
                                        <Slider id="rangoUI" min={0} max={10000000} increment="1" value={rangeValues} onChange={(e) => setRangeValues(e.value)} range={true} />
                                    </div>
                                     
                                    <div className="p-col-3" style={{padding:'.75em'}}><label htmlFor="cpuntosUI">Puntos</label></div>
                                    <div className="p-col-9" style={{padding:'.5em'}}>
                                        <div style={{ marginBottom: '5px' }}>{tasaProducto.puntos} puntos</div>
                                        <Slider id="puntosUI" increment={1} max={10} min={-10} value={puntos} onChange={(e) => {setPuntos(e.value); updateProperty("puntos",e.value)}} />
                                    </div>
                                </div>
                            }
                        </Dialog>
    )

}
import React, {useState,useEffect,useContext} from 'react';
import {ProductosClienteDataService} from '../services/DataService';
import LabelInfo from '../../components/LabelInfo';
import TasaProductoDialog from './TasaProductoDialog';
import {TasasService, TasasProductosService} from '../../service/TasasService'
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button'
import {TasasInfoContext} from '../../context/TasasInfoContext';

export default function ComDesCuenta (props){

    const [cuenta,setCuenta] = useState(null);
    const [tasas,setTasas] = useState(null);
    const [tasasProducto, setTasasProducto] = useState(null);
    const [tasaProd,setTasaProd] = useState(null);
    const [selectedRow, setSelectedRow] =useState(null);
    const [displayDialog, setDisplayDialog] = useState(false);

    const dataService = new ProductosClienteDataService();
    const tasasService = new TasasService();
    const tasasProductoService = new TasasProductosService();
    const tasasContext = useContext(TasasInfoContext);
    const handleCuentaResult = data=>{
        setCuenta(data.data);
    };
    const handleTasasResult = data=>{
        setTasas(data.data);
    };
    const handleTasasProductoResult = data=>{
        setTasasProducto(data.data);        
    };

    useEffect(()=>{
        dataService.get(props.cuentaId).then(handleCuentaResult);
        tasasProductoService.getTasasProducto(props.cuentaId).then(handleTasasProductoResult);


    }
    ,[props.cuentaId]);

    useEffect(()=>{
        tasasService.get().then(handleTasasResult);
    }
    ,[]);

    const onRowSelect = e =>{
        setDisplayDialog(true);
        setTasaProd(Object.assign({}, e.data));
    };

    const addNew = () => {    
          
        setTasaProd(	{ "id": null,
            "productoId": props.cuentaId,
            "tasaId": 0,
            "fechaCreacion": "11/11/2019",
            "fechaModificacion": "26/11/2019",
            "rangoMaximo": 0,
            "rangominimo": 0,
            "puntos":0
    	});
        setDisplayDialog(true);
    };

    const modificarProduto = () =>{
        setDisplayDialog(true);
    } 

    const refreshState = (refresh)=>{
        setDisplayDialog(false);
        setTasaProd(null);
        if(refresh){
            tasasProductoService.getTasasProducto(props.cuentaId).then(handleTasasProductoResult);
        }
    };

    const getNombreTasa = (rowData, column) => {
        let _tasa = tasas.filter(t=>t.id===rowData.tasaId);
            return (<div>
                {`${_tasa[0].nombre} (${_tasa[0].valorTasa})`}              
            </div>
            )
    }
    const formatMaximo =(rowData,column)=>{
        return <div style={{textAlign:"right"}}>
           {Intl.NumberFormat("es-CO").format(rowData.rangoMaximo)}
        </div>
    };
    const formatMinimo =(rowData,column)=>{
        return <div style={{textAlign:"right"}}>
            {Intl.NumberFormat("es-CO").format(rowData.rangoMinimo)}
        </div>
    };

    let  footer = <div className="p-clearfix" style={{width:'80px'}}>
            <Button style={{float:'left'}} label="Add" icon="pi pi-plus" onClick={addNew}/>
        </div>;
        return(
           cuenta && <div className="card card-w-title">
                <h1>Producto: {cuenta.Nombreproducto}</h1>
                <LabelInfo label="Tipo" info={cuenta.tipoProducto}/>
                <LabelInfo label="Exoneracion Chequera" info={cuenta.exoneracionChequera}/>
                <LabelInfo label="Periodo liquidacion" info={cuenta.periodoLiquidacion}/>
                <LabelInfo label="Cantidad cheques" info={cuenta.CantidadCheques}/>
                <div className="p-col-12 p-md-4" style={{textAlign:'center'}}>
                <Button label="modificar" style={{marginBottom:'30px', width:'100px'}} className="p-button-success p-button-rounded" onClick={modificarProduto}/>
                </div>
                <div>
                   { tasasProducto && tasas &&  
                    <div className="content-section implementation">
                        <DataTable value={tasasProducto} responsive={true} footer={footer}
                        selectionMode="single" selection={selectedRow}
                        onSelectionChange={e => setSelectedRow(e.value)}
                        onRowSelect={onRowSelect}>
                            <Column body={getNombreTasa} header="Tasa" />
                            <Column body={formatMinimo} header="Desde" />
                            <Column body={formatMaximo} header="Hasta" />
                            <Column field="puntos" header="puntos" />
                        </DataTable>
                    </div>
                    }
                    {displayDialog && <TasaProductoDialog callback={refreshState} tasas={tasas} tasaProducto={tasaProd} />}
                    
                </div>
            </div> 
        
        )

}


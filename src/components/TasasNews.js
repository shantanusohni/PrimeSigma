import React, {useState,useEffect,useContext} from 'react';
import {TasasService} from '../service/TasasService';
import {TasasInfoContext, } from '../context/TasasInfoContext';


export default function TasasNews (props){
    // const tasasService = new TasasService(); 
    //  const handleTasasResult = data=>{
    //     setTasas(data.data);
    // };
    useEffect(()=>{
        tasasContext.refresh();
    }
    ,[]);
    const tasasContext = useContext(TasasInfoContext);
    console.log('tasas encontradas');
    console.log(tasasContext.data);
    
    const estilosTasas =[{backgroundColor:'#007be5',color:'#00448f'}
    ,{backgroundColor:'#ef6262',color:'#a83d3b'}
    ,{backgroundColor:'#20d077',color:'#038d4a'}
    ,{backgroundColor:'#f9c851',color:'#b58c2b'}];
    // const datosTasa = tasasContext.data.filter((tasa,idx)=>{return idx<4});
    const datosTasa = tasasContext.data.map((tasa,idx)=>{
            if(idx<4){
                return <div className="p-col-12 p-md-6 p-xl-3">
                        <div className="highlight-box">
            <div className="initials" style={estilosTasas[idx]}><span>{tasa.nombre}-{idx}</span></div>
                            <div className="highlight-details ">
                                <i className="pi pi-search"/>
                                <span>{new Date(tasa.fechaModificacion).toLocaleString("es-CO",{dateStyle:'medium'})}</span>
                                <span className="count">{tasa.valorTasa}</span>
                            </div>
                        </div>
                    </div>
                    }
                }
                );


    return (
        
        datosTasa.length >0 && <div className="p-grid p-fluid tasasNews">
            {datosTasa}
              </div>
        
        )
        

}
import React from 'react';
import {TasasService} from '../service/TasasService';

const context = {
    data:[]
    ,refresh:()=>{console.log("Actualizar tasas");this.tasas = [1,2,3]; console.log(this.data);}
};

export const TasasInfoContext = React.createContext(context);

export const updateInfoData = fn =>{
    let tasasService = new TasasService();
    let handleTasasResult = data=>{
        fn(data.data);
    };
    tasasService.get().then(handleTasasResult);
};
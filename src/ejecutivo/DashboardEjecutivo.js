import React, { Component } from 'react';
import { PanelClientes } from './PanelClientes';
import { PanelTareas } from '../tareas/PanelTareas';
import TasasNews from '../components/TasasNews';
import { PanelBitacoraVisitas } from '../bitacoraVisitas/PanelBitacoraVisitas';

class DashboardEjecutivo extends Component {




    render() {

        return (
            <>
            <TasasNews/>
            <div className="p-grid" >
                <div className="p-md-8 p-lg-9 p-sm-12 p-col-12">
                    <PanelClientes />
                </div>
                <div className="p-md-4 p-lg-3 p-sm-12 p-col-12">
                    <div className="p-grid">
                        <div className="p-sm-6 p-md-12 p-lg-12 p-col-12"   style={{paddingBottom:'0px', marginBottom:'0px'}}>
                            <PanelTareas />
                        </div>
                        <div className="p-sm-6 p-md-12 p-lg-12 p-col-12"   style={{paddingBottom:'0px', marginBottom:'0px'}}>
                            <PanelBitacoraVisitas />
                        </div>
                    </div>
                </div>
            </div>
            </>
        )

    }

}

export default DashboardEjecutivo;


import React, { Component } from 'react';
import PageSearch, { setPageSearchCallback } from "../components/PageSearch"
import { UsuarioService } from '../components/usuario/service/usuarioService';
import TarjetaCliente from './TarjetaCliente'
import { Panel } from 'primereact/panel';

export class PanelClientes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clientes: null,
            cliente: null,
            searchTitle: 'Resumen de clientes'
        };
        this.usuarioService = new UsuarioService();

        //setPageSearchCallback.setPageSearchCallback(this.handlePageSearch);
        
    }

    handlePageSearch = searchString => {
        console.log(`handle search desde ejecutivo ${searchString}`);
        if (searchString && searchString.trim() !== '') {
            this.usuarioService.getUsersSummary(searchString)
                .then(data => this.setState({ clientes: data, searchTitle: `Resultados de busqueda: [${searchString}]` }));
        } else {
            this.usuarioService.getAllUsers().then(data => { this.setState({ clientes: data, searchTitle: 'Resumen de clientes' }); });
        }
    }


    componentDidMount() {
        this.usuarioService.getAllUsers().then(data => { this.setState({ clientes: data }); });
        PageSearch.setAutocompleteMode(false);
        PageSearch.setPageSearchCallback(this.handlePageSearch);
    }

    render() {
        let items = (this.state.clientes || []).map((cli, idx) => {
            return <TarjetaCliente key={cli.id} cliente={cli} />
        }
        );
        return (
            <div className="p-col-12"  className="mistareas">
                <Panel header={this.state.searchTitle}>
                    <div className="p-grid" style={{backgroundColor:"#FCF7F6"}}>
                        {items}
                    </div>
                </Panel>
            </div>

        )

    }



}

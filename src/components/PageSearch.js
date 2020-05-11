import { InputText } from 'primereact/inputtext';
import React, {Component } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { UsuarioService } from './usuario/service/usuarioService';

//function PageSearch() {
var pageSearchInstance ;
class PageSearch extends Component {

    constructor(props){
        super(props);
        pageSearchInstance = this;
        this.state = {
            searchCallback:null,
            searchString: '',
            autocompleteMode:false,
            filteredClients:null,
            cliente:null
    };
        //console.log('constructor pageSearch.js');
        this.usuarioService = new UsuarioService();

    }
    //static searchCallback = null;
    static setPageSearchCallback(fn) {
        //this.searchCallback = fn;
       // console.log('se establecio el callback en pageSearch.js');
        // console.log(fn);
        // console.log(this.searchCallback);
        pageSearchInstance.setState({searchCallback:fn});
    }
    
    
    setCliente = value => {
        this.setState({cliente:value});
    }
    setFilteredClients = value =>{        
        this.setState({filteredClients:value});
    }
   
    static setAutocompleteMode(value){
        console.log("establece autocomplete:" + value);
        pageSearchInstance.setState({autocompleteMode:value});

    }
    

    handleInputKeyPress = event => {
        if ('Enter' === event.key) {
            event.preventDefault();
            this.handlePageSearch(this.state.searchString);
        }
    }

    handleClientChange = (cli)=>{
        this.setCliente(cli);   
        if(cli.name){
            this.setState({cliente:null,searchString:''})
            let fn = this.state.searchCallback;
            fn && fn(cli);
            
        }         
    }

    filtercliente = (event) => {
        this.usuarioService.getUsersSummary(event.query.toLowerCase())
            .then(data => this.setFilteredClients(data));
        
    };

    handlePageSearch = searchString => {
        this.setState({ searchString })
        let fn = this.state.searchCallback;
        fn && fn(searchString);

       
    }
    render() {
        return (
            !this.state.autocompleteMode?  <span className="layout-topbar-search">
                <InputText type="text" placeholder="Search" value={this.state.searchString} onChange={event => { this.setState({searchString:event.target.value}); }} onKeyPress={this.handleInputKeyPress} />
                <span className="layout-topbar-search-icon pi pi-search" />
            </span>
            : <span className="layout-topbar-search">
                <AutoComplete minLength={2}
                        placeholder="Nombre del cliente"
                        id="clienteUI" size={30}
                        field="name"
                        suggestions={this.state.filteredClients}
                        completeMethod={this.filtercliente}
                        value={this.state.cliente}
                        // onSelect={e=>{alert(e.value.name)}}
                        // onUnselect={e=>{alert(e.value.name)}}
                        onChange={event => { this.handleClientChange(event.value); this.setFilteredClients(null); }}/>
                <span className="layout-topbar-search-icon pi pi-search" />
            </span>
        );
    }
}

export default PageSearch;

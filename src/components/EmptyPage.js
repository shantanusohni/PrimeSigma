import React, { Component } from 'react';
import { UsuarioList } from './usuario/usuarioList.js';
import {UsuarioService} from './usuario/service/usuarioService.js';
import {UsuarioInfo} from './usuario/usuarioInfo';

export class EmptyPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: null,
            user:null
        };
        this.usuarioService = new UsuarioService();
        this.getShowUser = this.getShowUser.bind(this)
    }


    getShowUser(event,){
        console.log("se paso el indice: "+event.index);

        // this.setState({ user: this.state.users[event.index] })

        this.usuarioService.getUserInfo(event.userid).then(data => this.setState({ user: data }))
        event.originalEvent.preventDefault();

    }
    componentDidMount() {
        this.usuarioService.getAllUsers().then(data => this.setState({ users: data }));
    }

    render() {
        return (
            <div className="p-grid p-fluid dashboard">
                <div className="p-col-12 p-md-6 p-lg-4">
                    <UsuarioList  items={this.state.users} onUserClick={this.getShowUser}/>
                </div>
                <div className="p-col-12 p-md-6 p-lg-4">
                    <UsuarioInfo  user={this.state.user}/>
                </div>
            </div>
        );
    }



}

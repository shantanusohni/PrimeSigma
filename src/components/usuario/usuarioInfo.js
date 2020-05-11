import React, { Component } from 'react';
import { Panel } from 'primereact/panel';
import PropTypes from 'prop-types';


export class UsuarioInfo extends Component {
    static defaultProps = {
        user: null
        // ,
        // onMenuItemClick: null
    }

    static propTypes = {
        user: PropTypes.object
        // ,
        // onMenuItemClick: PropTypes.func
    }

    // constructor(props) {
    //     super(props);
    // }

    renderPannel() {
        return (
            <Panel header={`Datos de cliente ${this.props.user.id}`} style={{ height: '100%' }}>
                <div>Usuario:{this.props.user.username}</div>
                <div>Usuario:{this.props.user.name}</div>
                <div>Email:{this.props.user.email}</div>
            </Panel>
        );
    }

    render() {
        return this.props.user ? this.renderPannel() : null;
    }


}
//export default App;
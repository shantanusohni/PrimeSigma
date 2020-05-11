import React, { Component } from 'react';
import { Panel } from 'primereact/panel';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class UsuarioList extends Component {
    static defaultProps = {
        items: null
        ,
        onUserClick: null
    }

    static propTypes = {
        items: PropTypes.array
        ,
        onUserClick: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {activeIndex: null,
                        className: 'task-list'};
    
    }

    onUserClick(event, item, index) {       

        if(this.props.onUserClick) {
            this.props.onUserClick({
                originalEvent: event,
                item: item,
                index:index,
                userid:item.id
            });
        }
    }


    renderPannel(items) {
        return (
           
            <Panel header={"Clientes (" + items.length+")"} style={{ height: '100%' }}>
            {/* <div class="card summary"><span class="title">Clientes:</span><span class="count visitors">{items.length}</span></div>               */}
              <ul className={this.state.className}>{items}</ul>
            </Panel>
        );
    }

    render() {
        let items = this.props.items && this.props.items.map((item, i) => {
            let active = this.state.activeIndex === i;
            let styleClass = classNames('card','sumary', { 'active-menuitem': active });

            return (
                <li className="card summary" key={i}>
                <a href={item.url || "#"} onClick={(e) => this.onUserClick(e, item, i)}>
                    <div ><span className="title">Customer Name: </span><span className="title">{item.username}</span></div>
                    <div ><span className="detail">Company: {item.company.name}</span><i className="pi pi-chart-bar"/></div>
                </a>
                </li>
            );
        });

        return items ? this.renderPannel(items) : <div>No se encontraron usuarios</div>;
    }


}
//export default App;
import React, {Component} from 'react';
import {FullCalendar} from 'primereact/fullcalendar';
//import {EventService} from '../service/EventService';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bitacoraApi from '../bitacoraVisitas/service/BitacoraService';
export default class Calendario extends Component {

    constructor() {
        super();
        this.bitacoraService = new bitacoraApi();
        this.state = {
            events:  [  
            ]        ,
            options: {
                plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
                defaultView: 'dayGridMonth',
                header: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                editable: true,
                eventClick: function(info) {
                        //alert('Event: ' + info.event.title);
                        document.location=`#/bitacoraVisitas/${info.event.id}`;
                }
            }
        };
        //this.eventService = new EventService();
    }

    componentDidMount() {
        //this.eventService.getEvents().then(data => this.setState({events: data}));
        this.bitacoraService.get().then(data => {
            console.log(data.data);
            this.setState({events: data.data})
            
            });


    }

    render() {

        return (
            <div>
                {/* <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>FullCalendar</h1>
                        <p>An event calendar based on the <a href="https://fullcalendar.io/">FullCalendar</a> library.</p>
                    </div>
                </div> */}

                <div className="content-section implementation">
                    <FullCalendar  events={this.state.events} options={this.state.options} />
                </div>

            </div>
        );
    }
}

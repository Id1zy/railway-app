// React Functions
import { useEffect, useState } from "react";
import { connect } from "react-redux";
// Components
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import PageHeading from "../../components/heros/pageHeading";
// Images
import { index_maps } from "../../helpers/users_helpers";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listYearPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import 'moment/locale/es';
import './calendar.css';
// Eventos API
import { getEvents } from "../../api/axiosEvent";

const CalendarStudent = ({ user }) => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedDate, setSelectedDate] = useState(moment().startOf('day'));
    const [color, setColor] = useState(
        window.localStorage.getItem("color"));

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await getEvents();
            if (response && response.data && response.data.results) {
                const formattedEvents = response.data.results.map(event => ({
                    id: event.id,
                    title: event.title,
                    start: event.start_date_time,
                    end: event.end_date_time || event.start_date_time,
                    extendedProps: {
                        description: event.description,
                        sectionName: `${event.section_id.course.nivel} - ${event.section_id.name}`,
                    }
                }));
                setEvents(formattedEvents);
            }
        };
        fetchEvents();
    }, []);

    const selectEventsForDate = (date) => {
        setSelectedDate(date);
        const dayEvents = events.filter(event =>
            moment(event.start).isSame(date, 'day')
        );
        setSelectedEvent(dayEvents.length > 0 ? dayEvents : null);
    };

    const handleDateSelect = (selectionInfo) => {
        const dayEvents = events.filter(event =>
          moment(event.start).isSame(selectionInfo.start, 'day')
        );
        setSelectedEvent(dayEvents.length > 0 ? dayEvents : null);
    }

    const handleDateClick = (arg) => {
        selectEventsForDate(moment(arg.dateStr));
    };

    const handleEventClick = (clickInfo) => {
        setSelectedEvent([clickInfo.event]);
    };

    const Style = {
        colorSchool :  `bg-new-${color}`,
      };

    return (
        <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'} user={user}>
            <SideBar color={Style.colorSchool}  useRol={'Estudiante'} mapeo={index_maps}>
                <div className="w-full md:w-4/5 bg-fondo p-4 h-full overflow-y-auto"> 
                <div className=''>
    <div className={`flex content-center items-center justify-between mx-2 my-4 border-b-4 pb-4 border-new-${color}`}>
    <div className="flex items-center">
        </div>
      <div className="min-w-0 flex-1">
        <h2 className={`text-xl2 sm:text-xl3 text-center font-bold leading-7 text-new-${color} `}>
          Calendario
        </h2>
      </div>
      <div>

      </div>
    </div>
    </div>

                    <div style={{ height: 500 }}>
                        <FullCalendar
                            plugins={[dayGridPlugin, listYearPlugin, interactionPlugin]}
                            headerToolbar={{ 
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth,listYear'
                            }}
                            initialView="dayGridMonth"
                            events={events}
                            locale='es'
                            buttonText={{
                                today: 'Hoy',
                                month: 'Mes',
                                list: 'Lista de eventos'
                            }}
                            dateClick={handleDateClick}
                            selectable={true}
                            select={handleDateSelect}
                            eventClick={handleEventClick}
                            eventContent={(renderInfo) => {
                                const eventName = renderInfo.event.title;
                                const sectionName = renderInfo.event.extendedProps.sectionName;
                                if (renderInfo.view.type === 'listYear') {
                                  return {
                                    html: `<div class='custom-event truncate-text cursor-pointer hover:opacity-70'>
                                             <span>${eventName}</span>
                                             <span class="section-name" style="float: right; margin-left: 10px;">${sectionName}</span>
                                           </div>`
                                  };
                                } else {
                                  return {
                                    html: `<div class='custom-event flex justify-between items-center truncate-text cursor-pointer hover:opacity-70'>
                                             <span>${eventName}</span>
                                             <span class="section-name" style="margin-left: 5px;">${sectionName}</span>
                                           </div>`
                                  };
                                }
                              }}
                        />
                    </div>
                </div>
                <div className="w-1/5 hidden md:block h-full bg-fondo p-4">
                    {selectedEvent && selectedEvent.length > 0 ? (
                        <div className="bg-white p-4 rounded shadow">
                            {selectedEvent.map((event, index) => (
                                <div key={index} className="mb-4">
                                    <h4 className="text-blue font-bold break-words overflow-hidden">{event.title}</h4>
                                    <p className="text-blue font-bold">{event.extendedProps.sectionName}</p>
                                    <p className="mt-2 text-gray-600 break-words overflow-hidden">{event.extendedProps.description}</p>
                                    <p className="mt-2">{moment(event.start).format('LLLL')}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white p-4 rounded shadow">
                            <h3 className={`text-new-${color} font-bold`}>No hay eventos para este día</h3>
                        </div>
                    )}
                </div>
            </SideBar>
        </PageUser>
    );
};

const mapStateToProps = state => ({
    user: state.Auth.user
});

export default connect(mapStateToProps)(CalendarStudent);
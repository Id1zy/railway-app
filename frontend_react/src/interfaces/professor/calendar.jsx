// React Functions
import { useEffect, useState } from "react";
import { connect } from "react-redux";
//Components
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import PageHeading from "../../components/heros/pageHeading";
// Images
import { profesor_maps } from "../../helpers/users_helpers";
// Eventos API
import { getEvents } from "../../api/axiosEvent";
import Portal from "../../components/core/Portal";
import CreateEvent from "../../components/forms/createEvent";
import EditEvent from "../../components/forms/edit/editEvent";
import DesactivateEvent from "../../components/forms/deactivate/desactivateEvent";

import FullCalendar from '@fullcalendar/react';

import dayGridPlugin from '@fullcalendar/daygrid';
import listYearPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { updateEventDate } from "../../api/axiosEvent";

import moment from 'moment';
import 'moment/locale/es'; 
import './calendar.css';


const MyCalendarComponent = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isCreateEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [isEditEventModalOpen, setEditEventModalOpen] = useState(false);
  const [isDesactivateModalOpen, setDesactivateModalOpen] = useState(false);
  const [color, setColor] = useState(
    window.localStorage.getItem("color"));
  

  useEffect(() => {
      const fetchEvents = async () => {
        const response = await getEvents();
        if (response && response.data && response.data.results) {
            const formattedEvents = response.data.results.map(event => {
                return {
                  id: event.id,
                  title: event.title,
                  start: event.start_date_time,
                  end: event.end_date_time || event.start_date_time,
                  extendedProps: {
                    description: event.description,
                    sectionName: `${event.section_id.course.nivel} - ${event.section_id.name}`,
                    section_id: event.section_id
                  }
                };
            });
            setEvents(formattedEvents);
        }
    }
  
      fetchEvents();
  }, []);

  const reloadEvents = async () => {
    try {
        const response = await getEvents();
        if (response && response.data && response.data.results) {
            const formattedEvents = response.data.results.map(event => {
              return {
                  id: event.id,
                  title: event.title,
                  start: event.start_date_time,
                  end: event.end_date_time || event.start_date_time,
                  extendedProps: {
                      description: event.description,
                      sectionName: `${event.section_id.course.nivel} - ${event.section_id.name}`,
                      section_id: event.section_id
                  }
              };
          });
            setEvents(formattedEvents);
        }
    } catch (error) {
        console.error('Error al obtener los eventos:', error);
    }
  };

  const handleEventDrop = async (info) => {
    const eventId = info.event.id;
    const newStartDate = info.event.start;

    try {
        await updateEventDate(eventId, newStartDate);
        reloadEvents();
    } catch (error) {
        console.error("Error al actualizar el evento:", error);
    }
  };

  const handleDateSelect = (selectionInfo) => {
    const dayEvents = events.filter(event =>
      moment(event.start).isSame(selectionInfo.start, 'day')
    );
  
    setSelectedEvent(dayEvents.length > 0 ? dayEvents.map(event => ({
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      sectionName: event.extendedProps.sectionName,
      description: event.extendedProps.description,
      section_id: event.extendedProps.section_id
    })) : null);
  }

  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    if (moment(event.start).isValid()) {
      setSelectedEvent({
        id: event.id,
        title: event.title,
        start: event.start, 
        end: event.end,
        sectionName: event.extendedProps.sectionName,
        description: event.extendedProps.description,
        section_id: event.extendedProps.section_id.section_id
      });
    } else {
      console.error('La fecha de inicio del evento no es válida:', event.start);
    }
  }
  const openEventModalCreate = () => {
    setCreateEventModalOpen(true);
  };
    
  const closeEventModalCreate = () => {
      setCreateEventModalOpen(false);
  };

  const openEventModalEdit = () => {
    setEditEventModalOpen(true);
  };

  const closeEventModalEdit = () => {
        setEditEventModalOpen(false);
  };

  const openDesactivateModal = () => {
    setDesactivateModalOpen(true);
  };
  
  const closeDesactivateModal = () => {
    setDesactivateModalOpen(false);
  };

  const Style = {
    colorSchool :  `bg-new-`+color,
    textSchool: `text-new-`+color,
    hoverSchool: `bg-new-h`+color,
    borderSchool: `border-new-`+color,
    buttonSchool: `bg-new-`+color+' hover:bg-new-h'+color,
  }

  return (
<PageUser color={`bg-white ${Style.textSchool}`} colorInput={`bg-white ${Style.textSchool}`} user={user}>
  <SideBar color={`${Style.colorSchool}`}  useRol="Profesor" mapeo={profesor_maps}>
    {/* Parte Central */}
    <div className={`w-full md:w-3/5 bg-fondo p-4 h-full overflow-y-auto`}>
      <div className=''>
        <div className={`flex content-center items-center justify-between mx-2 my-6 border-b-4 pb-4 border-new-${color}`}>
          <div className="flex items-center">
          </div>
          <div className="min-w-0 flex-1">
            <h2 className={`text-xl2 sm:text-xl3 text-center font-bold leading-7 ${Style.textSchool} `}>
              Calendario
            </h2>
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
          selectable={true}
          select={handleDateSelect}
          editable={true}
          eventDrop={handleEventDrop}
          eventClick={handleEventClick}
          buttonText={{
            today: 'Hoy',
            month: 'Mes',
            list: 'Lista de eventos'
          }}
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
    {/* Parte Derecha */}
    <div className={`w-1/5 hidden md:block h-full bg-fondo p-4`}>
      <button
        className={`mb-4 px-4 py-2 ${Style.colorSchool} hover:${Style.hoverSchool} text-white rounded transform transition-transform duration-300 hover:scale-105 `}
        onClick={openEventModalCreate}
      >
        Crear Evento
      </button>
      {Array.isArray(selectedEvent) && selectedEvent.length > 0 ? (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-black font-bold mb-4">Eventos del día</h3>
          {selectedEvent.map(event => (
            <div key={event.id} className="mb-4">
              <h4 className="${Style.textSchool} font-bold break-words overflow-hidden">{event.title}</h4>
              {event.sectionName && <p className={`${Style.textSchool} font-bold`}>{event.sectionName}</p>}
              {event.description && <p className="mt-2 text-gray-600 break-words overflow-hidden">{event.description}</p>}
              <p className="mt-2">{moment(event.start).format('LLLL')}</p>
            </div>
          ))}
        </div>
      ) : Array.isArray(selectedEvent) && selectedEvent.length === 0 ? (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="${Style.textSchool} font-bold">No existen eventos para este día</h3>
        </div>
      ) : selectedEvent ? (
        <div className="bg-white p-4 rounded shadow">
          <h3 className={`${Style.textSchool} font-bold break-words overflow-hidden`}>{selectedEvent.title}</h3>
          {selectedEvent.sectionName && <p className={`${Style.textSchool} font-bold`}>{selectedEvent.sectionName}</p>}
          {selectedEvent.description && (
            <p className="mt-2 text-gray-600 break-words overflow-hidden">{selectedEvent.description}</p>
          )}
          <p className="mt-2">{moment(selectedEvent.start).format('LLLL')}</p>
          <div className="flex flex-wrap justify-start space-x-4 mt-4">
            <button
                onClick={openEventModalEdit}
                className={`px-4 py-2 ${Style.colorSchool} text-white rounded transform transition-transform duration-300 hover:scale-105 w-full md:w-auto`}
            >
                Editar
            </button>
            <button
                onClick={openDesactivateModal}
                className={`px-4 py-2 bg-red-500 text-white rounded transform transition-transform duration-300 hover:scale-105 w-full md:w-auto mt-2 md:mt-0`}
            >
                Desactivar
            </button>
          </div>
        </div>
      ) : null}
    </div>
  </SideBar>
  <Portal open={isCreateEventModalOpen} onClose={closeEventModalCreate}>
    <div className={`w-full max-w-md  overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all transform duration-300 ease-in-out`}>
      <div className="w-full mb-3">
        <p className={`${Style.textSchool} text-xl font-bold text-center`}>Crear Evento</p>
      </div>
      <CreateEvent
        onClose={closeEventModalCreate}
        reloadEvents={reloadEvents}
      />
    </div>
  </Portal>
  <Portal open={isEditEventModalOpen} onClose={closeEventModalEdit}>
    <div className={`w-full max-w-md  overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all transform duration-300 ease-in-out`}>
      <div className="w-full mb-3">
        <p className={`${Style.textSchool} text-xl font-bold text-center`}>Editar Evento</p>
      </div>
      <EditEvent
        onClose={closeEventModalEdit}
        reloadEvents={reloadEvents}
        eventToEdit={selectedEvent}
      />
    </div>
  </Portal>
  <Portal open={isDesactivateModalOpen} onClose={closeDesactivateModal}>
    <div className={`w-full max-w-md  overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all transform duration-300 ease-in-out`}>
      <div className="w-full mb-3">
        <p className={`${Style.textSchool} text-xl font-bold text-center`}>Desactivar Evento</p>
      </div>
      <DesactivateEvent
        onClose={closeDesactivateModal}
        eventToDesactivate={selectedEvent}
        reloadEvents={reloadEvents}
      />
    </div>
  </Portal>
</PageUser>


  )
}

const mapStateToProps = state => ({
  user: state.Auth.user
});

export default connect(mapStateToProps)(MyCalendarComponent);
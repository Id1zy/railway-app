import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { updateSchedule } from '../../api/axiosSchedule';
import "../../components/heros/portals.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-inner">
          {children}
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};

const EditScheduleForm = ({ schedule, onClose, setRefresh }) => {
  const classes = {
    // ... (your current classes)
  };

  const [editedSchedule, setEditedSchedule] = useState({
    id: '',
    start_time_block: '',
    end_time_block: '',
    day_of_week: '',
    section_id: '',
  });

  const [editedTime, setEditedTime] = useState({
    start_time_block: '',
    end_time_block: '',
  });

  useEffect(() => {
    if (schedule) {
      setEditedSchedule({
        id: schedule.schedule_id,
        start_time_block: schedule.start_time_block,
        end_time_block: schedule.end_time_block,
        day_of_week: schedule.day_of_week,
        section_id: schedule.section,
      });

      setEditedTime({
        start_time_block: schedule.start_time_block,
        end_time_block: schedule.end_time_block,
      });
    }
  }, [schedule]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSchedule({
      ...editedSchedule,
      [name]: value,
    });
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setEditedTime({
      ...editedTime,
      [name]: value,
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const editedScheduleWithTime = {
        ...editedSchedule,
        start_time_block: editedTime.start_time_block,
        end_time_block: editedTime.end_time_block,
      };

      const res = await updateSchedule(editedSchedule.id, editedScheduleWithTime);
      console.log('Respuesta exitosa al editar:', res);

      setIsModalOpen(false);
      setRefresh((prevRefresh) => !prevRefresh);
    } catch (error) {
      console.error('Error al editar el horario:', error);
    }
  };

  const mapNumberToDay = (number) => {
    // Implementa tu lógica de mapeo de número a día aquí
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="centered-content">
        <form onSubmit={handleSubmit}>
          <div className="bg-UTP-comp rounded-b-lg px-5 py-1 centered-content">
            <p className='text-xl2 text-white font-medium py-10'>Editar Horario</p>

            <div className="grid grid-cols-2 py-2">
              <p className='text-xl1 text-white font-medium py-2'>ID: </p>
              <input
                type="text"
                id="id"
                name="id"
                value={editedSchedule.id}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 py-2">
              <p className='text-xl1 text-white font-medium py-2'>Hora de Inicio: </p>
              <input
                type="time"
                id="start_time_block"
                name="start_time_block"
                value={editedTime.start_time_block}
                onChange={handleTimeChange}
              />
            </div>

            <div className="grid grid-cols-2 py-2">
              <p className='text-xl1 text-white font-medium py-2'>Hora de Fin: </p>
              <input
                type="time"
                id="end_time_block"
                name="end_time_block"
                value={editedTime.end_time_block}
                onChange={handleTimeChange}
              />
            </div>

            <div className="grid grid-cols-2 py-2">
              <p className='text-xl1 text-white font-medium py-2'>Día de la Semana: </p>
              <input
                type="text"
                id="day_of_week"
                name="day_of_week"
                value={mapNumberToDay(editedSchedule.day_of_week)}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 py-2">
              <p className='text-xl1 text-white font-medium py-2'>Sección: </p>
              <input
                type="text"
                id="section_id"
                name="section_id"
                value={editedSchedule.section_id}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className={`${classes.fourth}`}>
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditScheduleForm;

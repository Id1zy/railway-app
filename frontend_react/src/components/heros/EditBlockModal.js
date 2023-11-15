import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { updateSchedule } from '../../api/axiosSchedule';
import "../../components/heros/EditBlockModal.css";

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



const classes = {
    // Agrega tus clases aquí según sea necesario
    // ...
  };

const EditBlockModal = ({ schedule, onClose, setRefresh,isOpen }) => {
  const numberToDayMap = {
    1: "Lunes",
    2: "Martes",
    3: "Miércoles",
    4: "Jueves",
    5: "Viernes",
    6: "Sábado",
    7: "Domingo"
};


const dayNumberToName = (number) => numberToDayMap[number] || "";
const dayNameToNumber = (dayName) => Object.keys(numberToDayMap).find(key => numberToDayMap[key] === dayName);

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
            id: schedule.id,
            start_time_block: schedule.init, // Cambiado de start_time_block a init
            end_time_block: schedule.fin,   // Cambiado de end_time_block a fin
            day_of_week: schedule.day_of_week, 
            section_id: schedule.section,   // Cambiado de section_id a section
        });

        setEditedTime({
            start_time_block: schedule.init, // Cambiado de start_time_block a init
            end_time_block: schedule.fin,   // Cambiado de end_time_block a fin
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

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Preparar los datos a enviar con las horas actualizadas
    const updatedScheduleData = {
        ...editedSchedule,
        start_time_block: editedTime.start_time_block,
        end_time_block: editedTime.end_time_block,
        day_of_week: editedSchedule.day_of_week, // Asegúrate de enviar el número del día
    };

    try {
        const res = await updateSchedule(updatedScheduleData.id, updatedScheduleData);
        console.log('Respuesta exitosa al editar:', res);
        onClose();
        setRefresh(prev => !prev);
    } catch (error) {
        console.error('Error al editar el horario:', error);
    }
};

const handleChangeDay = (dayName) => {
  const dayNumber = dayNameToNumber(dayName); // Convertir nombre a número
  setEditedSchedule({
      ...editedSchedule,
      day_of_week: dayNumber, // Almacenar como número
  });
};



  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="centered-content">
        <form onSubmit={handleSubmit}>
          <div className="bg-UTP-comp rounded-b-lg px-5 py-1 centered-content">
            <p className='text-xl2 text-gray font-medium py-10'>Editar Horario</p>

            <div className="grid grid-cols-2 py-2">
              <p className='text-xl1 text-gray font-medium py-2'>ID: </p>
              <input
                type="text"
                id="id"
                name="id"
                value={editedSchedule.id}
                readOnly
              />
            </div>

            <div className="grid grid-cols-2 py-2">
              <p className='text-xl1 text-gray font-medium py-2'>Hora de Inicio: </p>
              <input
                type="time"
                id="start_time_block"
                name="start_time_block"
                value={editedTime.start_time_block}
                onChange={handleTimeChange}
              />
            </div>

            <div className="grid grid-cols-2 py-2">
              <p className='text-xl1 text-gray font-medium py-2'>Hora de Fin: </p>
              <input
                type="time"
                id="end_time_block"
                name="end_time_block"
                value={editedTime.end_time_block}
                onChange={handleTimeChange}
              />
            </div>

            <div className="grid grid-cols-2 py-2">
  <p className='text-xl1 text-gray font-medium py-2'>Día de la Semana: </p>
  <select
  name="day_of_week"
  value={dayNumberToName(editedSchedule.day_of_week)} // Mostrar nombre del día
  onChange={(e) => handleChangeDay(e.target.value)}
>
  {Object.entries(numberToDayMap).map(([number, dayName]) => (
    <option key={number} value={dayName}>{dayName}</option>
  ))}
</select>
</div>

            <div className="grid grid-cols-2 py-2">
              <p className='text-xl1 text-gray font-medium py-2'>Sección: </p>
              <input
                type="text"
                id="section_id"
                name="section_id"
                value={editedSchedule.section_id}
                readOnly
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

export default EditBlockModal;

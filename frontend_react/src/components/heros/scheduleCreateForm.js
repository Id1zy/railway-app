import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { createSchedule } from '../../api/axiosSchedule'; // Asegúrate de importar desde la ruta correcta
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

const CreateScheduleForm = ({ setRefresh }) => {
  const classes = {
    // ... (tus clases actuales)
  };

  const [schedule, setSchedule] = useState({
    schedule_id: '',
    start_time_block: '',
    end_time_block: '',
    day_of_week: '',
    section_id: '',
    // Agrega más campos según sea necesario
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchedule({
      ...schedule,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await createSchedule(schedule);
  
      if (res.status === 201) {
        // Successful creation, trigger refresh
        setRefresh((prevRefresh) => !prevRefresh);
      } else {
        // Handle other status codes or errors if needed
        console.error('Unexpected response status:', res.status);
      }
  
      // Rest of the code...
    } catch (error) {
      console.error('Error al crear el horario:', error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 py-2">
        <button className={`${classes.fourth} py-2 my-2`} onClick={() => setIsModalOpen(true)}>
          Crear Horario
        </button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="centered-content">
            <form onSubmit={handleSubmit}>
              <div className="bg-UTP-comp rounded-b-lg px-5 py-1 centered-content">
                <p className='text-xl2 text-white font-medium py-10'>Crear Nuevo Horario</p>


                <div className="grid grid-cols-2 py-2">
                  <p className='text-xl1 text-white font-medium py-2'>Hora de Inicio: </p>
                  <input
                    type="text"
                    id="start_time_block"
                    name="start_time_block"
                    value={schedule.start_time_block}
                    onChange={handleChange}
                    style={{
                      padding: '5px',
                      borderRadius: '5px',
                      border: '1px solid UTP-comp',
                      width: '100%',
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 py-2">
                  <p className='text-xl1 text-white font-medium py-2'>Hora de Fin: </p>
                  <input
                    type="text"
                    id="end_time_block"
                    name="end_time_block"
                    value={schedule.end_time_block}
                    onChange={handleChange}
                    style={{
                      padding: '5px',
                      borderRadius: '5px',
                      border: '1px solid UTP-comp',
                      width: '100%',
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 py-2">
                  <p className='text-xl1 text-white font-medium py-2'>Día de la Semana: </p>
                  <input
                    type="text"
                    id="day_of_week"
                    name="day_of_week"
                    value={schedule.day_of_week}
                    onChange={handleChange}
                    style={{
                      padding: '5px',
                      borderRadius: '5px',
                      border: '1px solid UTP-comp',
                      width: '100%',
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 py-2">
                  <p className='text-xl1 text-white font-medium py-2'>Sección: </p>
                  <input
                    type="text"
                    id="section_id"
                    name="section_id"
                    value={schedule.section_id}
                    onChange={handleChange}
                    style={{
                      padding: '5px',
                      borderRadius: '5px',
                      border: '1px solid UTP-comp',
                      width: '100%',
                    }}
                  />
                </div>

                {/* Agrega más campos según sea necesario */}
                <button type="submit" className={`${classes.fourth}`}>
                  Crear Horario
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default CreateScheduleForm;
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { desactivateSchedule } from '../../api/axiosSchedule';
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

const DesactivateScheduleForm = ({ schedule, onClose, onDesactivate, onActivate }) => {
  const [manualDesactivateId, setManualDesactivateId] = useState('');

  const handleDesactivateManual = async () => {
    try {
      if (manualDesactivateId) {
        const confirmDesactivate = window.confirm(`¿Seguro que deseas desactivar el horario con ID ${manualDesactivateId}?`);

        if (confirmDesactivate) {
          await desactivateSchedule(manualDesactivateId);

          // Actualizar listas de horarios
          onDesactivate(manualDesactivateId);

          // Limpiar el ID manual
          setManualDesactivateId('');

          // Cerrar modal
          onClose();
        }
      }
    } catch (error) {
      console.error('Error al desactivar el horario:', error);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="centered-content">
        <div className="bg-UTP-comp rounded-b-lg px-5 py-1 centered-content">
          <p className='text-xl2 text-white font-medium py-10'>Desactivar Horario</p>
          {/* Nueva sección para la desactivación manual */}
          <div className="manual-desactivate">
            <p>Ingresa el ID del horario que deseas desactivar:</p>
            <input
              type="text"
              value={manualDesactivateId}
              onChange={(e) => setManualDesactivateId(e.target.value)}
            />
            <button onClick={handleDesactivateManual}>Desactivar Manualmente</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DesactivateScheduleForm;

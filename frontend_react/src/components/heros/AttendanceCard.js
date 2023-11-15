import React, { useState } from 'react';
import Modal from './Modal'; // Asegúrate de tener este componente o uno similar

const AttendanceCard = ({ subject, presence }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1">
        <div className="flex flex-col items-center justify-center h-full bg-white rounded-lg shadow-xl p-4">
          <h5 className="text-xl font-bold text-gray-800 mb-2">{subject}</h5>
          <p className="text-sm text-gray-600 mb-4">Presencia: {presence}%</p>
          <button onClick={toggleModal} className="mb-2 md:mb-0 bg-purple-600 px-5 py-2 shadow-sm tracking-wider text-white rounded-full hover:bg-purple-700 transition duration-150 ease-in-out">
            <span className="mx-auto">Ver Detalles</span>
          </button>
        </div>
      </div>

      {/* Aquí estamos pasando el estado isModalOpen al componente Modal */}
      <Modal show={isModalOpen} onClose={toggleModal}>
        {/* Contenido del Modal */}
        <div className="text-lg">Detalles de ausencias para {subject}</div>
        {/* Aquí puedes agregar más detalles o acciones */}
      </Modal>
    </>
  );
};

export default AttendanceCard;

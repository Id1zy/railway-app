import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteSectionForm from '../forms/deactivate/deactivateSection';
import UpdateSectionForm from '../forms/edit/editSection';
import { getSectionAlumUTP } from "../../api/axiosSection";

export default function SectionsCardUTP({ colorText, colorButton, title, subtitle, sectionId, button }) {
  const classes = {
    first: 'text-xl3 text-white font-semibold',
    second: 'text-xl2 text-white font-medium',
    third: 'w-full md:w-40 mb-2 md:mb-0 sm:mr-2  bg-UTP-des rounded-lg py-2 px-4',
    fourth: 'w-full md:w-40 mb-2 md:mb-0 sm:mr-2 bg-UTP-des text-white rounded-lg py-0.5 px-4',
    Btn_act: "mr-2 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-700",
  };
  const [isModalDelOpen, setIsModalDelOpen] = useState(false);
  const [isModalUpOpen, setIsModalUpOpen] = useState(false);
  const delSectionId = sectionId;

  const [professors, setProfessor] = useState([]);
  
  const fetchSection = async () => {
    try {
      const response = await getSectionAlumUTP(sectionId);
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.results && responseData.results.length > 0) {
          const sectionData = responseData.results.filter(user => user.rol === 'profesor' || user.rol === 'Profesor');
          console.log("Datos de la sección obtenidos con éxito:", sectionData);
          setProfessor(sectionData);
        } else {
        }
      } else {
      }
    } catch (err) {
    }
  };

  useEffect(() => {
    fetchSection();
  }, [sectionId]);

  return (
    <>
      <div class="grid grid-cols-1 py-2">
        <div>
          <p className='inline-block rounded-t-lg py-0.7 px-5 bg-UTP-des text-xl1 text-white font-medium'>Sección: {title}</p>
        </div>
        <div class="bg-UTP-comp rounded-b-lg px-5 py-1 grid grid-cols-3 items-center">
          {professors.length > 0 && (
            <div>
            <p className='col-start-1 col-end-2 text-xl1 text-blue font-medium'>Profesor(a) jefe:  {professors[0].first_name} {professors[0].last_name}</p>
            </div>
          )}
          <div className="col-start-2 col-end-6 flex justify-end">
            <Link to={`/utp/section/${delSectionId}`}>
              <button className={`${classes.Btn_act}`}>
                Ver Detalles
              </button>
            </Link>
            <UpdateSectionForm isOpen={isModalUpOpen} sectionId={delSectionId} onClose={() => setIsModalUpOpen(false)} />
            <DeleteSectionForm isOpen={isModalDelOpen} sectionId={delSectionId} onClose={() => setIsModalDelOpen(false)} />
          </div>
        </div>
      </div>
    </>
  );
}
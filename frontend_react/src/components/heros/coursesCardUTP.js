import React, { useState, useEffect } from 'react';
import { getSectionUTP } from "../../api/axiosSection";
import SectionsCardUTP from "../heros/sectionsCardUTP"
import DeleteCourseForm from "../forms/deactivate/deactivateCourse";
import UpdateCourseForm from "../forms/edit/editCourse";
import {ConnectedCreateSectionForm,ConnectedModal} from '../forms/create/createSection';

export default function CourseCardUTP({ colorText, colorButton, title, subtitle, courseId, button }) {
  const classes = {
    first: 'text-xl3 text-blue font-semibold',
    second: 'text-xl2 text-blue font-medium',
    third: 'w-full md:w-40 mb-2 md:mb-0 sm:mr-2  bg-UTP-des rounded-lg py-2 px-4',
    fourth: 'w-full md:w-40 mb-2 md:mb-0 sm:mr-2 bg-UTP-des text-white rounded-lg py-2 px-4',
    seconds: 'text-xl2 sm:text-xl3 font-bold leading-7 text-blue',
    Btn_crecer: "mr-2 px-4 py-2 bg-blue text-white rounded transform transition-transform duration-300 hover:scale-105 hover:bg-blue-600",
  };
  const [mostrarDesplegar, setDesplegar] = useState(false);
  const [sections, setSections] = useState([]);
  const [noSections, setNoSections] = useState(false);

  useEffect(() => {
    List_Sections();
  }, [courseId]);

  const List_Sections = async () => {
    try {
      const res = await getSectionUTP(courseId); 
      console.log("API Response:", res.data);
  
      if (res && res.data && res.data.results) {
        const filteredSections = res.data.results.filter(seccion => seccion.course === courseId);
        console.log("Filtered Sections:", filteredSections);
        setSections(filteredSections);
  
        if (filteredSections.length === 0) {
          setNoSections(true);
        } else {
          setNoSections(false);
        }
      }
      return res;
    } catch (err) {
      return err;
    }
  }

  const [isModalDelOpen, setIsModalDelOpen] = useState(false);
  const [isModalUpOpen, setIsModalUpOpen] = useState(false);

  const delCourseId = courseId;

  const handleClickDesplegar = async () => {
    setDesplegar(!mostrarDesplegar);
  };

  const [showForm, setShowForm] = useState(true);
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <div className='bg-UTP-comp border-l-[10px] border-UTP-des rounded-[20px] p-3 shadow-md sm:grid-cols-2'>
        <div className="min-w-0 flex-1">
          <h2 className={`${classes.first} ${colorText} `}>
            Curso: {title}
          </h2>
          <h3 className={`${classes.second} ${colorText} `}>
            Escuela: {subtitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            <button
              onClick={handleClickDesplegar}
              className={`${mostrarDesplegar ? 'bg-dark-blue text-blue' : 'bg-UTP-des text-white'} ${classes.Btn_crecer} ${colorButton} col-start-1 col-end-2`}
            >
              {button}
            </button>
            <div className="col-start-3 col-end-6 flex justify-end space-x-2">
              <UpdateCourseForm isOpen={isModalUpOpen} courseId={delCourseId} onClose={() => setIsModalUpOpen(false)} />
              <DeleteCourseForm isOpen={isModalDelOpen} courseId={delCourseId} onClose={() => setIsModalDelOpen(false)} />
            </div>
          </div>
        </div>
      </div>

      {mostrarDesplegar && (
        <div className="bg-UTP-combg rounded-lg px-5 mx-4">
          {noSections ? (
            <ul>
              <div className="flex lg:ml-4 lg:mt-0">
                {showForm && (
                  <ConnectedModal isOpen={showForm} onClose={toggleForm}>
                    <ConnectedCreateSectionForm/>
                  </ConnectedModal>
                )}
              </div>
              <p className='text-xl1 text-blue font-medium'>No existen secciones en este curso.</p>
            </ul>
          ) : (
            <ul>
              <div className="flex lg:ml-4 lg:mt-0">
                {showForm && (
                  <ConnectedModal isOpen={showForm} onClose={toggleForm}>
                    <ConnectedCreateSectionForm courseId={delCourseId}/>
                  </ConnectedModal>
                )}
              </div>
              {sections.map((seccion) => (
                <SectionsCardUTP
                  key={seccion.section_id}
                  colorText={'text-white text-center md:text-left pl-[70px] md:pl-0'}
                  colorButton={'bg-UTP-des'}
                  title={seccion.name}
                  sectionId={seccion.section_id}
                  button='Desplegar'
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}
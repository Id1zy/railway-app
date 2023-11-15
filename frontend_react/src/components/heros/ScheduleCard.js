import React, { useState, useEffect } from 'react';
import { getSchedule } from "../../api/axiosSchedule";
import SectionSchedule from "../../components/heros/sectionCard";


export default function ScheduleCard({ colorText, colorButton, title, subtitle, scheduleId, button }) {
  const classes = {
    section_id: 'text-xl3 text-white font-semibold',
    second: 'text-xl2 text-white font-medium',
    third: 'w-full md:w-40 mb-2 md:mb-0 sm:mr-2  bg-UTP-des rounded-lg py-2 px-4',
    fourth: 'w-full md:w-40 mb-2 md:mb-0 sm:mr-2 bg-UTP-des text-white rounded-lg py-2 px-4',
  };

  const [mostrarDesplegar, setDesplegar] = useState(false);
  const [schedules, setSchedule] = useState([]);
  const [noSchedule, setNoSchedule] = useState(false);

  useEffect(() => {
    List_Schedules();
  }, [scheduleId]);

  const List_Schedules = async () => {
    try {
      const res = await getSchedule(scheduleId);
      if (res && res.data && res.data.results) {
        const filteredSchedule = res.data.results.filter(schedule => schedule.course === scheduleId);
        setSchedule(filteredSchedule);

        if (filteredSchedule.length === 0) {
          setNoSchedule(true);
        } else {
            setNoSchedule(false);
        }
      }
      return res;
    } catch (err) {
      return err;
    }
  }

  const [isModalDelOpen, setIsModalDelOpen] = useState(false);
  const [isModalUpOpen, setIsModalUpOpen] = useState(false);

  

  const handleClickDesplegar = async () => {
    setDesplegar(!mostrarDesplegar);
  };

  return (
    <>
      <div className='bg-UTP-comp border-l-[10px] border-UTP-des rounded-[20px] p-3 shadow-md sm:grid-cols-2'>
        <div className="min-w-0 flex-1">
          <h2 className={`${classes.first} ${colorText} `}>
            Curso: {title}
          </h2>
          <h3 className={`${classes.second} ${colorText} `}>
            Descripción del curso
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            <button
              onClick={handleClickDesplegar}
              className={`${mostrarDesplegar ? 'bg-white text-UTP-des' : 'bg-UTP-des text-white'} ${classes.third} ${colorButton} col-start-1 col-end-2`}
            >
              {button}
            </button>
            <div className="col-start-3 col-end-6 flex justify-end space-x-2">
              <button onClick={() => setIsModalUpOpen(true)} className={`${classes.fourth}`}>
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>

      {mostrarDesplegar && (
        <div className="bg-UTP-combg rounded-lg px-5 mx-4">
          {noSchedule ? (
            <p className='text-xl1 text-white font-medium'>No existen secciones en este curso.</p>
          ) : (
            <ul>
              {schedules.map((schedule) => (
                <SectionSchedule
                  key={schedule.schedule_id}
                  colorText={'text-white text-center md:text-left pl-[70px] md:pl-0'}
                  colorButton={'bg-UTP-des'}
                  title={schedule.name}
                  subtitle={schedule.section_id}
                  courseId={schedule.id}
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
// React imports
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Components
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import PageHeading from "../../components/heros/pageHeading";
import CreateFormStudentGrade from "../../components/forms/create/createStudentGrade";
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { PaginationWhite } from "../../components/users/pagination";
// Helpers
import { profesor_maps } from "../../helpers/users_helpers";

// Functionalities
import { 
    registerStAttendance,
    getStAttendance,
    editStAttendance,
    deleteStAttendance
 } from "../../api/axiosStudentAttendance";
 import { getScheduleofSection } from "../../api/axiosSection";

// Tailwind
import { Card, CardBody, CardFooter, CardHeader } from "@material-tailwind/react";

export default function AttendanceSummary({section_id, schedule_id, update}){
    const [attendance, setAttendance] = useState([]);
    const [scheduleDetails, setScheduleDetails] = useState({});
    const navigate = useNavigate();
    const params = useParams();

    // Pagination states
    const [page, setPage] = useState(1);
    const [forPage, setForPage] = useState(7);
    const max = attendance.map((item) => item).length / forPage;

    const classes = ({
        first: 'flex content-center items-center justify-between mx-2 my-6 border-b-4 pb-4',
        second:'text-xl2 sm:text-xl3 font-bold leading-7 text-blue ',
        third: 'button_tech_colorless',
      })

      useEffect(() => {
        const loadScheduleOfSection = async () => {
          try{
            const res = await getScheduleofSection(section_id, schedule_id); 
            if(res.data && res.data.results){
              setScheduleDetails(res.data.results[0])
            }
          } catch(err) {
            return err;
          }
        }

        const getAttendance = async () => {
          try{
              const res = await getStAttendance(section_id, schedule_id);
              if(res.data && res.data.results){
                  setAttendance(res.data.results)
              }
          } catch(err) {
              return err;
          }
      }


        loadScheduleOfSection();
        getAttendance();
      }, [update]);


      const handlerClick = () => {
        navigate(-1);
      }

    return (
        <>
            <Card className="w-full bg-new-fondo">

              <CardBody>
                <div className="bg-new-blue rounded-md p-2"> 
                  <p className="text-white font-bold text-xl2 text-center">Detalles de Estudiantes</p>
                </div>
              {attendance && attendance.length !== 0 ? attendance.slice((page-1)*forPage, (page-1)*forPage+forPage).map((att, index) => ( 
                      <Disclosure className="">
                        {({ open }) => (
                          <div className="w-full gap-4">
                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-new-green px-4 py-2 mt-2 text-left text-lg font-medium text-white drop-shadow-lg hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-102 hover:bg-admin-green duration-300">
                                <div className="flex flex-wrap text-white font-bold text-left">
                                  <p className="mr-2 bg-admin-blue px-3 rounded-lg">N°- {index+1}</p>
                                  <p>{att.full_name}</p> 
                                </div>
                                <ChevronUpIcon
                                  className={`${
                                    open ? 'rotate-180 transform' : ''
                                  } h-5 w-5 text-purple-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel >
                              <Card className="flex w-full p-4 mt-2 bg-white space-y-2 ">
                                <div>
                                <div className="bg-new-red rounded-md p-2">
                                  <p className="text-white font-bold text-base">Clases Asistidas: {att.number_attendances}</p>
                                </div>
                                </div>
                                
                                <div>
                                <div className="bg-new-red rounded-md p-2">
                                  <p className="text-white font-bold text-base">Inasistencias: {att.number_absences}</p>
                                </div>
                                </div>

                                <div>
                                <div className="bg-new-red rounded-md p-2">
                                  <p className="text-white font-bold text-base">Porcentaje de Asistencia: {Math.round((att.number_attendances/scheduleDetails.num_classes)*100)}%</p>
                                </div>
                                </div>

                
                              </Card>
                                 
                            </Disclosure.Panel>
                          </div>
                        )}
                      </Disclosure>
                  )): <div><p>Cargando...</p></div>}
                  <PaginationWhite page={page} setPage={(n) => setPage(n)} max={max}/>
              </CardBody>
          </Card>
        </>

    )
}
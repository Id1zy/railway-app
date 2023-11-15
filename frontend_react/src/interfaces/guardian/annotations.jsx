import PageUser from "../../hocs/layouts/PageUser";
import PageHeading from "../../components/heros/pageHeading";
import { connect } from "react-redux";
import { Navigate, NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SideBar from "../../components/users/sidebar";
import { guardian_maps } from "../../helpers/users_helpers";
import { Card, Typography } from "@material-tailwind/react";

// Funciones
import { getStudentObservations } from "../../api/axiosObservations";

const GuardianAnnotations = ({ user }) => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
  
    useEffect(() => {
        const fetchStudentsAndObservations = async () => {
            try {
                const response = await getStudentObservations();
                if (response && response.data) {
                  setStudents(response.data.results[0].students);
                  console.log(response.data.results[0].students);
                }
            } catch (error) {
                console.error('Error al obtener los estudiantes y observaciones:', error);
            }
        };
        fetchStudentsAndObservations();
    }, []);
  
    return (
        <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'}>
          <SideBar color={'bg-blue'} userData={user} useRol="Apoderado" mapeo={guardian_maps}>
            <div className="flex w-full md:w-4/5 bg-fondo p-4 h-full shadow-md overflow-y-auto">

              <div className="w-1/3 border-r-2 border-blue pr-4">
                <h2 className="text-blue font-bold mb-4">Estudiantes:</h2>
                <div>
                {students.map(studentEntry => (
                    <div key={studentEntry.rut} className="flex flex-col p-2 mb-4 cursor-pointer hover:bg-gray-200 rounded"
                        onClick={() => setSelectedStudent(studentEntry)}>
                        <div className="bg-blue rounded-md px-2 py-1 mb-2">
                            <p className="text-white font-bold text-left"> Estudiante: {studentEntry.full_name} </p>
                            <p className="text-white font-bold text-left"> R.U.T: {studentEntry.rut} </p>
                        </div>
                    </div>
                ))}
                </div>
              </div>
              <div className="w-2/3 pl-4">
                {selectedStudent ? (
                    <>
                        <h2 className="text-blue font-bold mb-4">Observaciones para {selectedStudent.full_name}:</h2>
                        <table className="w-full table-auto text-center">
                            <thead className="bg-blue">
                                <tr>
                                    <th className="border-b border-white p-4">
                                        <Typography variant="small" className="font-normal leading-none text-white font-bold">Horario</Typography>
                                    </th>
                                    <th className="border-b border-white p-4">
                                        <Typography variant="small" className="font-normal leading-none text-white font-bold">Subsector</Typography>
                                    </th>
                                    <th className="border-b border-white p-4">
                                        <Typography variant="small" className="font-normal leading-none text-white font-bold">Observación</Typography>
                                    </th>
                                    <th className="border-b border-white p-4">
                                        <Typography variant="small" className="font-normal leading-none text-white font-bold">Positivo/Negativo</Typography>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {selectedStudent.observations && selectedStudent.observations.length > 0 ? 
                                    selectedStudent.observations.map((observation, index) => (
                                        <tr key={index}>
                                            <td className="p-4 border-b border-blue">
                                                <Typography variant="small" color="black" className="font-medium">
                                                    {observation.schedule_details.day_of_week} de {observation.schedule_details.start_time_block}-{observation.schedule_details.end_time_block}
                                                </Typography>
                                            </td>
                                            <td className="p-4 border-b border-blue">
                                                <Typography variant="small" color="black" className="font-medium">
                                                    {observation.section_details.subject_details.name}
                                                </Typography>
                                            </td>
                                            <td className="p-4 border-b border-blue">
                                                <Typography variant="small" color="black" className="font-medium">
                                                    {observation.description}
                                                </Typography>
                                            </td>
                                            <td className="p-4 border-b border-blue">
                                                <Typography variant="small" color="black" className="font-medium">
                                                    {observation.type_observation}
                                                </Typography>
                                            </td>
                                        </tr>
                                    ))
                                : 
                                    <tr>
                                        <td colSpan="4" className="p-4 border-b border-blue text-black font-medium text-center">
                                            No hay observaciones para este estudiante.
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </>
                ) : (
                    <div className="grid grid-cols-1 mb-3">
                        <div className='bg-white text-blue font-bold rounded-[20px] p-3 shadow-tech-outer border-x-4 sm:border-l-4 border-blue'>
                            <div className='text-center'>
                                <p className='text-lg'>
                                    Selecciona un estudiante para ver sus observaciones.
                                </p>
                            </div>
                        </div>
                    </div>

                )}
            </div>
              
            </div>
          </SideBar>
        </PageUser>
      );
    }

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
});

export default connect(mapStateToProps, {})(GuardianAnnotations);
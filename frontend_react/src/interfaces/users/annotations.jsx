// React Functions
import { useEffect, useState } from "react";
import { connect } from "react-redux";
//Components
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import PageHeading from "../../components/heros/pageHeading";
// Images
import { index_maps } from "../../helpers/users_helpers";
import { Card, Typography } from "@material-tailwind/react";
//Funciones
import { getStudentObservations } from "../../api/axiosObservations";

const Annotations = ({ user }) => {
  const [userData, setUserData] = useState('');
  const [observations, setObservations] = useState([]);
  const [color, setColor] = useState(
    window.localStorage.getItem("color"));

  useEffect(() => {
      if (user) {
          setUserData(user);
      }
  }, [user]);

  useEffect(() => {
      const fetchObservations = async () => {
          try {
              const response = await getStudentObservations();
              if (response && response.data && Array.isArray(response.data.results)) {
                const activeObservations = response.data.results.filter(obs => obs.is_active);
                setObservations(activeObservations);
              }
          } catch (error) {
              console.error('Error al obtener las observaciones:', error);
          }
      };

      fetchObservations();
  }, []);

  const Style = {
    colorSchool :  `bg-new-${color}`,
  }

  return (
      <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'} >
          <SideBar color={Style.colorSchool}  userData={userData} useRol="Estudiante" mapeo={index_maps}>
              <div className="w-full md:w-4/5 bg-fondo p-4 h-full shadow-md overflow-y-auto"> 
                  <PageHeading colorText={`!text-school-${color}`}  colorButton={'hidden'} border={'border-blue'} title='Anotaciones' button=''/>
                  <Card className="w-full text-white shadow-tech-outer rounded hidden sm:block">
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
                            
                              {observations.map((observation, index) => (
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
                            ))}
                          </tbody>

                          {observations.length === 0 && (
                            <p className="text-new-blue text-center font-bold">No Hay Anotaciones.</p>
                          )}
                      </table>
                  </Card>
              </div>
          </SideBar>
      </PageUser>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user
});

export default connect(mapStateToProps, {})(Annotations);
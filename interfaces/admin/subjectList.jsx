import { useState, useEffect } from "react";
import { connect } from "react-redux";
//Components
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import Signup from "../../components/forms/signup";
import CreateUser from "../../components/forms/createUser";
// Helpers
import { index_admin } from "../../helpers/users_helpers";
import { create_subjects, get_subjects } from "../../api/axiosSubjects";
import CreateSubjects from "../../components/forms/createSubjects";

import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";




const SubjecttList = () => {
    const [subjects, setSubjects] = useState([]);


  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await get_subjects();
        if (res && res.data) {
          setSubjects(res.data.results); 
        }
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
      }
    }
    loadUsers();
  }, []);
 console.log(subjects)

    const data = [
        {
          label: "Listado",
          value: "Read",
          desc:

          <>
          <table className="border-collapse border border-blue table-auto md:table-fixed">
  <thead>
    <tr>
      <th className="border border-blue">ID</th>
      <th className="border border-blue">Nombre</th>

    </tr>
  </thead>
  <tbody>
    {
         subjects.length > 0 ? (
            subjects.map(user => (
              <tr key={user.id} className="border border-blue">
      <td className="border border-blue">{user.id}</td>
      <td className="border border-blue">{user.name}</td>
    </tr>
              
            ))
          ) : null
    }
    
  </tbody>
</table>
          </>


        },
        {
          label: "Crear Estudiante",
          value: "Create",
          desc: <>
          <CreateSubjects/>
          </>,
        },
        {
          label: "Editar Estudiante",
          value: "Update",
          desc: `We're not always in the position that we want to be at.
          We're constantly growing. We're constantly making mistakes. We're
          constantly trying to express ourselves and actualize our dreams.`,
        },
        {
          label: "Desactivar Estudiante",
          value: "Delete",
          desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
        },
      ];

    return(
        <PageUser  >
          <SideBar  useRol={'Administrador'} mapeo={index_admin}>
            {/* Parte Central */}
            <div className="w-full md:w-4/5 bg-fondo p-4 h-full">    
            <div className="mx-auto max-w-7xl mt-4">
            <div className="grid grid-cols-1 gap-4 mb-5">



            <Tabs value="Read">
      <TabsHeader>
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
    
               
            </div>
            </div>
            </div>


          </SideBar>

   </PageUser>
    )
}


const mapStateToProps = state => ({
  });
  export default connect(mapStateToProps,{
  })(SubjecttList);
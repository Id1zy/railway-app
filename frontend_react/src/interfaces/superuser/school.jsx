import { useState, useEffect } from "react";
import React from "react";
import { connect } from "react-redux";
//Components
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import Signup from "../../components/forms/signup";
import CreateUser from "../../components/forms/createUser";
// Helpers
import { superuser_maps } from "../../helpers/users_helpers";
import { get_users } from "../../api/axiosUsers";
import { TabsCustomAnimation } from "../../components/tabs";
import PageHeading from "../../components/heros/pageHeading";
import { TableSchool } from "../../components/admin/tables/tableSchool";
import CreateStudent from "../../components/forms/createStudent";
import CreateSchool from "../../components/forms/create/createSchool";
import { getSchool } from "../../api/axiosSchool";
import { TableSchoolDeactivated } from "../../components/admin/tables/tableSchoolActivate";



const SchoolList = () => {
    const [schools, setSchools] = useState([]);
    const [update, setUpdate] = useState(0);

  useEffect(() => {
    async function loadSchool() {
      try {
        const res = await getSchool();
        if (res && res.data && res.data.results) {
            console.log(res.data.results)
          setSchools(res.data.results);
        }
      } catch (error) {
        console.error('Error al cargar los estudiantes:', error);
      }
    }
    loadSchool();
  }, [update]);
  
 

 
  const HEAD = ["RBD", "Nombre", "Teléfono"," Correo Electrónico", "Funciones"];
  const ROW = schools

    const data = [
        {
          label: "Activados",
          value: "Activated",
          desc:
          <>
          <TableSchool head={HEAD} row={ROW} update={()=>setUpdate(update+1)}/>
          </>


        },
        {
            label: "Desactivado",
            value: "Desactivated",
            desc:
            <>
            <TableSchoolDeactivated head={HEAD} row={ROW} update={()=>setUpdate(update+1)}/>
            </>
  
  
          },
        {
          label: "Crear Colegio",
          value: "Create",
          desc: <CreateSchool />
        },
      ];

    return(
        <PageUser color={'bg-admin-black text-white'} colorInput={'bg-admin-input text-white placeholder-white'}>
          <SideBar  color={'bg-admin-black'} colorSecond={'admin-green'}  useRol={'Super User'} mapeo={superuser_maps}>
            {/* Parte Central */}
            <div className="w-full md:w-4/5 bg-admin-background p-4 h-full overflow-y-auto hover:overflow-scroll">    
            <div className="mx-auto max-w-7xl mt-4">
            <div className="grid grid-cols-1 gap-4 mb-5">
            <PageHeading colorText={'text-white'} colorButton={'bg-admin-green'} border={'border-admin-green my-0'} title='Módulo - Escuelas' button='Descargar'/>
              <TabsCustomAnimation data={data}/>
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
  })(SchoolList);
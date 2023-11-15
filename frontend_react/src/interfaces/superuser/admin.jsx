import { useState, useEffect } from "react";
import React from "react";
import { connect } from "react-redux";
//Components
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import CreateAdmin from "../../components/forms/createAdmin";
// Helpers
import {  superuser_maps } from "../../helpers/users_helpers";
import { listAdmin } from "../../api/axiosAdmin";
import { TableAdmin } from "../../components/admin/tables/tableAdmin";
  import { TabsCustomAnimation } from "../../components/tabs";
  import PageHeading from "../../components/heros/pageHeading";
  import { TableAdminDeactivate } from "../../components/admin/tables/tableAdminDeactivate";




const ListAdmin = () => {
    const [users, setUsers] = useState([]);


  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await listAdmin();
        setUsers(res.data)
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
      }
    }
    loadUsers();
  }, []);

  const HEAD = ["ID", "Nombre","Correo Electrónico", "Colegio", "Funciones"];
  const ROW = users

    const data = [
        {
          label: "Activados",
          value: "Activated",
          desc:
          <>
             <TableAdmin head={HEAD} row={ROW}/>
          </>


        },
        {
            label: "Desactivados",
            value: "Deactivated",
            desc:
            <>
               <TableAdminDeactivate head={HEAD} row={ROW}/>
            </>
  
  
          },
        {
          label: "Crear Administrador",
          value: "Create",
          desc: <>
          <CreateAdmin/>
          </>,
        },
      ];

    return(
        <PageUser color={'bg-admin-black text-white'} colorInput={'bg-admin-input text-white placeholder-white'}>
          <SideBar  color={'bg-admin-black'} colorSecond={'admin-green'} useRol={'Super User'} mapeo={superuser_maps}>
            {/* Parte Central */}
            <div className="w-full md:w-4/5 bg-admin-background p-4 h-full overflow-y-auto">    
            <div className="mx-auto max-w-7xl mt-4">
            <div className="grid grid-cols-1 gap-4 mb-5">
            <PageHeading colorText={'text-white'} colorButton={'bg-admin-green'} border={'border-admin-green my-0'} title='Módulo - Administrador' button='Descargar'/>
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
  })(ListAdmin);
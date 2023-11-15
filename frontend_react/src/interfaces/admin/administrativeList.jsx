import { useState, useEffect } from "react";
import React from "react";
import { connect } from "react-redux";
//Components
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
// Helpers
import { index_admin } from "../../helpers/users_helpers";
import { listSecretary, downloadSecretary, uploadSecretary} from "../../api/axiosAdministrative";
import { TabsCustomAnimation } from "../../components/tabs";
import PageHeading from "../../components/heros/pageHeading";
import { TableAdministrative } from "../../components/admin/tables/tableAdministrative";
import { TableAdministrativeDeactivate } from "../../components/admin/tables/tableAdministrativeDeactivate";
import CreateAdministrative from "../../components/forms/createAdministrative";
import Portal from "../../components/core/Portal";
import { Card } from "@material-tailwind/react";
import {saveAs} from 'file-saver';

const handleDownload = async () =>{
    try{
      const res = await downloadSecretary();
      return saveAs(res.data, 'ReporteSecretarios.xls')
      
    }catch(e){console.log(e)}
  }
  

const AdministrativeList = () => {
    const [users, setUsers] = useState([]);
    const [update, setUpdate] = useState(0);
    const [file, setFile] = useState();
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
      setIsOpen(true)
    };
  
    const closeModal = () => {
      setIsOpen(false)
    };

    const fileSelectedHandler = (e) =>{
      e.preventDefault();
      const file = e.target.files[0];
      setFile(file);
  }

  const postFile = (e) =>{
    e.preventDefault();
    uploadSecretary(file);
    return ()=>setUpdate(update+1)
}


  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await listSecretary();
        if (res && res.data) {
          setUsers(res.data); 

        }
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
      }
    }
    loadUsers();
    return () => setUpdate(0)
  }, [update]);

  const HEAD = ["ID", "Nombre", "Colegio"," Correo Electrónico", "Funciones"];
  const ROW = users

    const data = [
        {
          label: "Activados",
          value: "Activated",
          desc:
          <>
             <TableAdministrative head={HEAD} row={ROW} update={()=>setUpdate(update+1)} />
          </>


        },
        {
          label: "Desactivados",
          value: "Deactivated",
          desc:
          <>
             <TableAdministrativeDeactivate head={HEAD} row={ROW} update={()=>setUpdate(update+1)} />
          </>


        },
        
      ];

    return(
        <PageUser color={'bg-admin-black text-white'} colorInput={'bg-admin-input text-white placeholder-white'}>
          <SideBar  color={'bg-admin-black'} colorSecond={'admin-green'} useRol={'Administrador'} mapeo={index_admin}>
            {/* Parte Central */}
            <div className="w-full md:w-4/5 bg-admin-background p-4 h-full overflow-y-auto hover:overflow-scroll">    
            <div className="mx-auto max-w-7xl mt-4">
            <div className="grid grid-cols-1 gap-4 mb-5">
            

            <div className=''>
    <div className='flex content-center items-center justify-between mx-2 my-6 border-b-4 pb-4 border-admin-green'>
      <div className="min-w-0 flex-1">
        <h2 className='text-xl2 sm:text-xl3 text-left font-bold leading-7 text-white '>
          Módulo - Secretarios
        </h2>
      </div>
      <div className="flex lg:ml-4 lg:mt-0">
        <span className="space-x-2">
          <button type="button"  className='bg-admin-green button_tech_colorless hover:bg-new-dark-green'
          onClick={()=>{openModal()}}>
            Crear Secretario
          </button>
          <button type="button"  className='bg-admin-green button_tech_colorless hover:bg-new-dark-green'
           onClick={()=>handleDownload( )} >
            Descargar
          </button>
        </span>
      </div>
    </div>
    </div>

    <Card className="bg-admin-black p-5 space-y-2">
      <div className="border-b border-admin-green">
        <p className="font-bold text-white text-xl text-center">Carga Masiva</p>
      </div>
      <div className="flex justify-center items-center">
  <input
    type="file"
    onChange={e => fileSelectedHandler(e)}
    className="text-sm text-white font-bold file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-admin-green file:text-white hover:file:bg-new-dark-green"
  />
</div>

      <div className="flex justify-center items-center">
      <button onClick={(e)=>postFile(e)}
       className='w-full font-bold md:flex-1 md:w-40 mb-2 md:mb-0 sm:mr-2 bg-admin-green hover:bg-new-dark-green text-white rounded-lg py-2 px-4'>
                                        Cargar Datos
                                    </button>
      </div>
    </Card>

              <TabsCustomAnimation data={data}/>
               
            </div>
            </div>
            </div>


          </SideBar>

          <Portal open={isOpen} onClose={() => closeModal()}>
            <CreateAdministrative update={()=>setUpdate(update+1)} onClose={() => closeModal()}/>
          </Portal>


   </PageUser>
    )
}


const mapStateToProps = state => ({
  });
  export default connect(mapStateToProps,{
  })(AdministrativeList);
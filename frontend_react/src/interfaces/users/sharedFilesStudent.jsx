// React Functions
import React, { useEffect, useState} from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
//Functions
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
//Components
import { Button, Card, Typography } from "@material-tailwind/react";
import { Disclosure } from '@headlessui/react'
import { ArrowLeftIcon, DocumentArrowDownIcon} from '@heroicons/react/20/solid'
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
//Others
import { index_maps } from "../../helpers/users_helpers";
import { StudentRoutes } from "../../helpers/users_routes";
import { getFolders, downloadFile} from "../../api/axiosSharedFiles";
import {saveAs} from 'file-saver';

const SharedFilesStudent = ({  user }) => {
  const [userData, setUserData] = useState('');
  const [folder_, setFolder_] = useState([]);
  const [update, setUpdate] = useState(0);
  const [color, setColor] = useState(
    window.localStorage.getItem("color"));
  const params = useParams()

  async function loadFolders() {
    try {
      const res = await getFolders(params.uid);
      if (res && res.data) {
        console.log(res.data)
        setFolder_(res.data);
      }
    } catch (error) {
      console.error('Error al cargar las carpetas:', error);
    }
  }
  
  


  useEffect(() => {
    if (user) {
      setUserData(user);
    }
    loadFolders();
    return () => { setUpdate(0); setFolder_([])} 
  }, [update, user]);




  const handleDownload = async (id,name) =>{
    try{
      const res = await downloadFile(id);
      toast.success('Descargando...')
      return saveAs(res.data, name)
      
    }catch(e){console.log(e)}
  }

  const Style = {
    colorSchool :  `bg-new-${color}`,
  }

  

  

    return(
        <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'} >

          <SideBar  color={Style.colorSchool} userData={userData} useRol="Estudiante" mapeo={index_maps}>
            {/* Parte Central */}
           
            <div className="w-full md:w-4/5 bg-fondo p-4 h-full shadow-md overflow-y-auto"> 
            <div className=''>
    <div className='flex content-center items-center justify-between mx-2 my-6 border-b-4 pb-4 border-blue'>
    <div className="flex items-center">
            <Link to={StudentRoutes.Subject}><ArrowLeftIcon className="h-6 w-6 text-blue hover:text-white hover:rounded-full hover:bg-blue"/></Link>

        </div>
      <div className="min-w-0 flex-1">
        <h2 className='text-xl2 sm:text-xl3 text-center font-bold leading-7 text-blue '>
          Archivos Compartidos
        </h2>
      </div>
    </div>
    </div>

    {folder_.map((item, index)=>(<>
      <Disclosure >
          {({ open }) => (
            <>
            <div  className="flex w-full justify-between rounded-lg bg-blue px-4 py-2 my-2 text-left text-sm font-medium text-white hover:bg-light-blue focus:outline-none focus-visible:ring focus-visible:ring-light-blue focus-visible:ring-opacity-75">
            <Disclosure.Button className="text-left grow">
                <span>{item.Folder.name}</span>
            </Disclosure.Button>
            </div>
              <Disclosure.Panel className="px-2 pt-2 pb-4 text-sm text-gray-500">
                <Card className="w-full p-3"> 
                {item.Files.length > 0 ? <></>:<><p className="text-blue p-2 font-bold">No Hay Archivos Añadidos.</p></>}
                {item.Files.map((item_, index_)=>(<>
                  <div className="inline-flex m-1 justify-between items-center ">
                    <div className="inline-flex">
              
                    <Button
                    onClick={()=>handleDownload(item_.file.id, item_.file.name )} className="inline-flex shadow-none m-0 p-0"
                    ><DocumentArrowDownIcon className="text-new-blue  hover:text-new-dark-blue w-5 h-5"/> <span className="text-new-blue  hover:text-new-dark-blue font-bold ">{item_.file.name}</span></Button>
                    </div>

                    
                </div>

                </>))}
               
                </Card>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>


          



    </>))}

    
            </div>
          </SideBar>



   </PageUser>
  );
}




const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
  });
  export default connect(mapStateToProps,{
  })(React.memo(SharedFilesStudent));
// React Functions
import React, { useEffect, useState} from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
//Functions
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
//Components
import { Button, Card } from "@material-tailwind/react";
import { Disclosure } from '@headlessui/react'
import {  ArrowLeftIcon, DocumentPlusIcon, PencilSquareIcon, EyeSlashIcon, EyeIcon, TrashIcon, DocumentArrowDownIcon} from '@heroicons/react/20/solid'
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import Portal from "../../components/core/Portal";
import CreateFolder from "../../components/forms/create/createFolder";
//Others
import { guardian_maps } from "../../helpers/users_helpers";
import { GuardianRoutes } from "../../helpers/users_routes";
import { getFolders, downloadFile} from "../../api/axiosSharedFiles";
import DeleteFolder from "../../components/forms/delete/deleteFolder";
import { postMedicalCertificate, downloadMedicalCertificate} from "../../api/axiosMedicalCertificate";
import { studentCertificate } from "../../api/axiosGuardian";
import {saveAs} from 'file-saver';
import { PaginationWhite } from "../../components/users/pagination";

const SharedFilesGuardian = ({  user }) => {
  const [userData, setUserData] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [folder_, setFolder_] = useState([]);
  const [myStudents, setMyStudents] = useState([]);
  const [update, setUpdate] = useState(0);
  const params = useParams()

  const [page, setPage] = useState(1);
  const [forPage, setForPage] = useState(4);
  const max = myStudents.length / forPage

  async function loadFolders() {
    try {
      const res = await studentCertificate();
      if (res && res.data) {
        setMyStudents(res.data);
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


  const openModal = () => {
    setIsOpen(true)
  };

  const closeModal = () => {
    setIsOpen(false)
  };

  const [isOpenArray_edit, setIsOpenArray_edit] = useState(Array(myStudents.length).fill(false));

  const openModal_edit = (index) => {
    const updatedIsOpenArray = [...isOpenArray_edit];
    updatedIsOpenArray[index] = true;
    setIsOpenArray_edit(updatedIsOpenArray);
  };

  const closeModal_edit = (index) => {
    const updatedIsOpenArray = [...isOpenArray_edit];
    updatedIsOpenArray[index] = false;
    setIsOpenArray_edit(updatedIsOpenArray);
  };

  const [isOpenArray_deactivate, setIsOpenArray_deactivate] = useState(Array(myStudents.length).fill(false));

  const openModal_deactivate = (index) => {
    const updatedIsOpenArray = [...isOpenArray_deactivate];
    updatedIsOpenArray[index] = true;
    setIsOpenArray_deactivate(updatedIsOpenArray);
  };

  const closeModal_deactivate = (index) => {
    const updatedIsOpenArray = [...isOpenArray_deactivate];
    updatedIsOpenArray[index] = false;
    setIsOpenArray_deactivate(updatedIsOpenArray);
  };

  const [isOpenArray_delete, setIsOpenArray_delete] = useState(Array(myStudents.length).fill(false));


  const openModal_delete= (index) => {
    const updatedIsOpenArray = [...isOpenArray_delete];
    updatedIsOpenArray[index] = true;
    setIsOpenArray_delete(updatedIsOpenArray);
  };

  const closeModal_delete = (index) => {
    const updatedIsOpenArray = [...isOpenArray_delete];
    updatedIsOpenArray[index] = false;
    setIsOpenArray_delete(updatedIsOpenArray);
  };


  const handleDownload = async (id,name) =>{
    try{
      const res = await downloadMedicalCertificate(id);
      return saveAs(res.data,name)
      
    }catch(e){console.log(e)}
  }

  

    return(
        <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'} >

          <SideBar  color={'bg-blue'} userData={userData} useRol="Apoderado" mapeo={guardian_maps}>
            {/* Parte Central */}
           
            <div className="w-full md:w-4/5 bg-fondo p-4 h-full shadow-md overflow-y-auto"> 
            <div className=''>
    <div className='flex content-center items-center justify-between mx-2 my-6 border-b-4 pb-4 border-blue'>
    <div className="flex items-center">

        </div>
      <div className="min-w-0 flex-1">
        <h2 className='text-xl2 sm:text-xl3 text-center font-bold leading-7 text-blue '>
          Certificados Médicos
        </h2>
      </div>
      <div className="flex lg:ml-4 lg:mt-0">
        <span className="">

        </span>
      </div>
    </div>
    </div>

    {myStudents.slice((page-1)*forPage, (page-1)*forPage+forPage).map((item, index)=>(<>
      <Disclosure >
          {({ open }) => (
            <>
            <div  className="flex w-full justify-between rounded-lg bg-blue px-4 py-2 my-2 text-left text-sm font-medium text-white hover:bg-light-blue focus:outline-none focus-visible:ring focus-visible:ring-light-blue focus-visible:ring-opacity-75">
            <Disclosure.Button className="text-left grow">
                Estudiante: <span>{item.name}</span>
            </Disclosure.Button>
            <div className="inline-flex space-x-3">
            <Link to={GuardianRoutes.AddFiles.replace(':uid', item.rut)}><DocumentPlusIcon className="text-white w-5 h-5"/></Link>
            </div>
            </div>
              <Disclosure.Panel className="px-2 pt-2 pb-4 text-sm text-gray-500">
                <Card className="w-full p-3"> 
                {item.certificates.length > 0 ? <></>:<><p className="text-blue p-2 font-bold">No Hay Archivos Añadidos.</p></>}
                {item.certificates.map((item_, index_)=>(<>
                  <div className="inline-flex m-1 justify-between items-center ">
                    <div className="inline-flex">
              
                    <Button
                    onClick={()=>handleDownload(item_.id, item_.name )} className="inline-flex shadow-none m-0 p-0"
                    ><DocumentArrowDownIcon className="text-new-blue  hover:text-new-dark-blue w-5 h-5"/> <span className="text-new-blue  hover:text-new-dark-blue font-bold ">{item_.name}</span></Button>
                             </div>
                             <div className="inline-flex space-x-2">
                    <Link to={GuardianRoutes.EditFiles.replace(':file', item_.id)} className='bg-blue button_tech_colorless hover:bg-light-blue !px-2 !text-xs'>
            Configurar
          </Link>
                    </div>
       
                    
                </div>

                <Portal open={isOpenArray_delete[index]} onClose={() => closeModal_delete(index)}>
            <DeleteFolder onClose={() => closeModal_delete(index)} update={()=>setUpdate(update+1)} index={index} id={item_.id} name={item_.name}/>
          </Portal>

                </>))}
               
                </Card>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>


   
          

          



    </>))}

    <PaginationWhite page={page} setPage={(n)=>setPage(n)} max={max} />

    
            </div>
          </SideBar>

          <Portal open={isOpen} onClose={() => closeModal()}>
            <CreateFolder update={()=>setUpdate(update+1)} onClose={() => closeModal()}/>
          </Portal>


   </PageUser>
  );
}




const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
  });
  export default connect(mapStateToProps,{
  })(React.memo(SharedFilesGuardian));
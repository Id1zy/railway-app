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
import { ChevronUpIcon, ArrowLeftIcon, DocumentPlusIcon, PencilSquareIcon, EyeSlashIcon, EyeIcon, TrashIcon, DocumentArrowDownIcon} from '@heroicons/react/20/solid'
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import Portal from "../../components/core/Portal";
import CreateFolder from "../../components/forms/create/createFolder";
//Others
import { profesor_maps } from "../../helpers/users_helpers";
import { ProfessorRoutes } from "../../helpers/users_routes";
import { getFolders, downloadFile} from "../../api/axiosSharedFiles";
import DeleteFolder from "../../components/forms/delete/deleteFolder";
import DeactivateFolder from "../../components/forms/deactivate/deactivateFolder";
import {saveAs} from 'file-saver';

const SharedFilesProfessor = ({  user }) => {
  const [userData, setUserData] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [folder_, setFolder_] = useState([]);
  const [update, setUpdate] = useState(0);
  const params = useParams()
  const [color, setColor] = useState(
    window.localStorage.getItem("color"));

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


  const openModal = () => {
    setIsOpen(true)
  };

  const closeModal = () => {
    setIsOpen(false)
  };

  const [isOpenArray_edit, setIsOpenArray_edit] = useState(Array(folder_.length).fill(false));

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

  const [isOpenArray_deactivate, setIsOpenArray_deactivate] = useState(Array(folder_.length).fill(false));

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

  const [isOpenArray_delete, setIsOpenArray_delete] = useState(Array(folder_.length).fill(false));


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
      const res = await downloadFile(id);
      return saveAs(res.data,name)
      
    }catch(e){console.log(e)}
  }

  const Style = {
    colorSchool :  `bg-new-`+color,
    textSchool: `text-new-`+color,
    hoverSchool: `bg-new-h`+color,
    borderSchool: `border-new-`+color,
    buttonSchool: `bg-new-`+color+' hover:bg-new-h'+color,
  }
  

    return(
<PageUser color={`bg-white ${Style.textSchool}`} colorInput={`bg-white ${Style.textSchool}`} user={user}>
      <SideBar color={`${Style.colorSchool}`} userData={userData} useRol="Profesor" mapeo={profesor_maps}>
  {/* Parte Central */}
  <div className={`w-full md:w-4/5 bg-fondo p-4 h-full shadow-md overflow-y-auto`}>
    <div className={`w-full`}>
      <div className={`flex content-center items-center justify-between mx-2 my-6 border-b-4 pb-4 ${Style.borderSchool}`}>
        <div className={`flex items-center`}>
          <Link to={ProfessorRoutes.Subject}><ArrowLeftIcon className={`h-6 w-6 ${Style.textSchool} hover:text-white hover:rounded-full hover:${Style.colorSchool}`} /></Link>
        </div>
        <div className={`min-w-0 flex-1`}>
          <h2 className={`text-xl2 sm:text-xl3 text-center font-bold leading-7 ${Style.textSchool}`}>
            Archivos Compartidos
          </h2>
        </div>
        <div className={`flex lg:ml-4 lg:mt-0`}>
          <span className="">
            <Button type="button" onClick={() => { openModal() }} className={`${Style.colorSchool} button_tech_colorless hover:${Style.hoverSchool}`}>
              Crear Carpeta
            </Button>
          </span>
        </div>
      </div>
    </div>
    {folder_.length > 0 ? <></> : <>No Has Creado Carpetas aún.</>}
    {folder_.map((item, index) => (
      <>
        <Disclosure>
          {({ open }) => (
            <>
              <div className={`flex w-full justify-between rounded-lg ${Style.colorSchool} px-4 py-2 my-2 text-left text-sm font-medium text-white hover:${Style.hoverSchool} focus:outline-none focus-visible:ring focus-visible:ring-light-blue focus-visible:ring-opacity-75`}>
                <Disclosure.Button className={`text-left grow`}>
                  <span>{item.Folder.name}</span>
                </Disclosure.Button>
                <div className={`inline-flex space-x-3`}>
                  <Link to={ProfessorRoutes.AddFiles.replace(':uid', params.uid).replace(':folder', item.Folder.id)}><DocumentPlusIcon className={`text-white w-5 h-5`} /></Link>
                  <button onClick={() => openModal_edit(index)}> <PencilSquareIcon className={`text-white w-5 h-5`} /></button>
                  <button onClick={() => openModal_deactivate(index)}>
                    {item.Folder.status === 'Publicado' ? <>  <EyeIcon className={`text-white w-5 h-5`} /></> : <> <EyeSlashIcon className={`text-white w-5 h-5`} /></>}
                  </button>
                  <button onClick={() => openModal_delete(index)}><TrashIcon className={`text-white w-5 h-5`} /></button>
                </div>
              </div>
              <Disclosure.Panel className={`px-2 pt-2 pb-4 text-sm text-gray-500`}>
                <Card className={`w-full p-3`}>
                  {item.Files.length > 0 ? <></> : <><p className={`${Style.textSchool} p-2 font-bold`}>No Hay Archivos Añadidos.</p></>}
                  {item.Files.map((item_, index_) => (
                    <>
                      <div className={`inline-flex m-1 justify-between items-center`}>
                        <div className={`inline-flex`}>
                          <Button
                            onClick={() => handleDownload(item_.file.id, item_.file.name)} className={`inline-flex shadow-none m-0 p-0`}>
                            <DocumentArrowDownIcon className={`text-new-blue  hover:text-new-dark-blue w-5 h-5`} /> <span className={`text-new-blue  hover:text-new-dark-blue font-bold`}>{item_.file.name}</span>
                          </Button>
                        </div>
                        <div className={`inline-flex space-x-2`}>
                          <Link to={ProfessorRoutes.EditFiles.replace(':uid', params.uid).replace(':file', item_.file.id)} className={`${Style.colorSchool} button_tech_colorless hover:${Style.hoverSchool} !px-2 !text-xs`}>
                            Configurar
                          </Link>
                        </div>
                      </div>
                    </>))
                  }
                </Card>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Portal open={isOpenArray_deactivate[index]} onClose={() => closeModal_deactivate(index)}>
          <DeactivateFolder onClose={() => closeModal_deactivate(index)} update={() => setUpdate(update + 1)} index={index} id={item.Folder.id} name={item.Folder.name} status={item.Folder.status} />
        </Portal>

        <Portal open={isOpenArray_delete[index]} onClose={() => closeModal_delete(index)}>
          <DeleteFolder onClose={() => closeModal_delete(index)} update={() => setUpdate(update + 1)} index={index} id={item.Folder.id} name={item.Folder.name} />
        </Portal>
      </>))
    }

  </div>
</SideBar>

<Portal open={isOpen} onClose={() => closeModal()}>
  <CreateFolder update={() => setUpdate(update + 1)} onClose={() => closeModal()} />
</Portal>

</PageUser>

  );
}




const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
  });
  export default connect(mapStateToProps,{
  })(React.memo(SharedFilesProfessor));
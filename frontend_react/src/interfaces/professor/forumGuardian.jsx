// React Functions
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
//Functions
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
//Components
import { Card, } from "@material-tailwind/react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import Portal from "../../components/core/Portal";
import { profesor_maps } from "../../helpers/users_helpers";
import { ProfessorRoutes } from "../../helpers/users_routes";
import { getForum, deactivateForum } from "../../api/axiosForum";
import Dotloader from "react-spinners/DotLoader";
import { PaginationWhite } from "../../components/users/pagination";


const ForumGuardianProfessor = ({  user }) => {
  const [userData, setUserData] = useState('');
  const [forums, setForums] = useState([]);
  const params = useParams()
  const [color, setColor] = useState(
    window.localStorage.getItem("color"));

  const [update, setUpdate] = useState(0);
  const [loading, setLoading] = useState(0);

  const [page, setPage] = useState(1);
  const [forPage, setForPage] = useState(4);
  const max = forums.filter((item) => item.category === 'apoderado').length / forPage

  async function loadForum() {
    try {
      const res = await getForum(params.uid);
      if (res && res.data) {
        setForums(res.data)
      }
    } catch (error) {
      console.error('Error al cargar los Foros:', error);
    }
  }


  useEffect(() => {
    loadForum();
    if (user) {
      setUserData(user);
    }
    return setUpdate(0);
    
  }, [update, user]);

  const HandleDeactivateForum = (id, index) =>{
    try{
      setLoading(true);
      deactivateForum(id);
      toast.success('Hecho');
      setLoading(false);
      closeModal_2(index);
      return setUpdate(update+1);
    }catch(e){
      console.log(e);
    }
  }


  const [isOpenArray, setIsOpenArray] = useState(Array(forums.length).fill(false));

  const openModal_2 = (index) => {
    const updatedIsOpenArray = [...isOpenArray];
    updatedIsOpenArray[index] = true;
    setIsOpenArray(updatedIsOpenArray);
  };

  const closeModal_2 = (index) => {
    const updatedIsOpenArray = [...isOpenArray];
    updatedIsOpenArray[index] = false;
    setIsOpenArray(updatedIsOpenArray);
  };

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
    <Card className={`w-full p-5 mb-2`}>
      <div className={`flex justify-between overflow-hidden`}>
        <div className={`flex items-center mr-5`}>
          <Link to={ProfessorRoutes.Subject}><ArrowLeftIcon className={`h-6 w-6 ${Style.textSchool} hover:text-white hover:rounded-full hover:${Style.colorSchool}`} /></Link>
        </div>
        <div className={`flex-grow p-2 text-center ${Style.colorSchool} rounded`}>
          <p className={`${Style.textSchool} font-bold text-white`}>Listado de tus Foros</p>
        </div>
        <div className={`flex items-center ml-5`}>
          <Link to={ProfessorRoutes.ForumCreateGuardian.replace(':uid', params.uid)} className={`inline-block bg-new-green hover:bg-new-hgreen button_tech_colorless`}>Crear Foro</Link>
        </div>
      </div>
    </Card>

    {forums.length > 0 ? <></> : <>No Has Creado Foros aún.</>}
    {forums.filter((item) => item.category === 'apoderado').slice((page-1)*forPage, (page-1)*forPage+forPage).map((item, index) => (
      <>
        <Card className={`mb-2`} key={item.id}>
          <div className={`relative flex flex-col md:flex-row md:space-x-5 space-y-5 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white`}>
            <div className={`w-full md:w-1/3 bg-white grid place-items-center`}>
              {item.thumbnail ? <>
                <img src={`http://localhost:8000${item.thumbnail}`} alt="tailwind logo" className="rounded-xl w-[400px] h-[180px]" /></> :
              <>
                <img src={"https://media-front.elmostrador.cl/2020/07/IMG_0689.jpg"} alt="tailwind logo" className="rounded-xl" /></>}
            </div>
            <div className={`w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3`}>
              <div className={`flex justify-between item-center`}>
                <div className={`flex items-center`}>
                </div>
                <div className={`inline-flex gap-2`}>
                  <div className={`bg-orange px-3 py-1 rounded-full text-xs font-medium  hidden md:block`}>
                    <p className={`text-white`}>{item.category}</p>
                  </div>
                  { item.status === 'publicado' ? <> 
                    <div className={`bg-new-green px-3 py-1 rounded-full text-xs font-medium  hidden md:block`}>
                      <p className={`text-white`}>{item.status}</p>
                    </div>
                  </>
                  : 
                  <> 
                    <div className={`bg-admin-red px-3 py-1 rounded-full text-xs font-medium  hidden md:block`}>
                      <p className={`text-white`}>{item.status}</p>
                    </div>
                  </>
                  }
                </div>
              </div>
              <div>
                <h3 className={`font-black ${Style.textSchool} md-text-3xl text-xl`}>{item.title}</h3>
                <p className={`md-text-lg ${Style.textSchool} text-base`}>Descripción: {item.description}</p>
              </div>
              <div className={`flex justify-end mt-4 gap-2 `}>
                <Link to={ProfessorRoutes.ForumViewGuardian.replace(':uid', params.uid).replace(':forum', item.id)} className={`${Style.colorSchool} button_tech_colorless`}>Ingresar</Link>
                <Link to={ProfessorRoutes.ForumEdit.replace(':uid', params.uid).replace(':forum', item.id)} className={`${Style.colorSchool} button_tech_colorless`}>Editar</Link>
                { item.status === 'publicado' ? <> 
                  <button className={`bg-admin-red button_tech_colorless`} onClick={() => openModal_2(index)}>Desactivar</button> 
                </>
                : 
                <> 
                  <button className={`bg-new-green hover:bg-new-hgreen button_tech_colorless`} onClick={() => openModal_2(index)}>Activar</button>
                </>
                }
              </div>
            </div>
          </div>
        </Card>
        <Portal open={isOpenArray[index]} onClose={() => closeModal_2(index)}> 
          <div className={`w-full max-w-md transform overflow-hidden rounded-2xl bg-white ${Style.textSchool} p-6 text-left align-middle shadow-xl transition-all`}>
            <div className={`w-full mb-3`}>
              {item.status === 'publicado' ? <> 
                <p className={`${Style.textSchool} text-xl font-bold text-center`}>¿Estas Seguro de Desactivar el foro "{item.title}"? </p>
              </>
              : 
              <> 
                <p className={`${Style.textSchool} text-xl font-bold text-center`}>¿Estas Seguro de Activar el foro "{item.title}"? </p>
              </>
              }
            </div>
            <div className={`flex justify-center`}>
              <div className={`inline-flex  items-center`}>
                <button onClick={()=>closeModal_2(index)} className={`border-2 ${Style.borderSchool} !${Style.textSchool} hover:${Style.colorSchool} hover:!text-white button_tech_colorless mr-2`}>Cancelar</button>
                {item.status === 'publicado' ? <>
                  { loading ?
                    <button onClick={() => HandleDeactivateForum(item.id, index)} className={`border-2 border-admin-red !text-admin-red hover:!text-white hover:bg-admin-red button_tech_colorless`}><Dotloader color="white" size="20" /></button>
                    : 
                    <button onClick={() => HandleDeactivateForum(item.id, index)} className={`border-2 border-admin-red !text-admin-red hover:!text-white hover:bg-admin-red button_tech_colorless`}>Desactivar</button>}
                </>
                :
                <>
                  { loading ? 
                    <button onClick={() => HandleDeactivateForum(item.id, index)} className={`border-2 border-new-green !text-new-green hover-!text-white hover:bg-new-green button_tech_colorless`}><Dotloader color="white" size="20" /></button>
                    : 
                    <button onClick={() => HandleDeactivateForum(item.id, index)} className={`border-2 border-new-green !text-new-green hover-!text-white hover:bg-new-green button_tech_colorless`}>Activar</button>
                  }
                </>}
              </div>
            </div>
          </div>
        </Portal>
      </>
    ))}
    <PaginationWhite page={page} setPage={(n)=>setPage(n)} max={max}/>
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
  }) (React.memo(ForumGuardianProfessor));

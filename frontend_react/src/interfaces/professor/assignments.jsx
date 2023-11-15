// React Functions
import { useEffect, useState, useRef} from "react";
import { connect } from "react-redux";
//Components
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import { ProfessorRoutes } from "../../helpers/users_routes";
// Images
import { profesor_maps } from "../../helpers/users_helpers";
import { CheckIcon, ArrowLeftIcon, NoSymbolIcon } from '@heroicons/react/20/solid'
import { Card } from "@material-tailwind/react";
import Portal from "../../components/core/Portal";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { listAssignment, statusAssignment } from "../../api/axiosAssignment";
import { formatTime } from "../../helpers/users_def";
import toast from "react-hot-toast";



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const AssignmentsProfessor = ({  user }) => {
  const [userData, setUserData] = useState('');
  const [update, setUpdate] = useState(0);
  const params = useParams();
  const [assList, setAss] = useState([]);
  const [color, setColor] = useState(
    window.localStorage.getItem("color"));

  const [isOpenArray, setIsOpenArray] = useState(Array(assList.length).fill(false));

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


  useEffect(() => {
    const listAssignment_= async () =>{
      try{
        const res = await listAssignment(params.uid)
        setAss(res.data)
        

      }catch(e){}
    }

    listAssignment_()
    if (user) {
      setUserData(user);
    }

    return setUpdate(0);

  }, [update, user]);

  const HandleDeactivateForum = (id, index, status) =>{
    try{
      statusAssignment(id, status);
      toast.success('Hecho');
      closeModal_2(index);
      return setUpdate(update+1)
    }catch(e){
      console.log(e);
    }
  }

  const Style = {
    colorSchool :  `bg-new-`+color,
    textSchool: `text-new-`+color,
    hoverSchool: `bg-new-h`+color,
    borderSchool: `border-new-`+color,
    buttonSchool: `bg-new-`+color+' hover:bg-new-h'+color,
  }

    return(
<PageUser color={`bg-white text-new-${color}`} colorInput={`bg-white text-new-${color}`}>

<SideBar color={`${Style.colorSchool}`} userData={userData} useRol="Profesor" mapeo={profesor_maps}>
  {/* Parte Central */}
 
  <div className={`w-full md:w-4/5 bg-fondo p-4 h-full shadow-md overflow-y-auto`}> 
    <div className={`flex content-center items-center justify-between mx-2 my-6 border-b-4 pb-4 ${Style.borderSchool}`}>
      <div className={`flex items-center`}>
        <Link to={ProfessorRoutes.Subject}><ArrowLeftIcon className={`h-6 w-6 ${Style.textSchool} hover:text-white hover:rounded-full hover:${Style.colorSchool}`}/></Link>
      </div>
      <div className={`min-w-0 flex-1`}>
        <h2 className={`text-xl2 sm:text-xl3 text-center font-bold leading-7 ${Style.textSchool}`}>
          Trabajos Asignados
        </h2>
      </div>
      <div className={`flex lg:ml-4 lg:mt-0`}>
        <span className="">
          <Link type="button" to={ProfessorRoutes.CreateAssignments.replace(':uid', params.uid )} className={`${Style.colorSchool} button_tech_colorless hover:bg-light-blue`}>
            Crear Trabajo
          </Link>
        </span>
      </div>
    </div>
    <Card className={`bg-white p-5`}>
      <div className={`flow-root`}>
        <ul role="list" className={`-mb-8`}>
        {assList.length > 0 ? <></> : 
          <div className="flex w-full justify-center">
            <p className="px-3 rounded-lg bg-new-blue text-normal text-white">No Has Creado Tareas aún.</p>
          </div>
          }
          {assList.map((event, eventIdx) => (
            <li key={event.id}>
              <div className={`relative pb-8`}>
                {eventIdx !== assList.length - 1 ? (
                  <span className={`absolute left-4 top-4 -ml-px h-full w-0.5 ${Style.colorSchool}`} aria-hidden={`true`} />
                ) : null}
                <div className={`relative flex space-x-3`}>
                  <div>
                    <span
                      className={classNames(
                        `bg-green-500`,
                        `h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white`
                      )}
                    >
                      <CheckIcon className={`h-5 w-5 text-white`} aria-hidden={`true`} />
                    </span>
                  </div>
                  <div className={`flex min-w-0 flex-1 justify-between space-x-4 pt-1.5`}>
                    <div>
                      <Link to={ProfessorRoutes.ViewAssignments.replace(':uid', params.uid).replace(':suid', event.id)} className={`font-medium text-new-blue hover:${Style.textSchool}`}>
                        {event.title}{' '}
                      </Link>
                    </div>
                    <div className={`inline-flex`}>
                      <div className={`mr-2`}>
                        {event.status === 1 ? (
                          <>
                            <Link type={`button`} onClick={() => openModal_2(eventIdx)} className={`bg-admin-red button_tech_colorless hover:bg-deep-red`}>
                              Desactivar
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link type={`button`} onClick={() => openModal_2(eventIdx)} className={`bg-new-green button_tech_colorless hover:bg-admin-green`}>
                              Activar
                            </Link>
                          </>
                        )}
                      </div>
                      <div className={`mr-2`}>
                        <Link type={`button`} to={ProfessorRoutes.EditAssignments.replace(':uid', params.uid).replace(':suid', event.id)} className={`${Style.colorSchool} button_tech_colorless hover:bg-light-blue`}>
                          Editar Trabajo
                        </Link>
                      </div>
                      <div className={`whitespace-nowrap inline-flex text-right text-sm text-gray-500`}>
                        <p className={`flex font-bold text-new-green mr-2 items-center`}>Fecha Límite</p>
                        <div className={`flex bg-new-green rounded-md px-2 items-center`}>
                          <time className={`font-bold text-white`} dateTime={event.deadline}>
                            {formatTime(event.deadline)}
                          </time>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Portal open={isOpenArray[eventIdx]} onClose={() => closeModal_2(eventIdx)}> 
                <div className={`w-full max-w-md transform overflow-hidden rounded-2xl bg-white ${Style.textSchool} p-6 text-left align-middle shadow-xl transition-all`}>
                  <div className={`w-full mb-3`}>
                    {event.status === 1 ? (
                      <> 
                        <p className={`${Style.textSchool} text-xl font-bold text-center`}>
                          ¿Estás Seguro de Desactivar el foro "{event.title}"?
                        </p>
                      </>
                    ) : (
                      <> 
                        <p className={`${Style.textSchool} text-xl font-bold text-center`}>
                          ¿Estás Seguro de Activar el foro "{event.title}"?
                        </p>
                      </>
                    )}
                  </div>
                  <div className={`flex justify-center`}>
                    <div className={`inline-flex  items-center`}>
                      <button 
                        onClick={() => closeModal_2(eventIdx)}
                        className={`border-2 ${Style.borderSchool} !${Style.textSchool} hover:${Style.hoverSchool} hover:!text-white button_tech_colorless mr-2`}
                      >
                        Cancelar
                      </button>
                      {event.status === 1 ? (
                        <>
                          <button 
                            onClick={() => HandleDeactivateForum(event.id, eventIdx, 3 )}
                            className={`border-2 border-admin-red !text-admin-red hover:!text-white hover:bg-admin-red button_tech_colorless`}
                          >
                            Desactivar
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            onClick={() => HandleDeactivateForum(event.id, eventIdx, 1)}
                            className={`border-2 border-new-green !text-new-green hover:!text-white hover:bg-new-green button_tech_colorless`}
                          >
                            Activar
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Portal>
            </li>
          ))}
        </ul>
      </div>
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
  export default connect(mapStateToProps,{
  })(AssignmentsProfessor);
// ICO
import { Bars3Icon,XMarkIcon,ArrowLeftOnRectangleIcon,UserCircleIcon, Cog6ToothIcon, BellIcon } from '@heroicons/react/24/outline'
// React Functions
import { Fragment, useState, useEffect, useLayoutEffect} from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { get_avatar } from '../../api/axiosAvatar'
// Components
import { Disclosure, Popover, Transition } from '@headlessui/react'
import Alert from '../alert'
// REDUX Functions
import { logout } from '../../redux/actions/auth'
// helpers
import { index_admin, profesor_maps, index_maps,guardian_maps, utp_maps, director_maps, inspector_maps, secretary_maps} from '../../helpers/users_helpers'
import Slideover from '../../interfaces/users/slideover'
import {PublicRoutes, AdminRoutes, StudentRoutes, ProfessorRoutes, GuardianRoutes, UTPRoutes, DirectorRoutes, InspectorRoutes, SecretaryRoutes } from '../../helpers/users_routes'
import ProfileImg from "../../assets/imagenes/ProfileImg.svg";
import Portal from '../core/Portal'
import Notification from '../core/Notification'
import { listNotification } from '../../api/axiosNotification'
import { updateNotificationsStatus } from '../../api/axiosNotification'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

 function NavBarUser({ color, colorInput,  user, logout}) {
  const [profileImage, setProfileImage] = useState(window.localStorage.getItem("avatar"));
  const [profile, setProfile] = useState();
  const [redirect, setRedirect] = useState(false);
  const [createMaps, setCreateMaps] = useState(index_maps);
  const [profileURL, setProfileURL] = useState(null);
  const [settingURL, setSettingURL] = useState(null);
  const [notification, setNotification] = useState(false);
  const [notis, setNotis] = useState([]);
  const [unreadNotisCount, setUnreadNotisCount] = useState(0);

  const [exit, setLogout] = useState(false);
  const [color_, setColor] = useState(
    window.localStorage.getItem("color"));
  

  useLayoutEffect(() => {

    if(profileImage !== null){
      setProfile( <><img
      className="h-10 w-10 rounded-full focus:ring-4 focus:outline-none focus:ring-blue-300 "
      src={profileImage}
      alt=""
    /></>)
    }else{
       setProfile(<><img
    className="h-10 w-10 rounded-full focus:ring-4 focus:outline-none focus:ring-blue-300 "
    src={ProfileImg}
    alt=""
  /></>)
    }
    

    if(user){
      if(user.rol === 'estudiante'){
        setCreateMaps(index_maps)
        setProfileURL(StudentRoutes.Profile)
        setSettingURL(StudentRoutes.Settings)
      }else if(user.rol === 'profesor'){
        setCreateMaps(profesor_maps)
        setProfileURL(ProfessorRoutes.Profile)
        setSettingURL(ProfessorRoutes.Settings)
      }else if(user.rol === 'administrador'){
        setCreateMaps(index_admin)
        setProfileURL(AdminRoutes.Profile)
        setSettingURL(AdminRoutes.Settings)
      }else if(user.rol === 'apoderado'){
        setCreateMaps(guardian_maps)
        setProfileURL(GuardianRoutes.Profile)
        setSettingURL(GuardianRoutes.Settings)
      }else if(user.rol === 'UTP'){
        setCreateMaps(utp_maps)
        setProfileURL(UTPRoutes.Profile)
        setSettingURL(UTPRoutes.Settings)
      }else if(user.rol === 'director'){
        setCreateMaps(director_maps)
        setProfileURL(DirectorRoutes.Profile)
        setSettingURL(DirectorRoutes.Settings)
      }else if(user.rol === 'inspector'){
        setCreateMaps(inspector_maps)
        setProfileURL(InspectorRoutes.Profile)
        setSettingURL(InspectorRoutes.Settings)
      }else if(user.rol === 'secretario'){
        setCreateMaps(secretary_maps)
        setProfileURL(SecretaryRoutes.Profile)
        setSettingURL(SecretaryRoutes.Settings)
      }
      else {
        setCreateMaps(index_admin)
      }
    }



  
  }, [user]);
  useEffect(() => {
 

    async function loadNotis() {
      try {
        const res = await listNotification();
        if (res && res.data) {
          setNotis(res.data); 
          const unreadCount = res.data.filter(noti => !noti.Notis.seen).length;
          setUnreadNotisCount(unreadCount);
        }
      } catch (error) {
        console.error('Error al cargar las notificaciones', error);
      }
    }
    loadNotis();

    async function loadProfileImage() {
      try {
        const res = await get_avatar();
        if (res && res) {
          window.localStorage.setItem("avatar", res.data.avatar)
        }
      } catch (error) {
        console.error('Error al cargar el Avatar', error);
      }
    }
    loadProfileImage();
  

  
  }, [user]);



  const logoutHandler = () =>{
    try{
      logout();
      localStorage.removeItem('color')
      localStorage.removeItem('Color')
      localStorage.removeItem("avatar")
      setRedirect(true);
    }catch(e){
      console.log(e);
    }
  }

  if(redirect){
    return <Navigate to={PublicRoutes.Login} />
  }
  
  const classes = ({
    basic: 'navlink_tech',
    second:'mx-auto max-w-7xl px-2 sm:px-6 lg:px-8',
    third: 'input_tech_search_colorless',
    panel: 'z-50 absolute -right-8 top-full mt-3 w-60 max-w-xs overflow-hidden rounded-3xl shadow ring-1',
    
  })

  const markNotificationsAsRead = async () => {
    try {
      await updateNotificationsStatus();
      setNotis(notis.map(noti => ({...noti, Notis: {...noti.Notis, seen: true}})));
    } catch (error) {
      console.error('Error al marcar las notificaciones como leídas', error);
    }
  }

  const OpenNotis = () =>{
    setUnreadNotisCount(0);
    setNotification(true);
  }
  const CloseNotis = () =>{
    setNotification(false);
    markNotificationsAsRead();

  }
  const OpenLogout = () =>{
    setLogout(true)
  }
  const CloseLogout = () =>{
    setLogout(false)
  }



  return (
<>


<Disclosure as="nav" className={`${color} ${classes.basic} `}  >
      {({ open }) => (
        <>


          <div className={`${color} ${classes.second} `}>
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex items-center justify-center sm:items-stretch sm:justify-start ">
                <div className="flex flex-shrink-0 w-50 items-center hidden md:block">
                      {/* Logo */}
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=500"
                    alt="Your Company"
                  />
                </div>

                  {/* Indice */}
                <div className="hidden sm:ml-6 sm:block">

                </div>
              </div>
              <div className='flex-grow flex items-center justify-center ml-10 p-8'>

              <div className="relative w-full max-w-lg ">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 ">
        </div>

       
    </div>


            </div>

                {/* Parte Derecha NavBar*/}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
              <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
<div className='flex justify-right w-15 mt-1'>
  <div className='items-center'>
  <button type="button" onClick={() => OpenNotis()} className="relative inline-flex items-center p-3">
  <BellIcon className="h-6 w-6" />
  {unreadNotisCount > 0 && (
    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
      {unreadNotisCount}
    </span>
  )}
</button>

  </div>
  <div>
  </div>
</div>


<div className={`border-l border-new-${color_} flex items-center`}>
<p className={`mr-4 pl-4 font-bold text-new-${color_}`}>{user ? user.email : 'Cargando..'}</p>
    <Popover.Group className="hidden lg:flex lg:gap-x-12" >
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 ">
              {profile}
             
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className={`${color} !text-new-${color_} ${classes.panel} ring-${color} `} >
                <div className="p-2">
                <div className="group relative flex items-center gap-x-2 rounded-lg p-2 text-sm leading-3 hover:bg-gray-50">
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <UserCircleIcon className={`h-6 w-6  group-hover:text-new-${color_}`} aria-hidden="true" />
                      </div>
                      <div className="flex-auto">
                        <Link to={profileURL} className="block font-semibold " >
                          Perfil
                          <span className="absolute inset-0" />
                        </Link>
                      </div>
                  </div>
                  <div className="group relative flex items-center gap-x-2 rounded-lg p-2 text-sm leading-3 hover:bg-gray-50">
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <Cog6ToothIcon className={`h-6 w-6  group-hover:text-new-${color_}`} aria-hidden="true" />
                      </div>
                      <div className="flex-auto">
                        <Link to={settingURL} className="block font-semibold " >
                          Configuración
                          <span className="absolute inset-0" />
                        </Link>
                      </div>
                  </div>

<div className="group relative flex items-center gap-x-2 rounded-lg p-2 text-sm leading-3 hover:bg-gray-50">
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <ArrowLeftOnRectangleIcon className={`h-6 w-6  group-hover:text-new-${color_}`} aria-hidden="true" />
                      </div>
                      <div className="flex-auto">
                        <button onClick={()=>OpenLogout()} className="block font-semibold ">
                          Cerrar Sesión
                          <span className="absolute inset-0" />
                        </button>
                      </div>
                    </div>

                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </Popover.Group>
</div>
</div>
</div>



            </div>
          </div>

            {/* Se despliega en pantallas pequeñas*/}
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">

              {createMaps.map((item) => (
                <NavLink
                  key={item.name}
                  as="a"
                  to={item.href}
                  className={classNames(
                    item.current ? 'bg-new-green' : 'nbg-new-blue-active'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </NavLink>
              ))}
              <button onClick={()=>OpenLogout()} className='w-full text-left no-active'>Cerrar Sesión</button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
<Alert/>
<Slideover open={notification} onClose={()=>CloseNotis()} >
  {notis.filter(noti => !noti.Notis.seen).length > 0 ? 
    notis.filter(noti => !noti.Notis.seen).map((item) => (
      <div className='mb-2' key={item.Notis.id}>
        <Notification 
          type={item.Notis.type} 
          issue={item.Notis.issue} 
          message_={item.Notis.message} 
          seen={item.Notis.seen} 
          created={item.Notis.created_at}
        />
      </div>
    ))
    :
    <><p>No has Recibido Ninguna Notificación.</p></>
  }
</Slideover>
<Portal open={exit} onClose={() => CloseLogout()}> 
        <form method="POST" action="#">
 <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-blue p-6 text-left align-middle shadow-xl transition-all">
  <div className="w-full mb-3">
   <p className="text-blue text-xl font-bold text-center">¿Estas Seguro de que quieres Cerrar Sesión? </p>
  
  </div>
  <div className="flex justify-center">
  <div className="inline-flex  items-center">
   <button 
   onClick={() => CloseLogout()}
   type='button'
   className='border-2 border-admin-blue !text-blue hover:bg-admin-blue hover:!text-white button_tech_colorless mr-2'>Cancelar</button>

   <button 
   onClick={() => logoutHandler()}
   type='submit'
   className='border-2 border-admin-red !text-admin-red hover:!text-white hover:bg-admin-red button_tech_colorless'>Cerrar Sesión</button>

  
  </div>
  </div>
   </div>
   </form>
 </Portal>
</>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user
});
export default connect(mapStateToProps,{
  logout
})(NavBarUser);
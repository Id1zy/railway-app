// ICO
import { UserCircleIcon, Cog6ToothIcon, ArrowLeftOnRectangleIcon, DocumentPlusIcon } from '@heroicons/react/24/outline';
// React Functions
import { useEffect, useState } from "react";
import { connect } from "react-redux";
//Components
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import { Button, Card, Chip } from "@material-tailwind/react";
import chip from '@material-tailwind/react';
import { Disclosure } from '@headlessui/react'
// Images
import { guardian_maps } from "../../helpers/users_helpers";
import { GuardianRoutes } from '../../helpers/users_routes';
import { studentForum } from '../../api/axiosGuardian';
import { PaginationWhite } from '../../components/users/pagination';
import { Link } from 'react-router-dom';
import "./calendar.css"

const StudenListGuardian = ({  user }) => {
  const [userData, setUserData] = useState('');
  const [section, setSection] = useState([]);
  const [page, setPage] = useState(1);
  const [forPage, setForPage] = useState(4);
  const max = section.length / forPage

  useEffect(() => {
    async function loadForum() {
        try {
          const res = await studentForum();
          if (res && res.data) {
            console.log(res.data)
            setSection(res.data);
          }
        } catch (error) {
          console.error('Error al cargar los Estudiantes:', error);
        }
      }

    loadForum();
    if (user) {
      setUserData(user);
    }
  }, [user]);

    return(
        <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'} >

          <SideBar  color={'bg-blue'} userData={userData} useRol={'Apoderado'} mapeo={guardian_maps}>
            {/* Parte Central */}
            
            
            <div className="w-full md:w-4/5 bg-fondo p-4 h-full shadow-md overflow-y-auto">  

            <div className=''>
    <div className='flex content-center items-center justify-between mx-2 my-6 border-b-4 pb-4 border-blue'>
    <div className="flex items-center">

        </div>
      <div className="min-w-0 flex-1">
        <h2 className='text-xl2 sm:text-xl3 text-center font-bold leading-7 text-blue '>
          Foros 
        </h2>
      </div>
      <div className="flex lg:ml-4 lg:mt-0">
        <span className="">

        </span>
      </div>
    </div>
    </div>



    {section.slice((page-1)*forPage, (page-1)*forPage+forPage).map((item, index)=>(<>
      <Disclosure >
          {({ open }) => (
            <>
            <Disclosure.Button className="w-full mb-2" key={item.id}>
            <Card className="bg-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl rounded-xl overflow-hidden">
  <div className="p-5 md:p-8">
    <div className="flex flex-col md:flex-row items-center">
      <div className="md:w-1/4 flex justify-center md:justify-start pr-4">
        <div className="ml-40 h-20 w-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
          {/* Icono de foro */}
          <svg className="h-12 w-16 translate-x-19 text-new-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Speech bubble icon */}
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
          </svg>
        </div>
      </div>
      <div className="w-full md:w-3/4 md:border-l-2 border-gray-200 md:pl-6">
      <Chip value="ACTIVO" className="bg-admin-green text-white text-center rounded-full text-xs py-0.5 px-1 mb-4  animate-pulse" />
      <div className='bg-new-blue rounded-md md:w-1/4 x-2 ml-7 text-center mx-auto items-center'>
        <h2 className="font-bold text-2xl text-white mb-3 ">{item.name}</h2>
        </div>
        <div className='bg-new-blue rounded-md px-2 md:w-1/4 x-2 ml-7'>
        <p className="text-white text-sm mb-3">Estudiante</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
          <svg className="h-5 w-5 text-new-blue mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
            <line x1="12" y1="18" x2="12" y2="18"></line>
            <path d="M16 6h-8a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-8a2 2 0 00-2-2z"></path>
            <line x1="8" y1="10" x2="16" y2="10"></line>
            <line x1="8" y1="14" x2="16" y2="14"></line>
            <line x1="8" y1="6" x2="8.01" y2="6"></line>
          </svg>
            <div className='bg-new-blue rounded-md px-2 md:w-1/4 x-2'>
            <span className="text-white">R.U.T: {item.rut}</span>
            </div>
          </div>
          <div className="flex items-center">
          <svg className="h-5 w-5 text-new-blue mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22,4H2A2,2,0,0,0,0,6V18a2,2,0,0,0,2,2H22a2,2,0,0,0,2-2V6A2,2,0,0,0,22,4Z"></path>
            <polyline points="22 6 12 13 2 6"></polyline>
          </svg>
            <div className='bg-new-blue rounded-md px-2 md:w-1/4 x-2'>
            <span className="text-white">{item.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Chip></Chip>
  <div className="bg-blue to-r from-new-blue to-blue-800 p-3">
    <div className="flex justify-between items-center">
      <button className="text-new-blue bg-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-gray-100 transition-colors">
        Ver Foro
      </button>
    </div>
  </div>
</Card>
            </Disclosure.Button>
              <Disclosure.Panel className="px-2 pt-2 pb-4 text-sm text-gray-500">
                <Card className="w-full p-3 border-l-4 border-new-blue"> 
                {item.sections.length > 0 ? <></>:<><p className="text-blue p-2 font-bold">No Hay Secciones Añadidas.</p></>}
                {item.sections.map((item_, index_)=>(<>
                  <div className="inline-flex m-1 justify-between items-center border-b border-new-blue py-1">
                    <div className="inline-flex font-bold text-new-blue">
                    <p>Curso: {item_.course}</p>
                    </div>
                    <div className="inline-flex font-bold text-new-blue">
                    <p>Asignatura: {item_.asignatura}</p>
                    </div>
                    <div className="inline-flex font-bold text-new-blue">
                    <p>Profesor: {item_.professor}</p>
                    </div>
                    <div className="inline-flex">
                     <Link to={GuardianRoutes.Forum.replace(':uid', item_.id)} className='bg-blue button_tech_colorless !py-1 hover:bg-light-blue'>Ir al Foro</Link>
                    </div>
                    
                </div>


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

   </PageUser>
  );
}




const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
  });
  export default connect(mapStateToProps,{
  })(StudenListGuardian);
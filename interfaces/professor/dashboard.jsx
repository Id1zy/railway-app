import PageUser from "../../hocs/layouts/PageUser";
import PageHeading from "../../components/heros/pageHeading";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SideBar from "../../components/users/sidebar";



const Dashboard_Professor = ({isAuthenticated, user}) => {
  const rol_ = "Profesor";
  const [userData, setUserData] = useState('');
  
  useEffect(() =>{

  if(!isAuthenticated){
     <Navigate to={'/'} />
   }

    if(user){
      setUserData(user);
    }
    
  
  }, [isAuthenticated, user]);
  if(userData.rol !== rol_){
    window.history.back();
  }

    return(
        <PageUser >
          <SideBar  useRol={'Profesor'} >
            {/* Parte Central */}
  <div className="w-full md:w-3/5 bg-fondo p-4 h-full"> 

<header className="bg-white shadow m-2 rounded-lg bg-tech flex items-center justify-center">
<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-center">
  <h1 className="text-3xl font-bold tracking-tight text-gray-900">Bienvenido Docente{userData.get_full_name} </h1>
</div>
</header>
<PageHeading title='Dashboard' button='Descargar'/>

      <main>
        <div className="mx-auto max-w-7xl mt-4">
          {/* Parámetros */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">

          <div className="bg-white shadow rounded-[20px] p-3">
                  <div className="flex justify-between">
                      <p className="text-light-green text-lg font-bold">Titulo</p>
                      <button className="bg-light-green hover:bg-deep-green h-7 w-7 rounded-full"></button>
                  </div>
                  <div className="flex justify-center bg-light-green hover:bg-deep-green py-2 -mx-3 my-4">
                  <p className="text-white text-lg font-bold">hola</p>
                  </div>
                  <div className="flex justify-center  mt-3">
                      <button className="w-full bg-light-green hover:bg-deep-green button_tech_5 ">click</button>
                  </div>
              </div>

              <div className="bg-white shadow rounded-[20px] p-3">
                  <div className="flex justify-between">
                      <p className="text-light-blue  text-lg font-bold">Titulo</p>
                      <button className="bg-light-blue hover:bg-deep-blue h-7 w-7 rounded-full"></button>
                  </div>
                  <div className="flex justify-center bg-light-blue hover:bg-deep-blue py-2 -mx-3 my-4">
                  <p className="text-white text-lg font-bold">hola</p>
                  </div>
                  <div className="flex justify-center  mt-3">
                      <button className="w-full bg-light-blue hover:bg-deep-blue button_tech_5">click</button>
                  </div>
              </div>

              <div className="bg-white shadow rounded-[20px] p-3">
                  <div className="flex justify-between">
                      <p className="text-deep-red text-lg font-bold">Titulo</p>
                      <button className="bg-deep-red hover:bg-deep-red-2 h-7 w-7 rounded-full"></button>
                  </div>
                  <div className="flex justify-center bg-deep-red  hover:bg-deep-red-2 py-2 -mx-3 my-4">
                  <p className="text-white text-lg font-bold">hola</p>
                  </div>
                  <div className="flex justify-center  mt-3">
                      <button className="w-full bg-deep-red hover:bg-deep-red-2 button_tech_5">click</button>
                  </div>
              </div>

              <div className="bg-white shadow rounded-[20px] p-3">
                  <div className="flex justify-between">
                      <p className="text-orange text-lg font-bold">Titulo</p>
                      <button className="bg-orange hover:bg-deep-orange h-7 w-7 rounded-full"></button>
                  </div>
                  <div className="flex justify-center bg-orange hover:bg-deep-orange py-2 -mx-3 my-4">
                  <p className="text-white text-lg font-bold">hola</p>
                  </div>
                  <div className="flex justify-center  mt-3">
                      <button className="w-full bg-orange hover:bg-deep-orange button_tech_5">click</button>
                  </div>
              </div>
          </div>
          {/* Estadísticas */}
          <div className="w-50 h-50 bg-white rounded-[20px] p-4">
              <p>hola</p>
          </div>
        </div>
      </main>

      
    
      
</div>

  {/* Parte Derecha */}
  <div className="w-1/5 hidden md:block h-full border-l-4 border-blue p-4">
  <div className="grid grid-cols-1">
    <div className="bg-white shadow rounded-[20px] p-3">
    <div className="flex justify-center bg-light-blue rounded-t-[20px] -mt-3 -mx-3 p-2 ">
        <p className="text-white text-lg font-bold">Titulo</p>
    </div>
    <div className="p-4">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut </p>
    </div>

    </div>
</div>

  </div>
          </SideBar>

   </PageUser>
    )
}


const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
  });
  export default connect(mapStateToProps,{
  })(Dashboard_Professor);
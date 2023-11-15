import Dotloader from "react-spinners/DotLoader";
// React Functions
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom"
import { useForm } from 'react-hook-form';
// REDUX
import { connect } from "react-redux"
import { login } from "../../redux/actions/auth";
// Components
// Helpers
import { SuperUserRoutes, StudentRoutes, AdminRoutes, ProfessorRoutes, UTPRoutes, GuardianRoutes, DirectorRoutes, InspectorRoutes, SecretaryRoutes  } from "../../helpers/users_routes";

const LoginComponent = ({
    login,
    loading,
    auth,
    rol
  }) => {



    useEffect(() => {
      window.scrollTo(0,0)
      
    }, [])

      const [remember, setRemember] = useState(false);


      const handleCheckboxChange = () => {
        setRemember(!remember);
      };


      const form = useForm()
    
      const {register, handleSubmit, formState} = form
      const {errors} = formState

    
      const onSubmit = data => {

          login(data.email, data.password)

          

      }

      if(auth){
        if(rol === "estudiante"){
          return  <Navigate to={StudentRoutes.Dashboard} />
        }
        else if(rol === "profesor"){
          return  <Navigate to={ProfessorRoutes.Dashboard} />
        }
        else if(rol === "administrador"){
          return  <Navigate to={AdminRoutes.Dashboard} />
        }
        else if(rol === "UTP"){
          return  <Navigate to={UTPRoutes.Dashboard} />
        }
        else if(rol === "apoderado"){
          return  <Navigate to={GuardianRoutes.Dashboard} />
        }
        else if(rol === "director"){
          return  <Navigate to={DirectorRoutes.Dashboard} />
        }
        else if(rol === "inspector"){
          return  <Navigate to={InspectorRoutes.Dashboard} />
        }
        else if(rol === "secretario"){
          return  <Navigate to={SecretaryRoutes.Dashboard} />
        }
        else if(rol === "superuser"){
          return  <Navigate to={SuperUserRoutes.Dashboard} />
        }
        else{
          console.log('No Existe el rol indicado')
        }
        
      }
       

  return (
 <>
 
 
 <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl3 text-center font-bold leading-tight tracking-tight text-blue md:text-2xl dark:text-white">
                  Iniciar Sesión
              </h1>
              <form className="space-y-3 md:space-y-3" onSubmit={handleSubmit(onSubmit)} noValidate>

                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-semibold text-blue dark:text-white">Correo Electrónico</label>
                      <input type="email"  id="email" 
                      {...register('email',{
                        required: {
                          value: true,
                          message: "El Correo Electrónico es requerido.",
                        },
                        pattern:{
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: 'El Formato de Correo Electrónico inválido.',
                        }
                      })}
                      className={errors.email? 'input-tech border-2 border-red-500' : 'border-none input-tech '}
                      placeholder="name@company.com" required=""/>
                      <p className="text-red-500 text-sm flex items-start justify-start mt-1">{errors.email?.message }</p>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-semibold text-blue dark:text-white">Contraseña</label>
                      <input type="password"  id="password"
                      {...register('password',{
                        required: {
                          value: true,
                          message: "La contraseña es requerida.",
                        },
                  
                      })}
                       placeholder="••••••••" 
                       className={errors.password? 'input-tech border-2 border-red-500' : 'border-none input-tech'}
                        required=""/>
                  <p className="text-red-500 text-sm flex items-start justify-start mt-1">{errors.password?.message }</p>
                  </div>
                  <div className="flex items-center justify-between">

                      
                  </div>
                  { loading ? <button type="submit" className="w-full button_tech_2  text-white">
  <Dotloader color="white" size="20" />
</button>: <button type="submit" className="w-full button_tech_2 ">Ingresar</button>}
                  
                  <div className="text-center">
                  <NavLink to={'/reset_password'} className="text-center text-sm font-medium text-blue hover:underline dark:text-primary-500">¿Olvidaste la Contraseña?</NavLink>
                  </div>
                 
               
              </form>
          </div>
      </div>
  </div>
</section>
 
 
 </>
  )
}

const mapStateToProps = state => ({
    loading: state.Auth.loading,
    auth: state.Auth.isAuthenticated,
    rol: state.Auth.rol
})
  
export default connect(mapStateToProps, {
    login
  }) (LoginComponent)

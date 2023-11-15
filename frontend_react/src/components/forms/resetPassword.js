
import { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import { reset_password } from '../../redux/actions/auth'
import { Navigate } from 'react-router'
import Dotloader from "react-spinners/DotLoader";
import { useForm } from 'react-hook-form';
import up from '../../assets/imagenes/up.svg'
import down from '../../assets/imagenes/down.svg'
import barra from '../../assets/imagenes/barra.svg'

const ResetPassword = ({
  reset_password,
  loading
}) => {

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  const form = useForm()
  const {register, handleSubmit, formState} = form
  const {errors} = formState

  const [requestSent, setRequestSent] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
  })

  const { 
    email,
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (data) =>{
    reset_password(data['email']);
    setRequestSent(true)
  }

  if (requestSent && !loading)
        return <Navigate to='/' />;

  return (
    <>
    <section className="relative m-0 ">
  <div className="w-full bg-fondo h-screen relative ">
    <div className="absolute -left-4 -top-4 min-h-fit min-w-fit hidden lg:block">
      <img src={up}   />
    </div>
    <div className="absolute inset-0  bg-center bg-cover min-h-fit min-w-fit  hidden lg:block">
      <img src={barra}  className='w-full h-full' />
    </div>
    <div className="absolute -bottom-10 -right-0 min-h-fit min-w-fit  hidden lg:block">
      <img src={down} className='' />
    </div>
  </div>
  

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center ">

  <div className="grid grid-cols-1">
    <div className="bg-white text-white w-full  rounded-[20px] p-3">
    <div className="flex justify-center bg-blue shadow drop-shadow rounded-t-[15px] -mt-3 -mx-3 p-2 ">
        <p className="text-white text-lg font-bold sm:p-3">Recuperar Contraseña</p>
    </div>
    <div className="sm:p-5">
        <form onSubmit={handleSubmit(onSubmit)}  className="sm:space-y-4" >
              <div>
                <label htmlhtmlFor="email" className="block text-sm font-medium text-blue">
                  Correo Electrónico
                </label>
                <div className="mt-1">
                  <input
                    name="email"
                    onChange={e=>onChange(e)}
                    type="email"
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
                    placeholder="email@example.com"
                    required
                  />
                   <p className="text-red-500 text-sm flex items-start justify-start mt-1">{errors.email?.message }</p>
                </div>
              </div>

              <div>
                {loading ? 
                <button
                className="button_tech_2"
              >
                <Dotloader
                color="#fff"
               
                />
              </button>:
              <button
              type="submit"
              className="w-full button_tech_2 "
            >
              Enviar Correo Electrónico
            </button>}
              </div>
            </form>
    </div>

    </div>
</div>



     
      </div>

    
</section>

    </>
  )
}
const mapStateToProps = state => ({
  loading: state.Auth.loading
})

export default connect(mapStateToProps, {
  reset_password
}) (ResetPassword)
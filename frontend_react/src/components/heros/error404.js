import up from '../../assets/imagenes/up.svg'
import down from '../../assets/imagenes/down.svg'
import barra from '../../assets/imagenes/barra.svg'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion';


export default function Error404() {

  return (

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
  
  {/* Tarjeta superpuesta */}
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-md rounded-lg">
  <h1 className="text-xl3 text-center font-bold leading-tight tracking-tight text-blue md:text-2xl dark:text-white">404</h1>
  <h1 className="text-xl text-center font-medium leading-tight tracking-tight text-blue md:text-2xl dark:text-white">Página No Encontrada</h1>
  <NavLink to={"/"} className="w-full button_tech_2 mt-2">Volver al Inicio</NavLink>

  </div>
</section>

  
  )
}

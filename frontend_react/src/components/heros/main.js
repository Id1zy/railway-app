
import right from '../../assets/imagenes/right.svg'
import right_2 from '../../assets/imagenes/right_2.svg'
import left_2 from '../../assets/imagenes/left_2.svg'

import bubble from '../../assets/imagenes/bubble.svg'
import { motion } from 'framer-motion';



export default function HeroMain() {

  return (

  <section className="relative m-0">
    
    <div className="">
      {/* Imagen aquí */}
      <img
        src={left_2}
        alt="Imagen"
        className="absolute inset-x-0 top-0 w-full z-0 block sm:hidden "
      />
    </div>

  
    <div className="relative mx-auto max-w-screen ml-4 px-4 py-32 sm:px-6 sm:flex lg:h-screen items-center lg:px-8 ">
        {/* contenido*/ }
      <div className="max-w-xl text-center sm:text-left  z-20 justify-end ">

        <div className='line-tech'>
        <div className='p-0 sm:pl-5'>
        <motion.h1
  className="text-3xl font-extrabold sm:text-xl3 z-20 text-dark-blue"
  initial={{ x: '-100vw' }} 
  animate={{ x: 0 }} 
  transition={{type: 'spring', duration: 1, bounce: 0.3}}


>
  TÍTULO TÍTULO TÍTULO TÍTULO
  <strong className="block font-extrabold text-blue z-20">
    TÍTULO TÍTULO TÍTULO TÍTULO
  </strong>
</motion.h1>

<motion.p
className="z-20 max-w-lg sm:text-xl text-blue "
initial={{ x: '-100vw' }} 
animate={{ x: 0 }} 
transition={{type: 'spring', duration: 1, bounce: 0.3}}


>
Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
          Nesciunt illo
          tenetur fuga ducimus numquam ea!
</motion.p>
  
      
        </div>

        </div>
        
        
  
        <div className="mt-8 flex flex-wrap gap-4 text-center z-20 p-0 sm:pl-10">
          <motion.a
          className="w-full button_tech_2 z-20 sm:w-auto"
          initial={{ x: '-100vw' }} 
          animate={{ x: 0 }} 
          transition={{type: 'spring', duration: 1, bounce: 0.3}}
          whileHover={{scale: 1.1}}

          > Ver Más</motion.a>
         <motion.a
          className="button_tech_3 z-20"
          initial={{ x: '-100vw' }} 
          animate={{ x: 0 }} 
          transition={{type: 'spring', duration: 1, bounce: 0.3}}
          whileHover={{scale: 1.1}}
    
          > Ver Más</motion.a>
  
        </div>
      </div>

      <motion.div
  className=""
  initial={{ x: '-100vw' }} 
  animate={{ x: 0 }} 
  transition={{type: 'spring', duration: 1, bounce: 0.3}}
>
  {/* Imagen aquí */}
  <motion.img
    src={bubble}
    alt="Imagen"
    className="relative ml-20 hidden lg:block"
    whileHover={{ scale: 1.1 }} 
    whileTap={{ scale: 0.9 }} 
  />
</motion.div>


    </div>

    {/* foto*/ }
<div className="">
      {/* Imagen aquí */}
      <img
        src={right}
        alt="Imagen"
        className="absolute  h-full z-0  hidden sm:inset-y-0 sm:right-0 sm:rotate-0 sm:block "
      />
    </div>

    <div className="">
      {/* Imagen aquí */}
      <img
        src={right_2}
        alt="Imagen"
        className="absolute inset-x-0 bottom-0 w-full z-0 block sm:hidden "
      />
    </div>



  </section>
  
  )
}

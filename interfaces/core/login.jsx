import Page from '../../hocs/layouts/Page';
import LoginComponent from '../../components/loginComponent';
import { useEffect, useState } from 'react'

import up from '../../assets/imagenes/up.svg'
import down from '../../assets/imagenes/down.svg'



function Login(){


  useEffect(() => {

  }, []);

    return(
      <Page num='1'>
                    <div className="flex flex-col sm:flex-row">
  <div className="w-full sm:w-2/5 bg-fondo h-screen relative">
    <div className="absolute -left-4 -top-4 min-h-fit min-w-fit">
      <img src={up} alt="Imagen" />
    </div>
    <div className="absolute -bottom-10 -right-20">
      <img src={down} alt="Imagen" className='' />
    </div>
    <div className="absolute inset-0">
      <LoginComponent />
    </div>
  </div>

  <div className="relative w-full sm:w-3/5  shadow-bg h-screen min-h-0 bg-[url(https://img.freepik.com/free-photo/school-is-closed-due-covid19-pandemic_637285-8841.jpg?w=740&t=st=1692591728~exp=1692592328~hmac=fd2fcbdef650d9a9a7dbee90adc1a018a78f37f503f6a6cff62d90a12d1eefb0)] bg-cover bg-center bg-no-repeat ">
    <div className="absolute ml-10 mt-10">
    <div className='line-tech'>
        <div className='p-0 sm:pl-5'>
        <h1 className="text-3xl text-white font-extrabold sm:text-xl3 z-20">
          TÍTULO TÍTULO TÍTULO TÍTULO
  
        </h1>
  
        <p className="z-20 max-w-lg sm:text-xl text-white">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
          Nesciunt illo
          tenetur fuga ducimus numquam ea!
        </p>
        </div>

        </div>
    </div>
  </div>
</div>

      </Page>
    )
}

export default Login;
  



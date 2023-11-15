import { Card } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { signup } from "../../redux/actions/auth";
import { connect } from "react-redux";
import { postStudent } from "../../api/axiosStudent";
import Dotloader from "react-spinners/DotLoader";

const CreateStudent =({signup, update, onClose}) => {
  const [createUser, setCreateUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [update_, setUpdate] = useState(0);
  const form = useForm();
  const { register, handleSubmit, formState: { errors }, watch } = form;
  
  useEffect(() => {
    const act = ()=>{
      update()
      setUpdate(0);
    }
    return act()
  }, []);


  const onSubmit =  (data) => {
    try{
      setLoading(true);
      postStudent( data['first_name'], data['last_name'], data['email'],  data['rut'],  data['rutGuardian']);
      setCreateUser(true);
      toast.success('Estudiante Creado');
      setLoading(false);
      onClose()
      update()
      return setUpdate(update_+1);
    }catch(e){
      toast.error('No se pudo crear al Estudiante.')
      setLoading(false);
      onClose();
    }

  };

 
  

  const styles = ({
    true: 'bg-admin-input input_tech_search_colorless_2 border-2 border-deep-red ring-2 ring-red ring-offset-deep-red focus:ring-transparent focus:border-none focus:ring-offset-admin-green',
    false: 'bg-admin-input input_tech_search_colorless_2 border-none focus:ring-transparent focus:ring-offset-admin-green'
  });

  return (
    <Card className="h-full w-full overflow-scroll bg-admin-black p-5 text-white rounded-[10px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border-b border-admin-green mb-2">
          {loading!==true ? <><h2 className="text-xl3 font-bold">Registro</h2></>:<><h2 className="text-xl3 font-bold animate-pulse">Registrando...</h2></>}
        </div>
        <div>
          <div className="grid grid-cols-1 gap-4  mb-1">
            <div>
            <p className='w-full inline-block rounded-t-lg text-xl1 text-white font-medium'>Correo Electrónico</p>
              <input
                type="email"
                id="email"
                {...register('email', {
                  required: "El Correo Electrónico es requerido.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'El Formato de Correo Electrónico es inválido.',
                  }
                })}
                className={errors.email ? `${styles.true}` : `${styles.false}`}
                placeholder="name@company.com"
              />
              <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.email?.message}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
            <div className="grid grid-rows-1  gap-4 sm:grid-rows-2">
              <div className="mb-1">
                <p className='w-full inline-block rounded-t-lg text-xl1 text-white font-medium'>Nombre</p>
                <input
                  type="text"
                  {...register('first_name', { 
                    required: "Nombre es requerido."
                   })}
                  className={errors.first_name ? `${styles.true}` : `${styles.false}`}
                />
                 {errors.first_name ? <><p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.first_name?.message}</p></> :<></>}
              </div>
              <div className="mb-1">
                <p className='w-full inline-block rounded-t-lg text-xl1 text-white font-medium'>Apellido</p>
                <input
                  type="text"
                  {...register('last_name', { required: "Apellido es requerido" })}
                  className={errors.last_name ? `${styles.true}` : `${styles.false}`}
                />
                 {errors.last_name ? <><p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.last_name?.message}</p></> :<></>}
              </div>
            </div>
            <div className="grid grid-rows-1 gap-4 sm:grid-rows-2">
              <div className="mb-1">
                <p className='w-full inline-block rounded-t-lg text-xl1 text-white font-medium'>RUT del Estudiante</p>
                <input
                  type="text"
                  {...register('rut', { required: "El RUT es requerido" })}
                  className={errors.rut ? `${styles.true}` : `${styles.false}`}
                />
                 {errors.rut ? <><p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.rut?.message}</p></> :<></>}
              </div>
              <div className="mb-1">
                <p className='w-full inline-block rounded-t-lg text-xl1 text-white font-medium'>RUT del Apoderado</p>
                <input
                  type="text"
                  {...register('rutGuardian', {
                    required: "El RUT del Apoderado es Requerido.",
                  })}
                  className={errors.rutGuardian ? `${styles.true}` : `${styles.false}`}
                />
                {errors.rutGuardian ? <><p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.rutGuardian?.message}</p></> :<></>}
                 
              </div>
            </div>
          </div>
      
          <div className="flex flex-row-reverse mt-3">
            <div className="w-full md:w-auto">
            <button onClick={()=>onClose()}
            className='w-full md:w-auto border-2 border-admin-blue hover:bg-admin-blue button_tech_colorless' type="buttom">Cancelar</button>
              
            
              { loading ? <button className='w-full md:w-auto border-2 border-admin-green hover:bg-admin-green button_tech_colorless' type="button">
  <Dotloader color="white" size="20" />
</button>: <button className='w-full md:w-auto border-2 border-admin-green hover:bg-admin-green button_tech_colorless' type="submit">Registrar</button>}
            
            </div>
          </div>
        </div>
      </form>
    </Card>
  );
}

const mapStateToProps = state => ({
  loading: state.Auth.loading,
  auth: state.Auth.isAuthenticated,
  rol: state.Auth.rol
})

export default connect(mapStateToProps, {
  signup
}) (CreateStudent)

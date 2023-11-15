
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { connect } from "react-redux";
import { getSecretary, editSecretary } from "../../../api/axiosAdministrative";



const EditAdministrative =({id, onClose}) => {
  const [createUser, setCreateUser] = useState(false);
  const form = useForm();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = form;

  const password = watch("password");
  const re_password = watch("re_password");

  useEffect(() => {

    async function loadAdmin() {
      try {
        const res = await getSecretary(id);
        console.log(res.data[0].email)
        setValue('email', res.data[0].email)
        setValue('first_name', res.data[0].first_name)
        setValue('last_name', res.data[0].last_name)

      } catch (error) {
        console.error('Error al cargar los estudiantes:', error);
      }
    }
    loadAdmin();
  }, []);

  const onSubmit = (data) => {
    if (password !== re_password) {
      toast.error("Las contraseñas deben coincidir");
      
    } else {
      editSecretary(id, data['first_name'], data['last_name'], data['email'],  data['password'], )

      setCreateUser(true)
      onClose()

    }
  };
  
 

  const styles = ({
    true: 'bg-admin-input input_tech_search_colorless_2 border-2 border-deep-red ring-2 ring-red ring-offset-deep-red focus:ring-transparent focus:border-none focus:ring-offset-admin-green',
    false: 'bg-admin-input input_tech_search_colorless_2 border-none focus:ring-transparent focus:ring-offset-admin-green'
  });

  return (

      <form onSubmit={handleSubmit(onSubmit)} className="text-white">
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
                <p className='w-full inline-block rounded-t-lg text-xl1 text-white font-medium'>Contraseña</p>
                <input
                  type="password"
                  {...register('password', { required: "Contraseña es requerida" })}
                  className={errors.password ? `${styles.true}` : `${styles.false}`}
                />
                 {errors.password ? <><p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.password?.message}</p></> :<></>}
              </div>
              <div className="mb-1">
                <p className='w-full inline-block rounded-t-lg text-xl1 text-white font-medium'>Repetir Contraseña</p>
                <input
                  type="password"
                  {...register('re_password', {
                    required: "Repetir Contraseña es requerida",
                    validate: (value) => value === password || "Las contraseñas deben coincidir"
                  })}
                  className={errors.re_password ? `${styles.true}` : `${styles.false}`}
                />
                {errors.re_password ? <><p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.re_password?.message}</p></> :<></>}
                 
              </div>
            </div>
          </div>

      
          <div className="flex flex-row-reverse mt-3">
          <div className="flex justify-center">
   <div className="inline-flex  items-center">
    <button 
    onClick={()=>onClose()} type="button"
    className='border-2 border-admin-blue hover:bg-admin-blue button_tech_colorless mr-2'>Cancelar</button>
    <button 
    type="submit"
    className='border-2 border-admin-green hover:bg-admin-green button_tech_colorless'>Editar</button>
   </div>
   </div>

          </div>
        </div>
      </form>

  );
}

const mapStateToProps = state => ({
  loading: state.Auth.loading,
  auth: state.Auth.isAuthenticated,
  rol: state.Auth.rol
})

export default connect(mapStateToProps, {

}) (EditAdministrative)

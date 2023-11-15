
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { connect } from "react-redux";
import { getAdmin, editAdmin } from "../../../api/axiosAdmin";
import { getSchool } from "../../../api/axiosSchool";


const CreateAdmin =({id, onClose}) => {
  const [createUser, setCreateUser] = useState(false);
  const [schools, setSchools] = useState([]);
  const form = useForm();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = form;

  const password = watch("password");
  const re_password = watch("re_password");

  useEffect(() => {
    async function loadSchool() {
      try {
        const res = await getSchool();
        if (res && res.data && res.data.results) {
          setSchools(res.data.results);
        }
      } catch (error) {
        console.error('Error al cargar los estudiantes:', error);
      }
    }
    loadSchool();
    async function loadAdmin() {
      try {
        const res = await getAdmin(id);
        console.log(res.data[0].email)
        setValue('rbd', res.data[0].rbd)
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
      editAdmin(id, data['first_name'], data['last_name'], data['email'],  data['password'], data['rbd'])

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
          <div className="grid grid-cols-1 gap-4  mb-1">
            <div>
            <p className='w-full inline-block rounded-t-lg text-xl1 text-white font-medium'>Colegio</p>
            <select 
              {...register("rbd", {
              required: "El Colegio es Requerido."
          })}   className={errors.day ? `${styles.true}` : `${styles.false}`}>

{schools.filter(item => item.is_active === true).map((item)=>(
  <option value={item.rbd}>{item.name}</option>
))}
    </select>
              <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.rbd?.message}</p>
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

}) (CreateAdmin)

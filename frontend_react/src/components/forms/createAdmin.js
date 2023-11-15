import { Card } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { signup } from "../../redux/actions/auth";
import { connect } from "react-redux";
import { postAdmin } from "../../api/axiosAdmin";
import { getSchool } from "../../api/axiosSchool";

const CreateAdmin =({signup}) => {
  const [schools, setSchools] = useState([]);
  const [createUser, setCreateUser] = useState(false);
  const form = useForm();
  const { register, handleSubmit, formState: { errors }, watch } = form;

  useEffect(() => {
    async function loadSchool() {
      try {
        const res = await getSchool();
        if (res && res.data && res.data.results) {
            console.log(res.data.results)
          setSchools(res.data.results);
        }
      } catch (error) {
        console.error('Error al cargar los estudiantes:', error);
      }
    }
    loadSchool();
  }, []);

  const password = watch("password");
  const re_password = watch("re_password");

  const onSubmit = (data) => {

      postAdmin( data['first_name'], data['last_name'], data['email'], 'administrador',  data['password'], data['rbd'])
      setCreateUser(true)

  };
  
 

  const styles = ({
    true: 'bg-admin-input input_tech_search_colorless_2 border-2 border-deep-red ring-2 ring-red ring-offset-deep-red focus:ring-transparent focus:border-none focus:ring-offset-admin-green',
    false: 'bg-admin-input input_tech_search_colorless_2 border-none focus:ring-transparent focus:ring-offset-admin-green'
  });

  return (
    <Card className="h-full w-full overflow-scroll bg-admin-black p-5 text-white rounded-[10px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border-b border-admin-green mb-2">
          <h2 className="text-xl3 font-bold">Registro</h2>
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
            <div className="w-full md:w-auto">
              <button className='w-full md:w-auto border-2 border-admin-green hover:bg-admin-green button_tech_colorless' type="submit">Registrar</button>
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
}) (CreateAdmin)




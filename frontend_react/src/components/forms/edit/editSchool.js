import { Card } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { connect } from "react-redux";
import { getOneSchool, editSchool} from "../../../api/axiosSchool";

const EditSchool =({rbd, onClose}) => {
  const [createSchool, setCreateSchool] = useState(false);
  
  const form = useForm();
  const { register, handleSubmit, formState: { errors }, setValue } = form;

  useEffect(() => {
    async function loadSchool() {
      try {
        const res = await getOneSchool(rbd);
        setValue('rbd', res.data.rbd)
        setValue('email', res.data.email)
        setValue('name', res.data.name)
        setValue('address', res.data.address)
        setValue('phone', res.data.phone)
      } catch (error) {
        console.error('Error al cargar los estudiantes:', error);
      }
    }
    loadSchool();
  }, []);

  const onSubmit = async (data) => {

      try {
        
        const schoolData = {
          name: data.name,
          address: data.address,
          email:data.email,
          phone:data.phone
        };

        editSchool(data.rbd, schoolData)
        }
        catch (error) {
        console.error("Hubo un error al crear el usuario o el perfil del estudiante:", error);
        toast.error("Hubo un error al crear el usuario o el perfil del estudiante");
      }
  };
  

 
  

  const styles = ({
    true: 'bg-admin-input input_tech_search_colorless_2 border-2 border-deep-red ring-2 ring-red ring-offset-deep-red focus:ring-transparent focus:border-none focus:ring-offset-admin-green',
    false: 'bg-admin-input input_tech_search_colorless_2 border-none focus:ring-transparent focus:ring-offset-admin-green'
  });

  return (
    <Card className="h-full w-full bg-admin-black p-5 text-white rounded-[10px]">
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
                <p className='w-full inline-block rounded-t-lg text-xl1 text-white font-medium'>RBD</p>
                <input
                  type="text"
                  {...register('rbd', { 
                    required: "El RBD es requerido."
                   })}
                  className={errors.first_name ? `${styles.true}` : `${styles.false}`}
                  readOnly
                />
                 {errors.rbd ? <><p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.rbd?.message}</p></> :<></>}
              </div>
              <div className="mb-1">
                <p className='w-full inline-block rounded-t-lg text-xl1 text-white font-medium'>Dirección</p>
                <input
                  type="text"
                  {...register('address', { required: "La Dirección es requerida" })}
                  className={errors.address ? `${styles.true}` : `${styles.false}`}
                />
                 {errors.last_name ? <><p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.address?.message}</p></> :<></>}
              </div>
            </div>
            <div className="grid grid-rows-1 gap-4 sm:grid-rows-2">
              <div className="mb-1">
                <p className='w-full inline-block rounded-t-lg text-xl1 text-white font-medium'>Nombre</p>
                <input
                  type="text"
                  {...register('name', { required: "El Nombre es requerido" })}
                  className={errors.name ? `${styles.true}` : `${styles.false}`}
                />
                 {errors.name ? <><p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.name?.message}</p></> :<></>}
              </div>
              <div className="mb-1">
                <p className='w-full inline-block rounded-t-lg text-xl1 text-white font-medium'>Teléfono</p>
                <input
                  type="text"
                  {...register('phone', {
                    required: "El Número Telefónico es requerido"
                  })}
                  className={errors.phone ? `${styles.true}` : `${styles.false}`}
                />
                {errors.phone ? <><p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.phone?.message}</p></> :<></>}
                 
              </div>
            </div>

          </div>
      
          <div className="flex flex-row-reverse mt-3">
            <div className="w-full md:w-auto">
            <button 
            onClick={()=>onClose()}
            className='w-full md:w-auto border-2 border-admin-green hover:bg-admin-green button_tech_colorless' type="button">Cancelar</button>
              <button className='w-full md:w-auto border-2 border-admin-green hover:bg-admin-green button_tech_colorless' type="submit">Editar</button>
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

}) (EditSchool)
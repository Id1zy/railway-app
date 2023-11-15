
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { connect } from "react-redux";
import { getCourse, editCourse } from "../../api/axiosCourses";



const EditCourse =({ id, onClose}) => {
  const [createUser, setCreateUser] = useState(false);
  const form = useForm();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = form;

  

  useEffect(() => {
    async function loadAdmin() {
        try {
          const res = await getCourse(id);
          console.log(res.data[0])
          setValue('nivel', res.data[0].nivel)

  
        } catch (error) {
          console.error('Error al cargar el curso:', error);
        }
      }
      loadAdmin();
  }, []);

  const onSubmit = (data) => {

      editCourse(id, data['nivel'] )

      setCreateUser(true)
      onClose()

  };
  
 

  const styles = ({
    true: 'bg-fondo input_tech_search_colorless_2 border-2 border-deep-red ring-2 ring-red ring-offset-deep-red focus:ring-transparent focus:border-none focus:ring-offset-admin-green',
    false: 'bg-fondo input_tech_search_colorless_2 border-none focus:ring-transparent focus:ring-offset-admin-green'
  });

  return (

      <form onSubmit={handleSubmit(onSubmit)} className="text-blue">
        <div>
          <div className="grid grid-cols-1 gap-4  mb-1">
            <div>
              <input
                type="text"
                {...register('nivel', {
                  required: "El Nombre del Curso es Requerido.",

                })}
                className={errors.nivel ? `${styles.true}` : `${styles.false}`}
                placeholder="curso"
              />
              <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.nivel?.message}</p>
            </div>
          </div>


      
          <div className="flex flex-row-reverse mt-3">
          <div className="flex justify-center">
   <div className="inline-flex  items-center">
    <button 
    onClick={()=>onClose()} type="button"
    className='bg-light-blue hover:bg-blue button_tech_colorless mr-2'>Cancelar</button>
    <button 
    type="submit"
    className='bg-new-green hover:bg-new-dark-green button_tech_colorless'>Editar</button>
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

}) (EditCourse)

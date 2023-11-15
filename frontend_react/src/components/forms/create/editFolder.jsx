import { Card } from "@material-tailwind/react";
import { useState, useRef} from "react";
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { signup } from "../../../redux/actions/auth";
import { connect } from "react-redux";
import React from "react";
import { useParams } from "react-router-dom";
import { postFolder } from "../../../api/axiosSharedFiles";


const EditFolder =({signup, update_}) => {
  const [percentage, setPercentage] = useState(0);
  const editorRef = useRef(null);
  const params = useParams()
  const section= params.uid;
  const form = useForm();
  const { register, handleSubmit, formState: { errors }, watch } = form;

  const onSubmit = (data) => {
    toast.success('Carpeta Creada')
    if (editorRef.current){
      postFolder(section, data['title'], data['description'])
      return update_()
    }
  };
  


  const styles = ({
    true: 'placeholder-blue input_tech_search_colorless border-2 border-deep-red ring-2 ring-red ring-offset-deep-red focus:ring-transparent focus:border-none focus:ring-offset-admin-green',
    false: 'placeholder-blue input_tech_search_colorless_2 border-none focus:ring-transparent focus:ring-offset-blue',
    true_textarea: 'placeholder-blue resize rounded-md input_tech_search_colorless_2 border-2 border-deep-red ring-2 ring-red ring-offset-deep-red focus:ring-transparent focus:border-none focus:ring-offset-blue',
    false_textarea: 'placeholder-blue resize rounded-md input_tech_search_colorless_2 border-none focus:ring-transparent focus:ring-offset-blue'
  });

  return (
    <Card className="w-full max-w-md shadow-none p-5 text-blue rounded-[10px] p-4 transition-all">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border-b-2 border-blue mb-2">
          <h2 className="text-xl3 font-bold text-blue text-center">Editar Carpeta</h2>
        </div>
        <div>
          <div className="grid grid-cols-1 gap-4  mb-1">
            <div>
            <p className='w-full inline-block rounded-t-lg text-xl1 text-blue font-medium'>Nombre</p>
              <input
                type="text"
                id="title"
                {...register('title', {
                  required: "El Nombre es requerido."
                })}
                className={errors.title ? `${styles.true}` : `${styles.false}`}
                placeholder="Nombre"
              />
              <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.title?.message}</p>
            </div>
          </div>


          <div className="grid grid-cols-1 gap-4  mb-1">
            <div>
            <p className='w-full inline-block rounded-t-lg text-xl1 text-blue font-medium'>Descripción</p>
            <textarea 
            id="description"
            {...register('description', {
              required: "La Descripción es requerida."
            })}
            className={errors.description ? `${styles.true_textarea}` : `${styles.false_textarea}`}
            placeholder="Descripción..."></textarea>

              <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.description?.message}</p>
            </div>
          </div>


   
      
          <div className="flex flex-row-reverse mt-3">
            <div className="w-full md:w-auto">
              <button className='w-full md:w-auto border-2 border-blue !text-blue hover:bg-blue hover:!text-white button_tech_colorless' type="submit">Editar Carpeta</button>
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
}) (EditFolder)

import { Card } from "@material-tailwind/react";
import { useState, useEffect} from "react";
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { signup } from "../../redux/actions/auth";
import { connect } from "react-redux";
import React from "react";
import { createForumPost } from "../../api/axiosForum";
import { Navigate } from "react-router-dom";
import { ProfessorRoutes } from "../../helpers/users_routes";




const CreateForum =({signup, section}) => {
  const [createForum, setCreateForum] = useState(false);
  const [image, setImage] = useState();
  const [previewImage, setPreviewImage] = useState(null);
  const [percentage, setPercentage] = useState(0);

  const form = useForm();
  const { register, handleSubmit, formState: { errors }, watch } = form;


  const onSubmit = (data) => {
    toast.success('Foro Creado')
    createForumPost( data['title'], data['description'], data['excerpt'], section)
    setCreateForum(true)
  };

  
  
  const fileSelectedHandler = (e) =>{
    e.preventDefault();
    const file = e.target.files[0];
    const options = {
        onUploadProgress: (ProgressEvent) =>{
            const {loaded, total} = ProgressEvent;
            let percent = Math.floor((loaded*100)/total);
            if (percent<100){
                setPercentage(percent);
            }
        }
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e)=>{setPreviewImage(reader.result)};
    setImage(file);
    setPercentage(options);
}
 

  const styles = ({
    true: 'placeholder-blue input_tech_search_colorless border-2 border-deep-red ring-2 ring-red ring-offset-deep-red focus:ring-transparent focus:border-none focus:ring-offset-admin-green',
    false: 'placeholder-blue input_tech_search_colorless_2 border-none focus:ring-transparent focus:ring-offset-blue',
    true_textarea: 'placeholder-blue resize rounded-md input_tech_search_colorless_2 border-2 border-deep-red ring-2 ring-red ring-offset-deep-red focus:ring-transparent focus:border-none focus:ring-offset-blue',
    false_textarea: 'placeholder-blue resize rounded-md input_tech_search_colorless_2 border-none focus:ring-transparent focus:ring-offset-blue'
  });

  return (
    <Card className="h-full w-full shadow-none p-5 text-blue rounded-[10px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border-b-2 border-blue mb-2">
          <h2 className="text-xl3 font-bold text-blue text-center">Crear Foro</h2>
        </div>
        <div>
          <div className="grid grid-cols-1 gap-4  mb-1">
            <div>
            <p className='w-full inline-block rounded-t-lg text-xl1 text-blue font-medium'>Título</p>
              <input
                type="text"
                id="title"
                {...register('title', {
                  required: "El Título es requerido."
                })}
                className={errors.title ? `${styles.true}` : `${styles.false}`}
                placeholder="Título Foro"
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


          <div className="grid grid-cols-1 gap-4  mb-1">
            <div >
            <p className='w-full inline-block rounded-t-lg text-xl1 text-blue font-medium'>Miniatura</p>

            <input type="file"
                             onChange={e=>fileSelectedHandler(e)} 
                             className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-blue file:text-white
      hover:file:bg-light-blue
    "/>
             {previewImage ? <>
<div className="grid justify-items-center">
<p className="text-blue font-bold text-md text-center mb-2">Imágen Seleccionada</p>
   <img src={previewImage} className="w-full h-40"/>
</div>
</> : <></>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4  mb-1">
            <div>
            <p className='w-full inline-block rounded-t-lg text-xl1 text-blue font-medium'>Extracto</p>
              <input
                type="text"
                id="excerpt"
                {...register('excerpt', {
                  required: "El Extracto es requerido."
                })}
                className={errors.title ? `${styles.true}` : `${styles.false}`}
                placeholder="Fragmento"
              />
              <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.excerpt?.message}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4  mb-1">
            <div>
            <p className='w-full inline-block rounded-t-lg text-xl1 text-blue font-medium'>Categoría</p>

                <select 
                id="category"
                {...register("category", {
                required: "La Categoría es requerida."
            })}   className={errors.category ? `${styles.true}` : `${styles.false}`}>
        <option value="20">Tarea</option>
        <option value="30">Discusión</option>
      </select>
              <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.category?.message}</p>
            </div>
          </div>

      
          <div className="flex flex-row-reverse mt-3">
            <div className="w-full md:w-auto">
              <button className='w-full md:w-auto border-2 border-blue !text-blue hover:bg-blue hover:!text-white button_tech_colorless' type="submit">Crear Foro</button>
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
}) (CreateForum)

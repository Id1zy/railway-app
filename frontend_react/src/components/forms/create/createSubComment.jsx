import { Card } from "@material-tailwind/react";
import { useState, useRef} from "react";
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { signup } from "../../../redux/actions/auth";
import { connect } from "react-redux";
import React from "react";
import { createSubComment } from "../../../api/axiosForum";
import { Editor } from "@tinymce/tinymce-react";
import ProfileImg from "../../../assets/imagenes/ProfileImg.svg";




const CreateSubForum =({signup, commentParent, update}) => {
  const [percentage, setPercentage] = useState(0);
  const editorRef = useRef(null);
  const [profile, setProfile] = useState(window.localStorage.getItem("avatar"));
  const form = useForm();
  const { register, handleSubmit, formState: { errors }, watch } = form;
  
  const onSubmit = (data) => {
    if (editorRef.current){
        try{
            createSubComment(parseInt(commentParent), data['title'], editorRef.current.getContent())
            toast.success('Respuesta Creada')
            editorRef.current.setContent('');
            return update()
        }catch(e){
            toast.error(e)
        }
         
        

    }
  
  };
  


  const styles = ({
    true: 'block w-full resize-none border-0 bg-transparent py-1.5 text-blue placeholder:text-light-blue focus:ring-0 sm:text-sm sm:leading-6',
    false: 'block w-full resize-none border-0 bg-transparent py-1.5 text-red placeholder:text-red focus:ring-0 sm:text-sm sm:leading-6',
    true_textarea: 'placeholder-blue resize rounded-md input_tech_search_colorless_2 border-2 border-deep-red ring-2 ring-red ring-offset-deep-red focus:ring-transparent focus:border-none focus:ring-offset-blue',
    false_textarea: 'placeholder-blue resize rounded-md input_tech_search_colorless_2 border-none focus:ring-transparent focus:ring-offset-blue'
  });

  return (
    <Card className="h-full w-full shadow p-5 text-blue rounded-[10px] overflow-y-auto">
        <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
      {profile ? <>
          <img
          className="inline-block h-10 w-10 rounded-full"
          src={`${profile}`}
          alt=""
        /></>:<><img
          className="inline-block h-10 w-10 rounded-full"
          src={ProfileImg}
          alt=""
        /></>}
      </div>
      <div className="min-w-0 flex-1">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div  className="mb-2 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-light-blue focus-within:ring-2 focus-within:ring-blue">
            <input
                type="text"
                id="title"
                {...register('title', {
                  required: "El Asunto es requerido."
                })}
                className={errors.title ? `${styles.true}` : `${styles.false}`}
                placeholder="Asunto"
              />
            </div>
            <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.title?.message}</p>
          <div className="overflow-hidden rounded-lg shadow-sm ">
            <label htmlFor="comment" className="sr-only">
              Añade tu comentario
            </label>
           

            <Editor 
              onInit={(evt,editor)=>editorRef.current=editor}
              init={{
                placeholder: 'Escribe tu contendio aquí...',
                height: 200,
                menubar:false,
                plugins:'advlist autolink lists link image charmap preview anchor' +
                'searchreplace visualblocks code fullscreen' +
                'insertdatetime media table code help wordcount',
                toolbar: 'undo redo | numlist bullist | formatselect |' +
                'bold italic backcolor | alignleft aligncenter' +
                'removeformat | help',
                content_style: 'body {font-family:Helvetica, Arial,sans-serif; font-size:14px'
              }}

              />

<div className="z-50">


</div>

            <div className="py-2" aria-hidden="true">

              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
            <div className="flex items-center space-x-5">

             
            </div>
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-light-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Comentar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
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
}) (CreateSubForum)

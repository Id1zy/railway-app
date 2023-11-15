import { Card } from "@material-tailwind/react";
import { useState, useRef} from "react";
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import React from "react";
import { useParams } from "react-router-dom";
import { postFolder } from "../../../api/axiosSharedFiles";
import { Editor } from "@tinymce/tinymce-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateAssignment =({ update, onClose}) => {
  const [percentage, setPercentage] = useState(0);
  const params = useParams()
  const section= params.uid;
  const editorRef = useRef(null);
  const form = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const { register, handleSubmit, formState: { errors } } = form;

  const onSubmit = (data) => {
    postFolder(section, data['title'], data['description']);
    toast.success('Carpeta Creada');
    onClose();
    return update();
  };
  


  const styles = ({
    true: 'placeholder-blue input_tech_search_colorless border-2 border-deep-red ring-2 ring-red ring-offset-deep-red focus:ring-transparent focus:border-none focus:ring-offset-admin-green',
    false: 'placeholder-blue input_tech_search_colorless_2 border-none focus:ring-transparent focus:ring-offset-blue',
    true_textarea: 'placeholder-blue resize rounded-md input_tech_search_colorless_2 border-2 border-deep-red ring-2 ring-red ring-offset-deep-red focus:ring-transparent focus:border-none focus:ring-offset-blue',
    false_textarea: 'placeholder-blue resize rounded-md input_tech_search_colorless_2 border-none focus:ring-transparent focus:ring-offset-blue'
  });

  return (
    <Card className="w-auto md:min-w-screen shadow-none p-5 text-blue rounded-[10px]transition-all">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border-b-2 border-blue mb-2">
          <h2 className="text-xl3 font-bold text-blue text-center">Crear Trabajo</h2>
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
            <p className='w-full inline-block rounded-t-lg text-xl1 text-blue font-medium'>Fecha Límite</p>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect className={`${styles.true} z-50`}/>
            </div>
          </div>


          <div className="grid grid-cols-1 gap-4  mb-1">
            <div>
            <p className='w-full inline-block rounded-t-lg text-xl1 text-blue font-medium'>Descripción</p>
            <Editor 
   
              onInit={(evt,editor)=>editorRef.current=editor}
              
              init={{
                placeholder: 'Escribe tu contendio aquí...',
                height: 300,
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



           
            </div>
          </div>


   
      
          <div className="flex flex-row-reverse mt-3">
            <div className="w-full md:w-auto">
              <button className='w-full md:w-auto border-2 border-blue !text-blue hover:bg-blue hover:!text-white button_tech_colorless' type="submit">Crear </button>
            </div>
          </div>
        </div>
      </form>
    </Card>
  );
}



export default (React.memo(CreateAssignment));

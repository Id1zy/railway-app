// React Functions
import { useEffect, useState, useRef} from "react";
import { useForm } from 'react-hook-form';
import { Editor } from "@tinymce/tinymce-react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
//Components
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import { ProfessorRoutes} from "../../helpers/users_routes";
// Images
import { profesor_maps } from "../../helpers/users_helpers";
import { Link, Navigate } from "react-router-dom";
import {ArrowLeftIcon } from '@heroicons/react/20/solid'
import { getAssignment, editAssingment } from "../../api/axiosAssignment";
import { Card } from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
const tinyUrl = process.env.TINYMCE_API;

const EditAssignment = ({  user }) => {
  const [userData, setUserData] = useState('');
  const params = useParams()
  const [startDate, setStartDate] = useState(new Date());
  const editorRef = useRef(null);
  const form = useForm();
  const { register, handleSubmit, formState: { errors }, setValue } = form;
  const [content, setContent] = useState('')

  const [percentage, setPercentage] = useState(0);
  const [update, setUpdate] = useState(0);
  const [success_, setSuccess] = useState(false);
  const [color, setColor] = useState(
    window.localStorage.getItem("color"));


  useEffect(() => {
    const getAssignment_ = async () =>{
        try{
            const res = await getAssignment(params.suid)
            setValue('title', res.data.title );
            setContent(res.data.description);
            setStartDate(new Date(res.data.deadline));
           
        }catch(e){}
    }
    getAssignment_()

    if (user) {
      setUserData(user);
    }
    return setUpdate(0)
  }, [update]);

  if(success_){
    return <Navigate to={ProfessorRoutes.Assignments.replace(':uid', params.uid)}  />
  }
  

  const onSubmit = (data) =>{
  if (editorRef.current){
    try{
        editAssingment(params.suid, data['title'], editorRef.current.getContent(), startDate);
        toast.success('Trabajo Editado');
        setSuccess(true)
    }
    catch(e){}
  }
}

const Style = {
    colorSchool :  `bg-new-`+color,
    textSchool: `text-new-`+color,
    hoverSchool: `bg-new-h`+color,
    borderSchool: `border-new-`+color,
    buttonSchool: `bg-new-`+color+' hover:bg-new-h'+color,
  }
  

  

  const styles = ({
    true: 'w-full placeholder-blue input_tech_search_colorless border-2 border-deep-red ring-2 ring-red ring-offset-deep-red focus:ring-transparent focus:border-none focus:ring-offset-admin-green',
    false: 'placeholder-blue input_tech_search_colorless_2 border-none focus:ring-transparent focus:ring-offset-blue',
    true_textarea: 'placeholder-blue resize rounded-md input_tech_search_colorless_2 border-2 border-deep-red ring-2 ring-red ring-offset-deep-red focus:ring-transparent focus:border-none focus:ring-offset-blue',
    false_textarea: 'placeholder-blue resize rounded-md input_tech_search_colorless_2 border-none focus:ring-transparent focus:ring-offset-blue'
  });

    return(
<>
<PageUser color={`bg-white text-new-${color}`} colorInput={`bg-white text-new-${color}`}>

<SideBar color={`${Style.colorSchool}`} userData={userData} useRol="Profesor" mapeo={profesor_maps}>
    {/* Parte Central */}
   
    <div className={`w-full md:w-4/5 bg-fondo p-4 h-full shadow-md overflow-y-auto`}> 
      <Card className={`w-auto md:min-w-screen shadow-none p-5 ${Style.textSchool} rounded-[10px] transition-all`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={`flex items-center`}>
            <Link to={ProfessorRoutes.Assignments.replace(':uid', params.uid)}><ArrowLeftIcon className={`h-6 w-6 ${Style.textSchool} hover:text-white hover:rounded-full hover:${Style.hoverSchool}`}/></Link>
          </div>
          <div className={`border-b-2 ${Style.borderSchool} mb-2`}>
            <h2 className={`text-xl3 font-bold ${Style.textSchool} text-center`}>Editar Trabajo</h2>
          </div>
          <div>
            <div className={`grid grid-cols-1 gap-4  mb-1`}>
              <div>
                <p className={`w-full inline-block rounded-t-lg text-xl1 ${Style.textSchool} font-medium`}>Nombre</p>
                <input
                  type="text"
                  id="title"
                  {...register('title', {
                    required: "El Nombre es requerido."
                  })}
                  className={errors.title ? `${styles.true}` : `${styles.false}`}
                  placeholder="Nombre"
                />
                <p className={`text-deep-red font-bold text-sm flex items-start justify-start mt-1`}>{errors.title?.message}</p>
              </div>
            </div> 

            <div className={`grid grid-cols-1 gap-4  mb-1`}>
              <div>
                <p className={`w-full inline-block rounded-t-lg text-xl1 ${Style.textSchool} font-medium`}>Descripción</p>
                <Editor 
                  onInit={(evt, editor) => editorRef.current = editor}
                  initialValue={content}
                  init={{
                    placeholder: 'Escribe tu contenido aquí...',
                    height: 300,
                    menubar: false,
                    plugins: 'advlist autolink lists link image charmap preview anchor' +
                      'searchreplace visualblocks code fullscreen' +
                      'insertdatetime media table code help wordcount',
                    toolbar: 'undo redo | numlist bullist | formatselect |' +
                      'bold italic backcolor | alignleft aligncenter' +
                      'removeformat | help',
                    content_style: 'body {font-family: Helvetica, Arial, sans-serif; font-size: 14px}'
                  }}
                />
              </div>

              <div className={`grid grid-cols-1 gap-4 w-full mb-1`}>
                <div>
                  <p className={`w-full inline-block rounded-t-lg text-xl1 ${Style.textSchool} font-medium`}>Fecha Límite</p>
                  <DatePicker showIcon
                    selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect className={`${styles.true} z-50 !w-full`}/>
                </div>
              </div>
            </div>

            <div className={`flex flex-row-reverse mt-3`}>
              <div className={`w-full md:w-auto`}>
                <button className={`w-full md:w-auto border-2 ${Style.borderSchool} !${Style.textSchool} hover:${Style.hoverSchool} hover:!text-white button_tech_colorless`} type="submit">Editar</button>
              </div>
            </div>
          </div>
        </form>
      </Card>
    </div>
  </SideBar>
</PageUser>


</>
  );
}




const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
  });
  export default connect(mapStateToProps,{
  })(EditAssignment);
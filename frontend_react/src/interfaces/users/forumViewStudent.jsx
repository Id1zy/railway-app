// React Functions
import { useEffect, useState } from "react";
import { connect } from "react-redux";
//Components
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
// Images
import { index_maps } from "../../helpers/users_helpers";
import { Card } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import {  StudentRoutes } from "../../helpers/users_routes";
import { useParams } from "react-router-dom";
import { getForumPost } from "../../api/axiosForum";
import CreateComment from "../../components/forms/create/createComment";
import { getComment } from "../../api/axiosForum";
import CreateSubComment from "../../components/forms/create/createSubComment";
import { Disclosure } from '@headlessui/react'
import ProfileImg from "../../assets/imagenes/ProfileImg.svg";

const formatTime = (dateString) => {
  const fecha = new Date(dateString);
  const año = fecha.getFullYear();
  const mes = fecha.getMonth() + 1; 
  const dia = fecha.getDate();
  const hora = fecha.getHours();
  const minutos = fecha.getMinutes();

  const horaFormateada = hora < 10 ? `0${hora}` : hora;
  const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;

  return ` ${dia}-${mes}-${año} ${horaFormateada}:${minutosFormateados} `;
};

const capitalizeFirstLetter = (str) => {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};


const ForumViewStudent= ({  user }) => {
  const [userData, setUserData] = useState('');
  const [forum, setForum] = useState([]);
  const [infor, setInfo] = useState('');
  const [comment, setComment] = useState([]);
  const [update, setUpdate] = useState(0);
  const [color, setColor] = useState(
    window.localStorage.getItem("color"));
  const params = useParams()

  
 
  useEffect(() => {
    
    if (user) {
      setUserData(user);
    }
    const loadForumEffect = async () =>{
      try {
        const res = await getForumPost(params.forum);
        if (res && res.data) {
          setForum(res.data.data[0])
          setInfo(res.data.adition)
        }
      } catch (error) {
        console.error('Error al cargar los Foros:', error);
      }
    }
    const loadCommentEffect = async()=>{
      try{
        const res_= await getComment(params.forum);
        if (res_&& res_.data){
          setComment(res_.data);
          console.log(res_.data)
        }
      }catch (error){
        console.error('Error al cargar los Comentarios:', error);
      }
    }
    
  
    loadForumEffect();
    loadCommentEffect();

    return () =>{
      setUpdate(0);
      setComment([]);
    }
    

  }, [update]);

  const Style = {
    colorSchool :  `bg-new-${color}`,
  }

 
    return(
        <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'} >

          <SideBar  color={Style.colorSchool} userData={userData} useRol="Profesor" mapeo={index_maps}>
            {/* Parte Central */}
           
            <div className="w-full md:w-4/5 bg-fondo p-4 h-full shadow-md overflow-y-auto"> 


  
<Card className="mb-2">
<div
		className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3  border border-white bg-white">
		
			<div className="w-full bg-white flex flex-col flex-grow  p-3">
				
        {/* TOPBAR */}
            <div className="flex justify-between item-center">
        
        <div className="flex items-center">
            <Link to={StudentRoutes.Forum.replace(':uid', params.uid)}><ArrowLeftIcon className="h-6 w-6 text-blue hover:text-white hover:rounded-full hover:bg-blue"/></Link>

        </div>
<div className="inline-flex gap-2">
<div className="bg-admin-green px-3 py-1 rounded-full text-xs font-medium  hidden md:block">
            <p className="text-white">{infor ? infor.author: ''}</p>
</div>
        <div className="bg-blue px-3 py-1 rounded-full text-xs font-medium  hidden md:block">
            <p className="text-white">{infor ? formatTime(infor.date): ''}</p>
</div>
    </div>
</div>

{/*Contenido */}
         
				

        <div className="w-full grid place-content-center">
        <h3 className="font-black text-blue md:text-3xl text-xl mb-3 mt-3">{forum ? forum.title : ''}</h3>
        {forum ?  <div className="w-full" dangerouslySetInnerHTML={{__html: forum.description}}/> : ''}
        </div>

{/*BottomBar */}
        <div className="flex justify-between item-center">
        
        <div className="flex items-center">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-background-orange">
<path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
</svg>

            <p className="text-background-orange font-bold text-sm ml-1">
                Comentarios
                <span className="text-background-orange font-normal">({infor ? infor.comments: ''})</span>
            </p>
        </div>
<div className="inline-flex gap-2">
<div className="bg-admin-green px-3 py-1 rounded-full text-xs font-medium  hidden md:block">
            <p className="text-white">{infor ? capitalizeFirstLetter(infor.category): ''}</p>
</div>
        <div className="bg-blue px-3 py-1 rounded-full text-xs font-medium  hidden md:block">
            <p className="text-white">{infor ? capitalizeFirstLetter(infor.status): ''}</p>
</div>
    </div>
</div>
				
			</div>

 


		</div>
     </Card>

      {comment.map((item)=>(
        <>
        <Card className="p-5 mb-2 border-b-8 border-blue">
        <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
           
        {item.Parent.avatar != null? <>
                <img src={`http://localhost:8000${item.Parent.avatar}` } alt="tailwind logo" className="inline-block h-10 w-10 rounded-full" /></> :
              <>
                <img
                  className="inline-block h-10 w-10 rounded-full"
                  src={ProfileImg}
                  alt=""
                /></>}
         </div>
         <div className=" flex-1">
           <div className="flex justify-between">
               <p className="text-blue font-bold">{item.Parent.user}</p>
               <div className="bg-admin-green px-3 py-1 rounded-full text-xs font-medium  hidden md:block">
               <p className="text-white">{formatTime(item.Parent['created_at'])}</p>
   </div>
           </div>
           <div className="border-t-2 border-blue mt-2">
           <div className="my-2 text-blue font-bold">{item.Parent.title} {item.Parent.id}</div>
           </div>
           <div className="w-full h-full" dangerouslySetInnerHTML={{__html: item.Parent['content']}}/> 



           <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="w-full flex justify-between mt-4">
                <div></div>
         
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-light-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {open ? 'Cerrar' : 'Comentar'}
              </button>
         
              </Disclosure.Button>
              <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500 h-full">
          
              <CreateSubComment update={()=>setUpdate(update+1)} commentParent={item.Parent.id}/>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

          
           
         </div>
         
        </div>

        </Card>
        
          {item.Sons.map((it)=>(

          <Card className="p-5 mb-2 border-l-8 border-blue">
            <div>
              <p className="font-bold text-blue -mt-2 mb-2">Respuesta</p>
            </div>
          <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
          {item && item.subSon && item.subSon.avatar && item.subSon.avatar !== null ? 
          <>
        <img src={`http://localhost:8000${item.subSon.avatar}` } alt="tailwind logo" className="inline-block h-10 w-10 rounded-full" /></> :
      <>
      <img
             className="inline-block h-10 w-10 rounded-full"
             src={ProfileImg}
             alt=""
           /></>}
           </div>
           <div className=" flex-1">
             <div className="flex justify-between">
                 <p className="text-blue font-bold">{it.subSon.user}</p>
                 <div className="bg-admin-green px-3 py-1 rounded-full text-xs font-medium  hidden md:block">
                 <p className="text-white">{formatTime(it.subSon.created_at)}</p>
     </div>
             </div>
             <div className="border-t-2 border-blue mt-2">
             <div className="my-2 text-blue font-bold">{it.subSon.title}</div>
             </div>
             <div className="w-full h-full" dangerouslySetInnerHTML={{__html: it.subSon.content}}/> 

  
            
             
           </div>
           
          </div>
  
          </Card>
        ))}
        
        
        </>
      ))}

     


     <Card className="p-5">
        <CreateComment update={()=>setUpdate(update+1)}/>
     </Card>


  </div>


  

          </SideBar>


         

   </PageUser>

   
  );
}




const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
  });
  export default connect(mapStateToProps,{
  })(ForumViewStudent);
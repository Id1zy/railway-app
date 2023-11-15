// React Functions
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
//Functions
import { Link } from "react-router-dom";
//Components
import { Card, Typography } from "@material-tailwind/react";
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
//Others
import {index_maps} from "../../helpers/users_helpers";
import { StudentRoutes } from "../../helpers/users_routes";
import { getForum, deactivateForum } from "../../api/axiosForum";
import { PaginationWhite } from "../../components/users/pagination";


const ForumStudent = ({  user }) => {
  const [userData, setUserData] = useState('');
  const [forums, setForums] = useState([]);
  const [update, setUpdate] = useState(0);
  const [color, setColor] = useState(
    window.localStorage.getItem("color"));
  const params = useParams()

  const [page, setPage] = useState(1);
  const [forPage, setForPage] = useState(4);
  const max = forums.length / forPage


  useEffect(() => {
    async function loadForum() {
      try {
        const res = await getForum(params.uid);
        if (res && res.data) {
          setForums(res.data)
          console.log(res.data)

        }
      } catch (error) {
        console.error('Error al cargar los Foros:', error);
      }
    }
    loadForum();

    if (user) {
      setUserData(user);
    }
    
    return () =>{
      setUpdate(0);
      setForums([]);
    }

  }, [update]);

  const Style = {
    colorSchool :  `bg-new-${color}`,
  }



  

    return(
        <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'} >

          <SideBar  color={Style.colorSchool} userData={userData} useRol="Estudiante" mapeo={index_maps}>
            {/* Parte Central */}
           
            <div className="w-full md:w-3/5 bg-fondo p-4 h-full shadow-md overflow-y-auto"> 
     

              <Card className="w-full p-5 mb-2">
              
              <div class="flex justify-between overflow-hidden">
              <div className="flex items-center">
            <Link to={StudentRoutes.Subject}><ArrowLeftIcon className="inline-block h-6 w-6 mr-3 text-blue hover:text-white hover:rounded-full hover:bg-blue"/></Link>

        </div>
  <div className=" flex-grow p-2 text-center bg-background-blue rounded">
    <p className="text-blue font-bold">Foros</p>
  </div>
</div>

              </Card>
              {forums.length > 0 ? <></> : <>No Hay Foros aún.</>}
              {forums.slice((page-1)*forPage, (page-1)*forPage+forPage).map((item, index) => (
                <>
<Card className="mb-2" key={item.id}>
<div
		className="relative flex flex-col md:flex-row md:space-x-5 space-y-5 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
		<div className="w-full md:w-1/3 bg-white grid place-items-center">
    {item.thumbnail ? <>
        <img src={`http://localhost:8000${item.thumbnail}` } alt="thumbnail" className="rounded-xl w-[600px] h-[150px]" /></> :
      <>
      <img src={"https://media-front.elmostrador.cl/2020/07/IMG_0689.jpg"} alt="tailwind logo" className="rounded-xl" /></>}

    </div>
			<div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
				<div className="flex justify-between item-center">
        
					<div className="flex items-center">
          
					</div>
          <div className="inline-flex gap-2">
          <div className="bg-orange px-3 py-1 rounded-full text-xs font-medium  hidden md:block">
						<p className="text-white">{item.category}</p>
            </div>
          { item.status === 'publicado' ? <> <div className="bg-new-green px-3 py-1 rounded-full text-xs font-medium  hidden md:block">
						<p className="text-white">{item.status}</p>
            </div></> : <><div className="bg-admin-red px-3 py-1 rounded-full text-xs font-medium  hidden md:block">
						<p className="text-white">{item.status}</p>
            </div></>
          }
					
				</div>
          </div>

         <div>
         <h3 className="font-black text-blue md:text-3xl text-xl">{item.title}</h3>
				<p className="md:text-lg text-blue text-base">Descripción: {item.description}</p>
         </div>
        <div className="flex justify-end mt-4">
        <Link to={StudentRoutes.ForumView.replace(':uid', params.uid).replace(':forum', item.id)} className="bg-new-blue button_tech_colorless">Ingresar</Link>
        </div>
				
			</div>
		</div>
</Card>

 </>

))}
<PaginationWhite page={page} setPage={(n)=>setPage(n)} max={max}/>
 
  



  </div>

  <div className="w-1/5 hidden md:block h-full p-4 bg-fondo">
  <Card className="p-4 mb-2"> 
  <div className={`bg-new-blue rounded-md p-1 mb-1`}>
  <p className={`text-white font-bold text-center`}>Sugerencias</p>
  </div>
  
  {forums.filter((item)=> item.category=='sugerencias').slice(0,3).map((item)=>(<>
    <div className={` rounded-md border-x-2 mb-1 border-new-blue px-2`}>
  <Link to={StudentRoutes.ForumView.replace(':uid', params.uid).replace(':forum', item.id)} className={`font-bold text-new-blue text-sm hover:text-new-hblue`}>{item.title}</Link>
  </div>
  </>))}

  {forums.filter((item)=> item.category=='sugerencias').length > 0 ? <></>:<><p className={`text-center text-new-blue text-sm font-bold`}>Aún No Hay Foros.</p></>}
  
  </Card>
  <Card className="p-4 mb-2"> 
  <div className={`bg-new-blue rounded-md p-1 mb-1`}>
  <p className={`text-white font-bold text-center`}>Anuncios</p>
  </div>
  
  {forums.filter((item)=> item.category=='anuncios').slice(0,3).map((item)=>(<>
    <div className={` rounded-md border-x-2 mb-1 border-new-blue px-2`}>
  <Link to={StudentRoutes.ForumView.replace(':uid', params.uid).replace(':forum', item.id)} className={`font-bold text-new-blue text-sm hover:text-new-hblue`}>{item.title}</Link>
  </div>
  </>))}

  {forums.filter((item)=> item.category=='anuncios').length > 0 ? <></>:<><p className={`text-center text-new-blue text-sm font-bold`}>Aún No Hay Foros.</p></>}
  
  </Card>
  <Card className="p-4 mb-2"> 
  <div className={`bg-new-blue rounded-md p-1 mb-1`}>
  <p className={`text-white font-bold text-center`}>Off-Topic</p>
  </div>
  
  {forums.filter((item)=> item.category=='off-topic').slice(0,3).map((item)=>(<>
    <div className={` rounded-md border-x-2 mb-1 border-new-blue px-2`}>
  <Link to={StudentRoutes.ForumView.replace(':uid', params.uid).replace(':forum', item.id)} className={`font-bold text-new-blue text-sm hover:text-new-hblue`}>{item.title}</Link>
  </div>
  </>))}

  {forums.filter((item)=> item.category=='off-topic').length > 0 ? <></>:<><p className={`text-center text-new-blue text-sm font-bold`}>Aún No Hay Foros.</p></>}
  
  </Card>
  <Card className="p-4 mb-2"> 
  <div className={`bg-new-blue rounded-md p-1 mb-1`}>
  <p className={`text-white font-bold text-center`}>Discusión</p>
  </div>
  
  {forums.filter((item)=> item.category=='discusion').slice(0,3).map((item)=>(<>
    <div className={` rounded-md border-x-2 mb-1 border-new-blue px-2`}>
  <Link to={StudentRoutes.ForumView.replace(':uid', params.uid).replace(':forum', item.id)} className={`font-bold text-new-blue text-sm hover:text-new-hblue`}>{item.title}</Link>
  </div>
  </>))}

  {forums.filter((item)=> item.category=='discusion').length > 0 ? <></>:<><p className={`text-center text-new-blue text-sm font-bold`}>Aún No Hay Foros.</p></>}
  
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
  })(ForumStudent);
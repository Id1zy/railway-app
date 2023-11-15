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
import { StudentRoutes } from "../../helpers/users_routes";
import { useParams } from "react-router-dom";
import { formatTime} from "../../helpers/users_def";
import { getAssignment } from "../../api/axiosAssignment";




const AssignmentViewStudent = ({  user }) => {
  const [userData, setUserData] = useState('');
  const [assignment, setAssignment] = useState([]);

  const [update, setUpdate] = useState(0);
  const params = useParams()
  const ass_ = params.suid

  useEffect(() => {
    const getAssignment_ = async () =>{
        try{
            const res = await getAssignment(ass_)
            console.log(res.data)
            setAssignment(res.data)

        }catch(e){

        }
    }

    getAssignment_()

    return () => {
      setUpdate(0);

    }
  }, [update]);


 
    return(
        <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'} >

          <SideBar  color={'bg-blue'} userData={userData} useRol="Estudiante" mapeo={index_maps}>
            {/* Parte Central */}
           
            <div className="w-full md:w-4/5 bg-fondo p-4 h-full shadow-md overflow-y-auto"> 


  
<Card className="mb-2">
<div
		className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3  border border-white bg-white">
			<div className="w-full bg-white flex flex-col flex-grow  p-3">
        {/* TOPBAR */}
            <div className="flex justify-between item-center">
        <div className="flex items-center">
            <Link to={StudentRoutes.Assignments.replace(':uid', params.uid)}><ArrowLeftIcon className="h-6 w-6 text-blue hover:text-white hover:rounded-full hover:bg-blue"/></Link>
        </div>
<div className="inline-flex gap-2">

        <div className="bg-blue px-3 py-1 rounded-full text-xs font-medium  hidden md:block">
            <p className="text-white">{assignment ? formatTime(assignment.created_at): ''}</p>
</div>
    </div>
</div>
{/*Contenido */}
        <div className="w-full grid place-content-center">
        <h3 className="font-black text-blue md:text-3xl text-xl mb-3 mt-3">{assignment ? assignment.title : ''}</h3>
        <div className="text-left">
        {assignment ?  <div className="w-full" dangerouslySetInnerHTML={{__html: assignment.description}}/> : ''}
        </div>
        </div>

{/*BottomBar */}
        <div className="flex justify-between item-center">
        
        <div className="flex items-center">


           
        </div>
<div className="inline-flex gap-2">
<div className="bg-admin-green px-3 py-1 rounded-full text-sm font-bold  hidden md:block">
            <p className="text-white">Fecha Límite</p>
</div>
        <div className="bg-blue px-3 py-1 rounded-full text-sm font-bold  hidden md:block">
            <p className="text-white">{assignment ? formatTime(assignment.deadline): ''}</p>
</div>
    </div>
</div>	
			</div>
		</div>
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
  })(AssignmentViewStudent);
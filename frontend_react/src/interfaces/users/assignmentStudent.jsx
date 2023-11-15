// React Functions
import { useEffect, useState, useRef} from "react";
import { connect } from "react-redux";
//Components
import PageUser from "../../hocs/layouts/PageUser";
import SideBar from "../../components/users/sidebar";
import { StudentRoutes } from "../../helpers/users_routes";
// Images
import { index_maps } from "../../helpers/users_helpers";
import { CheckIcon, ArrowLeftIcon } from '@heroicons/react/20/solid'
import { Card } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { listAssignment } from "../../api/axiosAssignment";
import { formatTime } from "../../helpers/users_def";
import { PaginationWhite } from "../../components/users/pagination";



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const AssignmentsStudent= ({  user }) => {
  const [userData, setUserData] = useState('');
  const [update, setUpdate] = useState(0);
  const params = useParams();
  const [assList, setAss] = useState([]);
  const [color, setColor] = useState(
    window.localStorage.getItem("color"));
  const [page, setPage] = useState(1);
  const [forPage, setForPage] = useState(5);
  const max = assList.length / forPage




  useEffect(() => {
    const listAssignment_= async () =>{
      try{
        const res = await listAssignment(params.uid)
        setAss(res.data)
        

      }catch(e){}
    }

    listAssignment_()
    if (user) {
      setUserData(user);
    }

    return setUpdate(0);

  }, [update, user]);



    return(
        <PageUser color={'bg-white text-blue'} colorInput={'bg-white text-blue'} >

          <SideBar  color={`bg-new-${color}`} userData={userData} useRol="Estudiante" mapeo={index_maps}>
            {/* Parte Central */}
           
            <div className="w-full md:w-4/5 bg-fondo p-4 h-full shadow-md overflow-y-auto"> 
            <div className=''>
    <div className={`flex content-center items-center justify-between mx-2 my-6 border-b-4 pb-4 border-new-${color}`}>
    <div className="flex items-center">
            <Link to={StudentRoutes.Subject}><ArrowLeftIcon className={`h-6 w-6 text-new-${color} hover:text-white hover:rounded-full hover:bg-new-${color}`}/></Link>

        </div>
      <div className="min-w-0 flex-1">
        <h2 className={`text-xl2 sm:text-xl3 text-center font-bold leading-7 text-new-${color} `}>
          Trabajos Asignados
        </h2>
      </div>
      <div className="flex lg:ml-4 lg:mt-0">
      </div>
    </div>
    </div>



    <Card className="bg-white p-5">

    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {assList.slice((page-1)*forPage, (page-1)*forPage+forPage).map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== forPage - 1 ? (
                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-blue" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={classNames(
                      'bg-green-500',
                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                    )}
                  >
                    <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                      <Link to={StudentRoutes.ViewAssignments.replace(':uid', params.uid).replace(':suid', event.id)} className="font-medium text-new-blue hover:text-blue">
                      {event.title}{' '}
                      </Link>
                  </div>
                  <div className="inline-flex">

                  <div className="whitespace-nowrap inline-flex text-right text-sm text-gray-500">
       
                    <p className="flex font-bold text-new-green mr-2 items-center">Fecha Límite</p>
                    <div className="flex bg-new-green rounded-md px-2 items-center">
                    <time className="font-bold text-white" dateTime={event.deadline}>{formatTime(event.deadline)}</time>
                    </div>
                  
                  </div>
                  </div>
      
                </div>
              </div>
            </div>


          </li>
        ))}

      </ul>

    </div>
    </Card>
<PaginationWhite page={page} setPage={(n)=>setPage(n)} max={max}/>

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
  })(AssignmentsStudent);
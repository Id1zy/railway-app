// React imports
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Components
import PageUser from '../../../hocs/layouts/PageUser';
import SideBar from "../../../components/users/sidebar";

// Tailwind Components
import { Card, CardHeader, CardBody, CardFooter} from "@material-tailwind/react";

// SideBar Maps
import { guardian_maps } from "../../../helpers/users_helpers";
// Routes
import { GuardianRoutes } from "../../../helpers/users_routes";

// Redux imports
import { connect } from "react-redux";

// Functionalities
import { getStudentsOfGuardian } from "../../../api/axiosGuardian";


function Meetings({user}){
    const [userData, setUserData] = useState('');
    const [students, setStudents] = useState([]);

    useEffect(() => {
        if(user){
            setUserData(user);
        }

        const getStudentsRelated = async () => {
            try{
                const res = await getStudentsOfGuardian(user.id);
                console.log(res)
                if(res.data){
                    setStudents(res.data);
                }
            } catch(err){
                return err;
            }
        }

        getStudentsRelated();
    }, [user])

    return (
        <PageUser user={userData} color={'bg-white text-blue'}>
            <SideBar color={'bg-blue'} mapeo={guardian_maps} useRol='Apoderado'>
                <div className="container mx-auto px-6 py-10 bg-new-fondo">
                    <h2 className="text-5xl font-extrabold text-center text-blue mb-12">Mis Estudiantes</h2>
                    <div className="flex flex-col space-y-5">
                        {students.map((student) => (
                            <div key={student.id} className="bg-white rounded-xl shadow-md hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-2 p-6 border border-gray-300">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className=" inline-flex items-center text-2xl font-semibold text-white justify-center bg-indigo-500  rounded-full px-6 py-2 text-sm">{student.course_full_name}</h3>
                                        <p className="text-md text-blue mt-2">{student.full_name} - {student.student_rut}</p>
                                    </div>
                                    <Link
                                        to={GuardianRoutes.Teachers.replace(":stid", student.student_user_id)}
                                        className="inline-flex items-center justify-center text-white bg-indigo-500 hover:bg-indigo-600 rounded-full px-6 py-2 text-sm font-semibold transition-colors duration-300"
                                    >
                                        Ver reuniones
                                       <span className="ml-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </SideBar>
        </PageUser>
    );
} 
const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
})

export default connect(mapStateToProps, {})(Meetings);
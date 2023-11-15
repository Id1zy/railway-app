// React imports
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// Redux import
import { connect } from "react-redux";

// Maps SideBar
import { guardian_maps } from "../../../helpers/users_helpers";

// Components
import PageUser from "../../../hocs/layouts/PageUser";
import SideBar from "../../../components/users/sidebar";

// Tailwind components
import { Card, CardHeader, CardBody, CardFooter} from "@material-tailwind/react";

// HeroIcons
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

// Functionalities
import { getProfessorsOfStudent } from "../../../api/axiosGuardian";
import { GuardianRoutes } from "../../../helpers/users_routes";


function ProfessorsOfStudent({user}) {
    const [userData, setUserData] = useState('');
    const [professors, setProfessors] = useState([]);
    const params = useParams();

    useEffect(() => {
        if(user){
            setUserData(user);
        }

        const getProfessorsList = async () => {
            try{
                const res = await getProfessorsOfStudent(params.stid);
                if(res.data){
                    setProfessors(res.data);
                }
            } catch (err) {
                return err;
            }
        }

        getProfessorsList();
    }, [user])


    return (
        <>
            <PageUser user={userData} color={'bg-white text-blue'} colorInput={'bg-white text-blue'}>
                <SideBar color={'bg-blue'} mapeo={guardian_maps} useRol='Apoderado'>
                    <div className="container mx-auto px-6 py-10 bg-new-fondo">
                    <div className="flex justify-between items-center mb-12">
                            <Link to={GuardianRoutes.Meetings.replace(':stid', params.stid)} className="bg-indigo-600 rounded-lg text-white p-2">
                                <ArrowUturnLeftIcon className="h-5 w-5" />
                            </Link>
                            <h2 className="text-3xl font-extrabold text-blue">Profesores de mi estudiante</h2>
                            <div className="w-10 h-10"></div> 
                        </div>

                        <div className="flex flex-col space-y-5">
                            {professors && professors.map((item) => (
                                <div key={item.user} className="bg-white rounded-xl shadow-md hover:shadow-2xl transition duration-500 ease-in-out hover:-translate-y-2 p-6 border border-gray-300">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            {item.subjects.slice(0, 1).map((subject, index) => (
                                                <p key={index} className="text-md font-semibold text-white bg-admin-green mb-2 rounded-full px-3 py-1 inline-block">
                                                    {subject}
                                                </p>
                                            ))}
                                            <h3 className="text-2xl font-semibold text-blue">Profesor a cargo: {item.professor_name}</h3>
                                        </div>
                                        <Link
                                            to={GuardianRoutes.MeetRequest.replace(':puid', item.user).replace(':stid', params.stid)}
                                            className="inline-flex items-center justify-center text-white bg-indigo-500 hover:bg-indigo-600 rounded-full px-6 py-2 text-sm font-semibold transition-colors duration-300"
                                        >
                                            Solicitar reunión
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
        </>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
})

export default connect(mapStateToProps, {})(ProfessorsOfStudent);
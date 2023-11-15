// React imports
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from 'react-hook-form';

// Redux import
import { connect } from "react-redux";

// Maps SideBar
import { guardian_maps } from "../../../helpers/users_helpers";

// Components
import PageUser from "../../../hocs/layouts/PageUser";
import SideBar from "../../../components/users/sidebar";
// DatePicker Component
import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';


// Date setters
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';

// DatePicker Styles
import "react-datepicker/dist/react-datepicker.css";

// Tailwind components
import { Card, CardHeader, CardBody, CardFooter} from "@material-tailwind/react";



// Statics
import ProfileImg from '../../../assets/imagenes/ProfileImg.svg';

// Functionalities
import { getForMeetingRequest, makeMeetingRequest } from "../../../api/axiosGuardian";
import { GuardianRoutes } from "../../../helpers/users_routes";
import toast from "react-hot-toast";


function MeetingRequest({user, puid, stid, update}){

    // States
    const [userData, setUserData] = useState('');
    const [startDate, setStartDate] = useState(
        setHours(setMinutes(new Date(), 30), 8)
    );
    const [includeDates, setIncludeDates] = useState([]);
    const [professorDetails, setProfessorDetails] = useState({});

    registerLocale('es', es);


    // Handlers
    const handleChange = (date) => {
        setStartDate(date);
      }


    const handleColor = (time) => {
        return time.getHours() > 12 ? "text-green" : "text-red";
    }


    // Events
    const handleSubmit = () => {
        console.log(startDate)

        const day = startDate.getDate();
        const month = startDate.getMonth() + 1;
        const year = startDate.getFullYear();
        const hours = startDate.getHours();       
        const minutes = startDate.getMinutes();   

        const format = `${year}-${month}-${day}`
        const time = `${hours}:${minutes}`

        const response = async () => {
            try{
                const res = await makeMeetingRequest({
                        "date": format,
                        "time": time,
                        "guardianId": user.id,
                        "professorId": puid
                    });
                if(res.status === 200){
                    toast.success("Solicitud enviada correctamente")
                } 
            } catch (err) {
                if(err.response.status === 400){
                    toast.error("El horario ingresado no está disponible. Verifique nuevamente")
                }

                
            }
        }
        response();
        update();
    }



    useEffect(() => {
        if(user){
            setUserData(user);
        }

        const details = async () => {
            try{
                const res = await getForMeetingRequest(puid, stid);
                if(res.data){
                    setProfessorDetails(res.data[0])

                    let date_list = []
                    res.data[0].date_list.map((date) => (
                        date_list.push(new Date(`${date} GMT-4`))
                    ))

                    setIncludeDates(date_list)

                }
            } catch (err){
                return err;
            }
        }

        details();
    }, [user])

    return (
        <>
          <div className="flex w-full bg-new-fondo justify-center">
            <Card className="text-center w-5/6 mt-4 overflow-y-auto">
              <CardHeader className="flex flex-col">
                <h2 className="text-2xl font-bold text-blue">Información del profesor</h2>
              </CardHeader>
              <CardBody className="flex flex-wrap md:flex-nowrap w-full justify-center">
                <div className="flex flex-col w-full md:w-2/5 justify-center items-center lg:border-r-2 lg:border-r-indigo-600 p-4">
                  <img src={ProfileImg} alt="Perfil del profesor" className="rounded-full w-32 h-32 mb-4" />
                  <p className="text-lg mb-2">{professorDetails.professor_full_name}</p>
                </div>
                <div className="w-full md:w-2/5 text-left p-4">
                  <div className="mb-4">
                    <span className="text-xl font-semibold text-blue">Clases en común con su estudiante:</span>
                    <ul className="list-disc ml-10">
                      {professorDetails.subjects ? professorDetails.subjects.map((sName, index) => (
                        <li key={index}>{sName}</li>
                      )) : <li>Cargando...</li>}
                    </ul>
                  </div>
                  <div>
                    <span className="text-xl font-semibold text-blue">Horarios disponibles</span>
                    {professorDetails.available_details ? professorDetails.available_details.map((iterator, index) => (
                      <p key={index}>{iterator.day_of_week} de {iterator.start_time} a {iterator.end_time}</p>
                    )) : <></>}
                  </div>
                </div>
              </CardBody>
              <CardFooter className="p-4">
                <h2 className="text-xl font-semibold text-blue mb-3">Solicitar Reunión</h2>
                <p className="mb-4">Consulte aquí los horarios de disponibilidad del docente y solicite una reunión.</p>
                <div className="flex flex-col md:flex-row justify-center items-center md:space-x-4 w-full">
                  <div className="flex flex-wrap justify-center items-center mb-4 md:mb-0">
                    <p className="font-medium mr-2">Elija la fecha de reunión:</p>
                    <DatePicker
                      name="full_date"
                      className="rounded-lg"
                      dateFormat="dd/MM/yyyy h:mm aa"
                      locale="es"
                      selected={startDate}
                      onChange={handleChange}
                      showTimeSelect
                      timeIntervals={15}
                      minTime={setHours(setMinutes(new Date(), 30), 8)}
                      maxTime={setHours(setMinutes(new Date(), 30), 18)}
                      includeDates={includeDates}
                      timeClassName={handleColor}
                    />
                  </div>
                  <button onClick={handleSubmit} className="bg-new-green text-white font-semibold p-2 rounded-lg">
                    Enviar Solicitud
                  </button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </>
     )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
})

export default connect(mapStateToProps, {})(MeetingRequest);
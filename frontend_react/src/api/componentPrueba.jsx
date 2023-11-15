import { login } from "../redux/actions/auth"
import { useState, useEffect } from "react"
import { connect } from "react-redux";
import { getEvents } from "./axiosEvent";
import { addStudentsToCourseSections } from "./axiosStudentSection";


const ComponentePrueba = ({ login }) => {
  const [screen, setScreen] = useState(null);
  const [events, setEvents] = useState([]);

  const handleClick = async () => {
    try {
      const res = await getEvents();
      if (res && res.data) {
        setEvents(res.data);
        console.log('Eventos:', res.data);
      } else {
        console.error('Error obteniendo eventos:', res);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleAddStudents = async () => {
    const course_id = "1";  
    const studentsList = ["345456-2",];  

    try {
      const res = await addStudentsToCourseSections(course_id, studentsList);
      if (res && res.data) {
        console.log('Estudiantes añadidos:', res.data);
      } else {
        console.error('Error añadiendo estudiantes:', res);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {

  }, []);

  return (
    <>
      pruebaaa

      <button className="button_tech" onClick={handleClick}>Cargar Eventos</button>
      <button className="button_tech" onClick={handleAddStudents}>Añadir Estudiantes al Curso</button>

      <div>
        {Array.isArray(events) && events.map(event => (
          <div key={event.id}>
            <p>{event.title}</p> 
          </div>
        ))}
      </div>

    </>
  )
}

const mapStateToProps = state => ({
  loading: state.Auth.loading,
  auth: state.Auth.isAuthenticated,
  rol: state.Auth.rol
});

export default connect(mapStateToProps, {
  login,
})(ComponentePrueba);

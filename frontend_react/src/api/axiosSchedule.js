import axios from "axios";
const apiUrl = process.env.REACT_APP_BACKEND_URL;
//Obtener Horarios
export const getSchedule = async () => {
  const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
  };
  
  try {
      const response = await axios.get(`${apiUrl}/api/schedule/schedules/`, config);
      return response;
  } catch (error) {
      console.error('Error al obtener los Horarios:', error);
      throw error;
  }

}
//Crear horarios
export const createSchedule = async (datos) => {
  const config = {
    headers: {
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
    }
  };

  const data = {
    datos:datos
  };
  try {
    const res = await axios.post(`${apiUrl}/api/schedule/schedules/`, data, config);
    return res;
  } catch (err) {
    console.error('Error al crear el horario:', err);
    throw err;
  }
};


//Editar Horarios
export const updateSchedule = async (scheduleId, updatedScheduleData) => {
  const config = {
    headers: {
      'Authorization': `JWT ${localStorage.getItem('access')}`,
      'Accept': 'application/json'
    }
  };

  const data = {
    section: updatedScheduleData.section_id,
    start_time_block: updatedScheduleData.start_time_block,
    end_time_block: updatedScheduleData.end_time_block,
    day_of_week: updatedScheduleData.day_of_week,
    // Agrega más campos según sea necesario
  };

  try {
    const res = await axios.patch(`${apiUrl}/api/schedule/schedules/${scheduleId}/`, data, config);
    return res;
  } catch (err) {
    console.error('Error al editar el horario:', err);
    throw err;
  }
};

//Desactivar Horarios 

export const desactivateSchedule = async (scheduleId) => {
  const config = {
    headers: {
      'Authorization': `JWT ${localStorage.getItem('access')}`,
      'Accept': 'application/json'
    }
  };

  try {
    const res = await axios.delete(`${apiUrl}/api/schedule/schedules/${scheduleId}/`, config);
    console.log('Horario desactivado con éxito:', res.data);
    return res;
  } catch (err) {
    console.error('Error al desactivar el horario:', err);
    throw err;
  }
};

export const activateSchedule = async (scheduleId) => {
  try {
    const response = await axios.put(`/api/schedules/${scheduleId}/activate`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getListSection = async () => {
  const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
  };
  
  try {
      const response = await axios.get(`${apiUrl}/api/schedule/section/list/`, config);
      return response;
  } catch (error) {
      throw error;
  }

}

export const postSchedule = async (scheduleId, datos) => {
  const config = {
    headers: {
      'Authorization': `JWT ${localStorage.getItem('access')}`,
      'Accept': 'application/json'
    }
  };

  const data = {
    datos:datos
  };

  try {
    const res = await axios.post(`${apiUrl}/api/schedule/section/${scheduleId}/create/`, data, config);
    return res;
  } catch (err) {
    console.error('Error al Crear el horario:', err);
    throw err;
  }
};

export const getBlockSchedule = async (section_id) => {
  const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
  };
  
  try {
      const response = await axios.get(`${apiUrl}/api/schedule/section/${section_id}/list/`, config);
      return response;
  } catch (error) {
      console.error('Error al obtener los Bloques de Horarios:', error);
      throw error;
  }

}
import axios from "axios";
const apiUrl = process.env.REACT_APP_BACKEND_URL;
// GET
export const getGrades = async (section_id) => {

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            
        }
    };
    try {
        const res = await axios.get(`${apiUrl}/api/grades/listado/${section_id}/`, config);
        return res;
    } catch (err) {
        console.error("Error asdsadasda:", err.response ? err.response.data : err.message);
        return null; // o puede manejar el error como considere necesario
    }
  };
  
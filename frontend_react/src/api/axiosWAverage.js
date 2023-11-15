import axios from 'axios';
const apiUrl = process.env.REACT_APP_BACKEND_URL;
// GET
export const getAllWAverage = async () => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try{
        const res = await axios.get(`${apiUrl}/api/w-average/list/`, config);
        if(res.data && res.data.results){
            return res;
        }
    } catch(err) {
        return err;
    }
} 
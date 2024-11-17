import axios from 'axios';
async function login(email, password) {
    try
    {
        const URL = "http://localhost:80/api";
        const data = {email, password}
        console.log("OK");
       return axios.post(URL,data);
    
    }
    catch (error) {
        console.error("Login failed:", error.response ? error.response.data : error);
        throw error;
    }
}
export default login;
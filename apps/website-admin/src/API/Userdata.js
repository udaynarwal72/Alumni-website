import axios from 'axios';

export async function getuserData() {
    try {
        const response = await axios.get('http://localhost:3000/api/v1/user/findalumni');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

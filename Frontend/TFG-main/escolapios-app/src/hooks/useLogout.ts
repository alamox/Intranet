import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useSession from '../hooks/useSession';

const useLogout = () => {
    const navigate = useNavigate();
    const [, setIsLogged] = useSession(); 

    const logout = async () => {
        try {
            await axios.post('http://localhost:8080/api/logout');
            setIsLogged(false); 
            navigate('/login'); 
            window.location.reload();
        } catch (error) {
            console.error('Error logging out', error);
        }
    };

    return logout;
};

export default useLogout;

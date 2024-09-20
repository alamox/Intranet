import { useState, useEffect } from 'react';
import axios from 'axios';

const useSession = () => {
    const [isLogged, setIsLogged] = useState<Boolean | null>(null);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axios.post('http://localhost:8080/api/checkSession');
                if (response.status === 200) {
                    setIsLogged(true);
                } else {
                    setIsLogged(false);
                }
            } catch (error) {
                setIsLogged(false);
            }
        };

        checkSession();
    }, []);

    return [isLogged, setIsLogged] as const;
};

export default useSession;

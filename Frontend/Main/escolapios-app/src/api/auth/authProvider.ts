const authProvider = async () => {
    try {
        const response = await fetch('api/checkSession', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const isAuthenticated = await response.json();
            return isAuthenticated;
        } else {
            throw new Error('Failed to check session');
        }
    } catch (error) {
        console.error(error);
        return false;
    }
};

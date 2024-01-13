import Cookies from 'js-cookie';


export const userInfo = async () => {
    try {
        const token = Cookies.get('token');

        if (!token) {
            throw new Error('Token not found');
        }

        const response = await fetch('http://127.0.0.1:8000/users/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Fetching user info failed', error);
        throw error;
    }
};
import Cookies from "js-cookie";


export const addYarnStash = async (brand, blend, hook_size, weight, length, photo) => {
    try {
        const token = Cookies.get('token');

        if (!token) {
            throw new Error('Token not found');
        }
        console.log(brand, blend, hook_size, weight, length, photo)

        const response = await fetch('http://127.0.0.1:8000/yarn_stash', {
            method: 'POST', 
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({brand, blend, hook_size, weight, length, photo})
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch(error) {
        console.error('Adding yarn stash failed', error);
        throw error;
    }
};

export const getYarnStash = async () => {
    try { 
        const token = Cookies.get('token');
        if (!token) {
            throw new Error('Token not found');
        }
        const response = await fetch('http://127.0.0.1:8000/yarn_stash', {
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
        console.error('Getting user projects failed', error);
        throw error;
    }
};
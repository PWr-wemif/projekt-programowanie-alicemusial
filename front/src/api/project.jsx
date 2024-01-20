import Cookies from "js-cookie";

export const createProject = async (title, project_image, description, pattern_url, is_public, materials) => {
    try {
        const token = Cookies.get('token');

        if (!token) {
            throw new Error('Token not found');
        }

        const response = await fetch('http://127.0.0.1:8000/project', {
            method: 'POST', 
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title, project_image, description, pattern_url, is_public, materials})
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Login failed', error);
        throw error;
    }
};

export const getPrivateProjects = async () => {
    try {
        const token = Cookies.get('token');

        if (!token) {
            throw new Error('Token not found');
        }

        const response = await fetch('http://127.0.0.1:8000/project', {
            method: 'GET', 
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Login failed', error);
        throw error;
    }
}

export const getPublicProjects = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/project/public', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching public projects', error);
        throw error;
    }

}
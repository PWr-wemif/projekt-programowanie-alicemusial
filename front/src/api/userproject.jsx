import Cookies from 'js-cookie';

export const addUserProject = async (project_id) => {
    try {
        const token = Cookies.get('token');
        if (!token) {
            throw new Error('Token not found');
        }

        const response = await fetch(`http://127.0.0.1:8000/user_project/${project_id}`, {
            method: 'POST',
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
        console.error('Adding user project failed', error);
        throw error;
    }
};

export const getUserProjects = async () => {
    try { 
        const token = Cookies.get('token');
        if (!token) {
            throw new Error('Token not found');
        }
        const response = await fetch('http://127.0.0.1:8000/user_project/', {
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

export const updateProjectStatus = async (id, status) => {
    try { 
        const token = Cookies.get('token');
        if (!token) {
            throw new Error('Token not found');
        }
        console.log(id,status)
        const response = await fetch('http://127.0.0.1:8000/user_project/', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id, status})
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Updating user projects failed', error);
        throw error;
    }
}
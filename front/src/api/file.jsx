export const uploadFile = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file); 

        const response = await fetch('http://127.0.0.1:8000/file/', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('File upload failed', error);
        throw error;
    }
};
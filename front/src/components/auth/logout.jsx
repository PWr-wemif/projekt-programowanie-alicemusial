import { useCallback } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
    const navigate = useNavigate();

    const logout = useCallback(() => {
        Cookies.remove('token');
        window.location.reload();
        navigate('/');
    }, [navigate]);

    return logout;
};
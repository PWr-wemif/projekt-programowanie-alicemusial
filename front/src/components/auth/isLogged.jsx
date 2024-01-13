import Cookies from 'js-cookie';

const isLogged = () => {
    const token = Cookies.get('token');
    const isLoggedIn = token ? true : false;
    return { isLoggedIn };
};

export default isLogged;
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import isLogged from './isLogged';

export const ProtectedRoute = ({ element: Component }) => {
    const { isLoggedIn } = isLogged();

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    return Component;
};

ProtectedRoute.propTypes = {
    element: PropTypes.elementType.isRequired,
};

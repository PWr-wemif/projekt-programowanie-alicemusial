import PropTypes from "prop-types";

const useAuth = () => {
    const isLoggedIn = true;
    return { isLoggedIn };
};

const ProtectedComponent = ({ children }) => {
    const { isLoggedIn } = useAuth();
    if (isLoggedIn) {
        return null;
    }
    return <>{children}</>;
};

ProtectedComponent.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedComponent;


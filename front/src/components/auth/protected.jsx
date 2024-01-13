import PropTypes from "prop-types";
import isLogged from "./isLogged";


const ProtectedComponent = ({ children }) => {
    const { isLoggedIn } = isLogged();
    if (!isLoggedIn) {
        return null;
    }
    return <>{children}</>;
};

ProtectedComponent.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedComponent;


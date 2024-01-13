import PropTypes from "prop-types";
import isLogged from "./isLogged";

const UnprotectedComponent = ({ children }) => {
    const { isLoggedIn } = isLogged()
    if (isLoggedIn) {
        return null;
    }
    return <>{children}</>
}

UnprotectedComponent.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UnprotectedComponent;

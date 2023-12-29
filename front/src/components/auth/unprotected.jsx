import PropTypes from "prop-types";

const useAuth = () => {
    const isLoggedIn = false;
    return { isLoggedIn };
};

const UnprotectedComponent = ({ children }) => {
    const { isLoggedIn } = useAuth()
    if (isLoggedIn) {
        return null;
    }
    return <>{children}</>
}

UnprotectedComponent.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UnprotectedComponent;

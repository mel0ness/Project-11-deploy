import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { connected } from '../../Utils/Selectors';

function PrivateRouteNotConected({ children }) {
    const connectedValidation = useSelector(connected);
    
    if (!connectedValidation) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/"/>
    }

    // authorized so return child components
    return children;
}

export default PrivateRouteNotConected;
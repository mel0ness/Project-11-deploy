import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userName } from '../../Utils/Selectors';

function PrivateRouteConected({ children }) {
    const connectedValidation = useSelector(userName);
    
    if (connectedValidation) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/"/>
    }

    // authorized so return child components
    return children;
}

export default PrivateRouteConected;
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute= ({ element }) => {
    const session = Cookies.get('token');
    return !session ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
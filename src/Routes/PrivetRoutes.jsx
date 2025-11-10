import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Loadding from '../Components/Loadding';
import { Navigate, useLocation,} from 'react-router';

const PrivetRoutes = ({children}) => {
    const {user,loading}= use(AuthContext)
    const location =useLocation();

    if(loading){
        return <Loadding/>
    }

    if(user){
        return children
    }

    return <Navigate state={location?.pathname} to={'/login'}></Navigate>
};

export default PrivetRoutes;
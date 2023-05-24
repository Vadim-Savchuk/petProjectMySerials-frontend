import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
    const isAuth = window.localStorage.getItem('token');

    return (
        isAuth ? <Outlet /> : <Navigate to='/login' />
    );
}

export default PrivateRoute;
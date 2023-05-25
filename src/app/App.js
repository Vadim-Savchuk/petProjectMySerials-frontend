import { useEffect }   from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { getMe } from '../redux/auth/authSlice';

import Layout       from "../components/loyout/Layout";
import HomePage     from '../pages/home/HomePage';
import LoginPage    from '../pages/login/LoginPage';
import RegisterPage from '../pages/register/RegisterPage';
import PrivateRoute from '../components/private-route/PrivateRoute';
import NotFoundPage from '../pages/404/NotFoundPage';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch]);

    return (
        <BrowserRouter>
        {/* <BrowserRouter basename='/petProjectMySerials-frontend/'> */}
            <Layout>
                <Routes>
                    
                    <Route element={<PrivateRoute />}>
                        <Route path='/' element={<HomePage />} />
                    </Route>
                    <Route element={<PrivateRoute />}>
                        <Route path='*' element={<NotFoundPage />} />
                    </Route>

                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;

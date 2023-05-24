import { Link, useNavigate }        from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { checkIsAuth, logout } from '../../redux/auth/authSlice';

import useMessageActions from '../../hooks/useMessageActions';

import './Header.scss';

import logo from './img/logo.png';

function Header() {
    const isAuth = useSelector(checkIsAuth);

    const { user } = useSelector(state => state.auth);
    const username = user && user.username;

    const addMessageFunc = useMessageActions();

    const dispath = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispath(logout())
        window.localStorage.removeItem('token')
        navigate('/login')
        addMessageFunc('Ви вийшли')
    }

    return (
        <header className='header'>
            <div className='header__box'>
                <Link to='/'><img src={logo} alt='Serials logo' className='header_logo' /></Link>

                {isAuth && <div className='header_user-name'>{username}</div>}
            </div>

            {isAuth
                ? <button className='header_button' onClick={logoutHandler}>Вийти</button>
                : <Link className='link-login' to='/login'>Увійти</Link>
            }
        </header>
    );
}

export default Header;

import { useEffect, useState }      from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate }        from 'react-router-dom';

import { loginUser } from '../../redux/auth/authSlice';

import useMessageActions from '../../hooks/useMessageActions';

import './LoginPage.scss';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const addMessageFunc = useMessageActions();

    const { status } = useSelector(state => state.auth);
    const dispatch   = useDispatch();
    const navigate   = useNavigate();

    const handleSubmit = () => {
        try {
            if(username && password) {
                return dispatch(loginUser({ username, password }));
            }

            addMessageFunc('Переконайтесь що ви заповнили всі поля правильно')
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (status) {
            addMessageFunc(status)
        }
        if (localStorage.getItem('token')) {
            navigate('/')
        }
    }, [status]);

    return (
        <div className='auth'>

            <h2 className='title'>Авторизація</h2>

            <form className='form' onSubmit={e => e.preventDefault()}>
                <input
                    type="text"
                    value={username}
                    placeholder='Login'
                    onChange={e => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    value={password}
                    placeholder='Password'
                    onChange={e => setPassword(e.target.value)}
                />

                <div className='form_buttons'>
                    <button className='button' onClick={handleSubmit}>Увійти</button>
                    <Link to='/register'>Немаю акаунта</Link>
                </div>

            </form>
        </div>
    );
}

export default LoginPage;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { registerUser } from '../../redux/auth/authSlice';

import useMessageActions from '../../hooks/useMessageActions';

import './RegisterPage.scss';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const addMessageFunc = useMessageActions();

    const { status } = useSelector(state => state.auth);
    const dispatch   = useDispatch();
    const navigate   = useNavigate();

    const handleSubmit = () => {
        try {
            if (username.length >= 4 && password.length >= 4) {
                dispatch(registerUser({ username, password }))

                setUsername('')
                setPassword('')
            }

            addMessageFunc("Логін та пароль мають бути неменше 4 символів")
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

    useEffect(() => {
        addMessageFunc("У нас покищо не реалізовано функції відновлення пароля, тому будь ласка, запам'ятайте або запишіть свій пароль. У разі, якщо ви його забудете, відновити доступ до акаунта буде неможливо.")
    }, []);

    return (
        <div className='auth'>

            <h2 className='title'>Реєстрація</h2>

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
                    <button className='button' onClick={handleSubmit}>Зберегти</button>
                    <Link to='/login'>Я вже маю акаунт</Link>
                </div>

            </form>
        </div>
    );
}

export default RegisterPage;

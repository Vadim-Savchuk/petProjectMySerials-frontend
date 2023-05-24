import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../utils/axios';

const initialState = {
    user: null,
    token: null,
    status: null,
    isLiading: false,
}

// Register User
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ password, username }) => {
        try {
            const { data } = await axios.post('/auth/register', {
                username,
                password,
            });

            if (data.token) {
                window.localStorage.setItem('token', data.token);
            }

            return data;
        } catch (error) {
            console.log('Сталась помилка при реєстарції користувача у функції registerUser: ' + error);
        }
    }
)

// Login User
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ password, username }) => {
        try {
            const { data } = await axios.post('/auth/login', {
                username,
                password,
            });

            if (data.token) {
                window.localStorage.setItem('token', data.token);
            }

            return data;
        } catch (error) {
            console.log('Сталась помилка при авторизації користувача у функції loginUser: ' + error);
        }
    }
)

// Get user
export const getMe = createAsyncThunk(
    'auth/getMe',
    async () => {
        try {
            const { data } = await axios.get('/auth/me');

            return data;
        } catch (error) {
            console.log('Сталась помилка при перевірці користувача у функції getMe: ' + error);
        }
    }
)


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.status = null
            state.isLiading = false
        }
    },
    extraReducers: {
        // Register user
        [registerUser.pending]: (state => {
            state.isLiading = true
            state.status = null
        }),
        [registerUser.fulfilled]: ((state, action) => {
            state.isLiading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        }),
        [registerUser.rejected]: ((state, action) => {
            state.isLiading = false
            state.status = action.payload.message
        }),
        // Login user
        [loginUser.pending]: (state => {
            state.isLiading = true
            state.status = null
        }),
        [loginUser.fulfilled]: ((state, action) => {
            state.isLiading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        }),
        [loginUser.rejected]: ((state, action) => {
            state.isLiading = false
            state.status = action.payload.message
        }),
        // Get user
        [getMe.pending]: (state => {
            state.isLiading = true
            state.status = null
        }),
        [getMe.fulfilled]: ((state, action) => {
            state.isLiading = false
            state.status = null
            state.user = action.payload?.user
            state.token = action.payload?.token
        }),
        [getMe.rejected]: ((state, action) => {
            state.isLiading = false
            state.status = action.payload.message
        }),
    },
}) 

export const checkIsAuth = (state => {
    return Boolean(state.auth.token)
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;
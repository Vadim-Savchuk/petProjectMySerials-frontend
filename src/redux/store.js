import { configureStore } from '@reduxjs/toolkit';

import authSlice    from './auth/authSlice';
import serialSlice  from './serial/serialSlice';
import messageSlice from './message/messageSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        serial: serialSlice,
        message: messageSlice,
    }
})
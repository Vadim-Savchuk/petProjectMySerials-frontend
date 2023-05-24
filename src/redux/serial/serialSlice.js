import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
    serials: [],
    loading: false,
}

// Add new serial
export const addSerial = createAsyncThunk(
    'serial/addSerial',
    async (params) => {
        try {
            const { data } = await axios.post('/serials/add', params)

            return data;
        } catch (error) {
            console.log('Сталась помилка при додавані нового серіалу у функції addSerial: ' + error);
        }
    }
)

// Get my serials
export const getMyAllSerials = createAsyncThunk(
    'serial/getMyAllSerials',
    async () => {
        try {
            const { data } = await axios.get('/serials/user/me');

            return data;
        } catch (error) {
            console.log('Сталась помилка при додавані нового серіалу у функції getMyAllSerials: ' + error);
        }
    }
)

// Remove serials
export const removeSerial = createAsyncThunk(
    'serial/removeSerial',
    async (id) => {
        try {
            const { data } = await axios.delete(`/serials/${id}`, id);

            return {
                id,
                data,
            };
        } catch (error) {
            console.log('Сталась помилка при видалені серіалу у функції getMyAllSerials: ' + error);
        }
    }
)

// Update serials
export const updateSerial = createAsyncThunk(
    'serial/editSerial',
    async (updatedSerial) => {
        try {
            const { data } = await axios.put(`/serials/${updatedSerial.id}`, updatedSerial);

            return data;
        } catch (error) {
            console.log('Сталась помилка при редагувані серіалу у функції updateSerial: ' + error);
        }
    }
)

export const serialSlice = createSlice({
    name: 'serial',
    initialState,
    reducers: {},
    extraReducers: {
        // Add new serial
        [addSerial.pending]: (state => {
            state.loading = true
        }),
        [addSerial.fulfilled]: ((state, action) => {
            state.loading = false
            state.serials.push(action.payload)
        }),
        [addSerial.rejected]: ((state) => {
            state.loading = false
        }),
        //  Get my serials
        [getMyAllSerials.pending]: (state => {
            state.loading = true
        }),
        [getMyAllSerials.fulfilled]: ((state, action) => {
            state.loading = false
            state.serials = action.payload
        }),
        [getMyAllSerials.rejected]: ((state) => {
            state.loading = false
        }),
        //  Remove serials
        [removeSerial.pending]: (state => {
            state.loading = true
        }),
        [removeSerial.fulfilled]: ((state, action) => {
            state.loading = false
            state.serials = state.serials.filter(serial => {
                return serial._id !== action.payload.id
            })
        }),
        [removeSerial.rejected]: ((state) => {
            state.loading = false
        }),
        //  Update serials
        [updateSerial.pending]: (state => {
            state.loading = true
        }),
        [updateSerial.fulfilled]: ((state, action) => {
            state.loading = false
            const index = state.serials.findIndex(serial => serial._id === action.payload._id)
            state.serials[index] = action.payload;
        }),
        [updateSerial.rejected]: ((state) => {
            state.loading = false
        }),
    },
})


export default serialSlice.reducer;
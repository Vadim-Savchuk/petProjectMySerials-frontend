import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: []
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload)
        },
        removeMessage: (state, action) => {
            const messageIndex = state.messages.findIndex(message => message === action.payload);
            if (messageIndex !== -1) {
                state.messages.splice(messageIndex, 1);
            }
        },
    }
})

export const { addMessage, removeMessage } = messageSlice.actions;
export default messageSlice.reducer;




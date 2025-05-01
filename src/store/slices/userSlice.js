import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuthenticated: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log('Setting user in Redux:', action.payload);
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    }
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer; 
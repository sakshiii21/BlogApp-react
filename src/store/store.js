import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';

const store = configureStore({
    reducer:{
        auth: authSlice,
        // Add more reducers here( TODO, ETC)
    }
});

export default store;
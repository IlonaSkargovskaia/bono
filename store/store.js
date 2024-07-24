import { configureStore } from '@reduxjs/toolkit';
import causesReducer from './slices/causesSlice';

const store = configureStore({
    reducer: {
        causes: causesReducer
    }
});

export default store;
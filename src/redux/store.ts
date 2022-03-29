
import { configureStore } from '@reduxjs/toolkit';
import { dogsApi } from './dogsApi';

export const store = configureStore({
    reducer: {
        [dogsApi.reducerPath]: dogsApi.reducer,
    },
    middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(dogsApi.middleware)
});



import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import cartSlice from './slices/cartSlice';
import pizzaSlice from './slices/pizzaSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
    reducer: { filter: filterReducer, cart: cartSlice, pizza: pizzaSlice },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = ()=> useDispatch<AppDispatch>();
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export type SearchPizzaParams = {
    categoryId: number;
    sort: SortType;
    searchValue?: string;
    rtProperty: string;
};

type SortType = {
    name: string;
    sortProperty: 'rating' | 'title' | 'price';
};
type FetchPizzaProps = {
    categoryId: number;
    sort: SortType;
    searchValue: string;
};

export const fetchPizza = createAsyncThunk(
    'pizzas/fetchPizzaStatus',
    async ({ categoryId, sort, searchValue }: FetchPizzaProps) => {
        const { data } = await axios.get<Pizza[]>(
            `https://66af6590b05db47acc59bae8.mockapi.io/items?${
                categoryId > 0 ? `category=${categoryId}` : ''
            }&sortBy=${sort.sortProperty}&order=asc&search=${searchValue}`,
        );

        return data;
    },
);

export type Pizza = {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: string[];
    rating?: number;
    count?: number;
};

interface PizzaSliceState {
    items: Pizza[];
    isLoading: Status;
}

const initialState: PizzaSliceState = {
    items: [],
    isLoading: Status.LOADING,
};

const pizzaSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizza.fulfilled, (state, action) => {
            state.isLoading = Status.SUCCESS;
            state.items = action.payload;
        });
        builder.addCase(fetchPizza.rejected, (state) => {
            state.isLoading = Status.ERROR;
            state.items = [];
        });
        builder.addCase(fetchPizza.pending, (state) => {
            state.isLoading = Status.LOADING;
            state.items = [];
        });
    },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;

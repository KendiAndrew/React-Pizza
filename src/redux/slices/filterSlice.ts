import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListType } from '../../components/Menu/MenuSort';

export interface FilterSliceState {
    searchValue: string;
    categoryId: number;
    sort: ListType;
}

const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    sort: {
        name: 'популярности',
        sortProperty: 'rating',
    },
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setSortType(state, action: PayloadAction<ListType>) {
            state.sort = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            state.categoryId = Number(action.payload.categoryId);
            state.sort = action.payload.sort;
        },
    },
});

export const { setCategoryId, setSortType, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;

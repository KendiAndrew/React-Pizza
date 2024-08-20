import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { calcTotalCount } from '../../utils/getTotalCount';

export type CartItem = {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    sizes: number;
    count: number;
};
export interface CartSliceState {
    totalPrice: number;
    items: CartItem[];
    totalCount: Array<number>;
}

const cartData = getCartFromLS();

const initialState: CartSliceState = {
    totalPrice: cartData.totalPrice,
    items: cartData.items,
    totalCount: cartData.totalCount,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<CartItem>) {
            const findItems = state.items.find(
                (obj) =>
                    obj.id === action.payload.id &&
                    obj.sizes === action.payload.sizes &&
                    obj.type === action.payload.type,
            );
            if (!findItems) {
                state.items.push({ ...action.payload, count: 1 });
            } else {
                if (findItems.id == action.payload.id) {
                    findItems.count++;
                }
            }
            state.totalPrice = calcTotalPrice(state.items);
            state.totalCount = calcTotalCount(state.items);
        },
        removeItems(state, action: PayloadAction<number>) {
            state.items = state.items.filter((obj) => {
                if (obj.id === action.payload) {
                    state.totalPrice = state.totalPrice - obj.price * obj.count;
                    state.totalCount = calcTotalCount(state.items);
                    return false;
                }
                return true;
            });
        },
        minusItem(state, action: PayloadAction<number>) {
            const findItems = state.items.find((obj) => obj.id === action.payload);
            if (findItems) {
                findItems.count--;
                state.totalPrice = state.totalPrice - findItems.price;
                state.totalCount = calcTotalCount(state.items);
                if (findItems.count === 0) {
                    state.items = state.items.filter((obj) => obj.id !== action.payload);
                }
            }
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
            state.totalCount = [];
        },
    },
});

export const { addProduct, removeItems, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;

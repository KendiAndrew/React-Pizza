import { CartItem } from '../redux/slices/cartSlice';

export const calcTotalPrice = (items: CartItem[]) => {
    return items.reduce((sum: number, obj: CartItem) => {
        return sum + obj.price * obj.count;
    }, 0);
};

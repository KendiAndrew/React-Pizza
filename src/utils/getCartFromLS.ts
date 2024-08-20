import { CartSliceState } from '../redux/slices/cartSlice';
import { calcTotalPrice } from './calcTotalPrice';
import { calcTotalCount } from './getTotalCount';

export const getCartFromLS = (): CartSliceState => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(items);
    const totalCount = calcTotalCount(items, items.id);

    return {
        items,
        totalPrice,
        totalCount,
    };
};

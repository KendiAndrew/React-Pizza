import { CartItem } from '../redux/slices/cartSlice';

export const calcTotalCount = (items: CartItem[]): Array<number> => {
    const maxId = items.reduce((max, pizza) => Math.max(max, pizza.id), 0);

    const result = Array(maxId + 1).fill(0);

    items.forEach((pizza) => {
        result[pizza.id] += pizza.count;
    });

    return result;
};

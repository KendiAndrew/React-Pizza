import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, CartItem } from '../../redux/slices/cartSlice';
import { RootState } from '../../redux/store';
const typeNames = ['тонкое', 'традиционное'];

type PizzaBlockProps = {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: string[];
};
const PizzaBlockPart: React.FC<PizzaBlockProps> = ({
    id,
    title,
    price,
    imageUrl,
    sizes,
    types,
}) => {
    const addedCount = useSelector((state: RootState) => {
        return state.cart.totalCount[id];
    });

    const onClickAdd = () => {
        const item: CartItem = {
            id,
            title,
            price,
            imageUrl,
            type: typeNames[active],
            sizes: sizes[activeSize],
            count: 0,
        };
        dispath(addProduct(item));
    };
    const dispath = useDispatch();
    const [active, setActive] = useState(0);
    const [activeSize, setActiveSize] = useState(0);
    return (
        <>
            <h4 className='pizza-block__title'>{title}</h4>
            <div className='pizza-block__selector'>
                <ul>
                    {types.map((_, i: number) => (
                        <li
                            className={active === i ? 'active' : ''}
                            key={i}
                            onClick={() => setActive(i)}
                        >
                            {typeNames[i]}
                        </li>
                    ))}
                </ul>
                <ul>
                    {sizes.map((size, i: number) => (
                        <li
                            className={activeSize === i ? 'active' : ''}
                            key={size}
                            onClick={() => setActiveSize(i)}
                        >
                            {size} см
                        </li>
                    ))}
                </ul>
            </div>
            <div className='pizza-block__bottom'>
                <div className='pizza-block__price'>от {price} грн</div>
                <button onClick={onClickAdd} className='button button--outline button--add'>
                    <svg
                        width='12'
                        height='12'
                        viewBox='0 0 12 12'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                            fill='white'
                        />
                    </svg>
                    <span>Добавить</span>
                    {addedCount > 0 && <i>{addedCount}</i>}
                </button>
            </div>
        </>
    );
};
export default PizzaBlockPart;

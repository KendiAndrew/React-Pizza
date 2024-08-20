import { useEffect, useState } from 'react';
import '../scss/app.scss';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { PizzaBlockLoader } from '../components/Menu/PizzaBlockLoader';
import PizzaBlockPart from '../components/MainContent/PizzaBlockPart';
import { Pizza } from '../redux/slices/pizzaSlice';

const PizzaItem = () => {
    const [pizza, setPizza] = useState<Pizza | undefined>(undefined);
    const { id } = useParams();

    useEffect(() => {
        async function GetPizza() {
            try {
                const { data } = await axios.get<Pizza>(
                    'https://66af6590b05db47acc59bae8.mockapi.io/items/' + id,
                );
                setPizza(data);
            } catch (error) {}
        }
        GetPizza();
    }, []);

    return (
        <div className='container'>
            <div className='pizza-block__item'>
                <div>
                    {!pizza ? (
                        <PizzaBlockLoader />
                    ) : (
                        <div>
                            <img className='pizza-block__image' src={pizza.imageUrl} />
                            <div>
                                <PizzaBlockPart
                                    id={pizza.id}
                                    title={pizza.title}
                                    price={pizza.price}
                                    imageUrl={pizza.imageUrl}
                                    sizes={pizza.sizes}
                                    types={pizza.types}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <div className='cart__bottom-buttons item'>
                    <Link to='/' className='button button--outline button--add go-back-btn'>
                        <svg
                            width='8'
                            height='14'
                            viewBox='0 0 8 14'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M7 13L1 6.93015L6.86175 1'
                                stroke='#D3D3D3'
                                strokeWidth='1.5'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                        <span>Вернуться назад</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PizzaItem;

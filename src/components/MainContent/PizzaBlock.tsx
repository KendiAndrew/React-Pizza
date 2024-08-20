import React from 'react';
import '../../scss/app.scss';
import { Link } from 'react-router-dom';
import PizzaBlockPart from './PizzaBlockPart';

type PizzaBlockProps = {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    type: string[];
};
const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, title, price, imageUrl, sizes, type }) => {
    return (
        <div className='pizza-block-wrapper'>
            <div className='pizza-block'>
                <Link to={`/pizza/${id}`}>
                    <img className='pizza-block__image' src={imageUrl} alt='Pizza' />
                </Link>
                <div>
                    <PizzaBlockPart
                        id={id}
                        title={title}
                        price={price}
                        imageUrl={imageUrl}
                        sizes={sizes}
                        types={type}
                    />
                </div>
            </div>
        </div>
    );
};

export default PizzaBlock;

import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import '../scss/app.scss';
import PizzaBlock from '../components/MainContent/PizzaBlock';
import Categories from '../components/Menu/MenuCategories';
import { list, MenuSort } from '../components/Menu/MenuSort';
import { PizzaBlockLoader } from '../components/Menu/PizzaBlockLoader';
import { Search } from '../components/Search';

import { useSelector } from 'react-redux';
import { setCategoryId, setFilters } from '../redux/slices/filterSlice';
import { fetchPizza, SearchPizzaParams } from '../redux/slices/pizzaSlice';
import { RootState, useAppDispatch } from '../redux/store';

export function Home() {
    const { categoryId, sort, searchValue } = useSelector((state: RootState) => state.filter);
    const { items, isLoading } = useSelector((state: RootState) => state.pizza);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isSearch = useRef(false);
    const isLoad = useRef(false);

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(
                window.location.search.substring(3),
            ) as unknown as SearchPizzaParams;
            const sort = list.find((item) => item.sortProperty === params.rtProperty);
            dispatch(
                setFilters({
                    searchValue: '',
                    categoryId: params.categoryId,
                    sort: sort || list[0],
                }),
            );
            isSearch.current = true;
        }
    }, []);

    const axiosPizza = async () => {
        dispatch(fetchPizza({ categoryId, sort, searchValue }));
        window.scroll(0, 0);
    };

    useEffect(() => {
        window.scroll(0, 0);
        if (!isSearch.current) {
            axiosPizza();
        }
        isSearch.current = false;
    }, [categoryId, sort, searchValue]);

    useEffect(() => {
        if (isLoad.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
            });
            navigate(`?${queryString}`);
        }
        isLoad.current = true;
    }, [categoryId, sort, searchValue]);

    return (
        <>
            <div className='content__top'>
                <Categories
                    value={categoryId}
                    setCategoryId={(id: number) => dispatch(setCategoryId(id))}
                />
                <MenuSort />
            </div>
            <div className='content__title-top '>
                <h2>Все пиццы</h2>
                <Search />
            </div>
            {isLoading === 'error' ? (
                <div className='content__empty'>Пицца не найдена😕</div>
            ) : (
                <div className='content__items'>
                    {isLoading === 'loading'
                        ? [...new Array(6)].map((_, index) => <PizzaBlockLoader key={index} />)
                        : items.map((obj) => (
                              <PizzaBlock
                                  key={obj.id}
                                  id={obj.id}
                                  title={obj.title}
                                  price={obj.price}
                                  imageUrl={obj.imageUrl}
                                  sizes={obj.sizes}
                                  type={obj.types}
                              />
                          ))}
                </div>
            )}
        </>
    );
}

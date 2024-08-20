import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import './scss/app.scss';
import { Cart } from './pages/Cart';
import PizzaItem from './pages/PizzaItem';

export function App() {
    return (
        <>
            <div className='wrapper'>
                <Header />
                <div className='content'>
                    <div className='container'>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/cart' element={<Cart />} />
                            <Route path='/pizza/:id' element={<PizzaItem />} />
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
}

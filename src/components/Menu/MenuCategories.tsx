import '../../scss/app.scss';

type CategoriesProps = {
    value: number;
    setCategoryId: (i:number) => void;
};

export const Categories: React.FC<CategoriesProps> = ({
    value,
    setCategoryId,
}: CategoriesProps) => {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return (
        <div className='categories'>
            <ul>
                {categories.map((item, i) => (
                    <li
                        key={i}
                        onClick={() => setCategoryId(i)}
                        className={value === i ? 'active' : ''}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Categories;

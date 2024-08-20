import cl from './NotFoundBlock.module.scss';

export function NotFoundBlock() {
    return (
        <>
            <h1 className={cl.main}>
                <span>😕</span>
                <br />
                Ничего не найдено
            </h1>
        </>
    );
}

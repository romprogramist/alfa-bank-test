import { FunctionComponent } from 'react';
import filterStyles from './Filter.module.sass';

interface IFilter {
    likedSelector: boolean,
    handleLikedSelector: () => void
}

const Filter: FunctionComponent<IFilter> = 
({ likedSelector, handleLikedSelector }) => {

    return (
        <button className={filterStyles.green} onClick={() => handleLikedSelector()}>
            {likedSelector ? 'Показать все' : 'Показать только лайкнутые'}
        </button>
    )
}

export default Filter;
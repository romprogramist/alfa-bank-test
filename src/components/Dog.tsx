import { FunctionComponent } from 'react';
import { Dog } from '../types';
import dogStyles from './Dog.module.sass';

interface IDogCard {
    id: number,
    img: string,
    name: string,
    like: boolean,
    handleDeleteDog: (id: number) => void,
    handleUpdateDog: (dog: Dog) => void
}

const DogCard: FunctionComponent<IDogCard> = (
    {id, img, name, like, handleDeleteDog, handleUpdateDog}
    ) => {
    return (
        <li>            
            <div>
                <img src={img} alt={`собака по имени ${name}`} />
            </div>            
            <div className={dogStyles.buttons}>
                <p>{name}</p>
                <button className={like ? `${dogStyles.like} ${dogStyles.liked}` : dogStyles.like} onClick={() => handleUpdateDog({id, img, name, like} as Dog)}>♡</button>                
                <button className={dogStyles.delete} onClick={() => handleDeleteDog(id)}>Delete</button>
            </div>
        </li>
    )
}

export default DogCard;
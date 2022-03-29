import appStyles from './App.module.sass';
import { useGetDogsQuery, useUpdateDogMutation, useDeleteDogMutation } from './redux'
import { Dog } from './types';
import DogCard from './components/Dog';
import Filter from './components/Filter'
import { useState } from 'react';
import { dogsApi } from './redux/dogsApi'

function App() {

  const [likedSelector, setLikedSelector] = useState(false);

  const {data = [], isLoading} = useGetDogsQuery();
  const [deleteDog] = useDeleteDogMutation();
  const [updateDog] = useUpdateDogMutation();

  const handleDeleteDog = async (id: number) => {
    await deleteDog(id).unwrap();
  }

  const handleUpdateDog = async (dog: Dog) => {
    await updateDog({id: dog.id, like: !dog.like}).unwrap();
  }

  const getDogsQueryRefetch = dogsApi.endpoints.getDogs.useQuerySubscription().refetch;

  const handleLikedSelector = () => {
    setLikedSelector(!likedSelector);
    getDogsQueryRefetch();
  }

  if (isLoading) return <h1>Loading...</h1>

  const dogs = data.filter(d => likedSelector ? d.like : true).map(({id,img,name,like}) => (<DogCard
    key={id}
    id={id} 
    img={img} 
    name={name} 
    like={like} 
    handleDeleteDog={handleDeleteDog} 
    handleUpdateDog={handleUpdateDog} />));

  return (
    <div className={appStyles.App}>
      <Filter likedSelector={likedSelector}
        handleLikedSelector={handleLikedSelector}/>
      <div>
        <ul>
          {dogs}
        </ul>
      </div>
    </div>
  );
}

export default App;

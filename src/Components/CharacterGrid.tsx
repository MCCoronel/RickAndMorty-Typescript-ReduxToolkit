import { useGetCharacterCollection } from "./customHooks/useCharacter";
const CharacterGrid = () => {
    
  //Ejecutar la action: fetchCXharacterCollecgtion
  //Traer el estado del loader y del error
  //Renderizar los personajes

  const { collection, isLoading, isError , collectionError} = useGetCharacterCollection();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{collectionError}</h2>;
  }

  return (
    <>
      {collection.map((character) => {
        return (
          <div key={character.id}>
            <h2>{character.name}</h2>
            <h3>
              {character.status} — {character.species}
            </h3>
            <img src={character.image} alt={`Photo of ${character.name}`} />
            <h3>Last known location: {character.lastKnownLocation}</h3>
            <h3>First seen in: {character.firstSeenIn}</h3>
          </div>
        );
      })}
    </>
  );
};

export default CharacterGrid;

import { useOptimistic, useTransition } from 'react';
import { Planet } from '../../interfaces/planet.interface';
import { updatePlanetAction } from '../../actions/update-planet.action';

interface Props {
  planets: Planet[];
}

export const PlanetList = ({ planets }: Props) => {

  const [isPending, startTransition] = useTransition();

  const[optimisticPlanets, setOptimisticNewPlanets] = useOptimistic(
    planets,
    (current , newPlanet: Planet) => {

      const updatedPlanets = current.map(
        (planet) => planet.id === newPlanet.id ? newPlanet : planet
      )
      return updatedPlanets;
    }
     
  );

  const handleUpdatedPlanet = async (planet: Planet) =>{

    startTransition( async() => {

      const data = {
        ...planet,
        name: planet.name.toUpperCase()
      }

       try {
         
        setOptimisticNewPlanets(data)
        const updatedPlanet = await updatePlanetAction(data);
        setOptimisticNewPlanets(updatedPlanet);


      } catch (error) {
        setOptimisticNewPlanets(planet)
        console.log(error)
      }
    });

    
  };
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-fadeIn">
      {optimisticPlanets.map((planet) => (
        <div key={planet.id} className="p-4 bg-gray-100 rounded shadow">
          <h2 className="text-xl font-semibold">{planet.name}</h2>
          <p className="text-gray-700">{planet.type}</p>
          <p className="text-gray-700">{planet.distanceFromSun}</p>

          <br />
          <button 
            className='bg-blue-500 text-white font-semibold p-2 rounded w-full'
            onClick={ () => handleUpdatedPlanet(planet)}
          >
            Actualizar
          </button>
        </div>
      ))}
    </div>
  );
};

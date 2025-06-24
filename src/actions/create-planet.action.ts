import { planetsApi } from "../api/planetsApi";
import { Planet } from "../interfaces/planet.interface";


export const createPlanetAction = async (planet: Partial<Planet>) => {
  try {
    const response = await planetsApi.post<Planet>('/', planet)

    return response.data;

  } catch (error) {
    console.log(error);
    return error;
  }
}

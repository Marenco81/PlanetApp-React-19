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
};

export const createPlanetActionForm = async (
    prevState: unknown,
    queryData: FormData
) => {

    const formData = Object.fromEntries(queryData.entries());
  try {
    const response = await planetsApi.post<Planet>('/', formData);

    return response.data;

  } catch (error) {
    console.log(error);
    throw new Error('No se puedo crear planeta');
    // return null;
  }
};

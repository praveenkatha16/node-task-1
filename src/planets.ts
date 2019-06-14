import axios, { AxiosError } from "axios";
import { Planet } from "./models/planet";
const PLANETS_API_URL = "https://swapi.co/api/planets";

async function printPlanetNames(start = 1, end = 10) {
  if (end < start) {
    throw new Error("End should be greater than start");
  }

  const totalCount = end - start + 1;
  const planetIds = Array.from({ length: totalCount }).map(
    (_, index) => index + start
  );

  printPlanetNamesInSequence(planetIds);
}

async function printPlanetNamesInSequence(planetIds: number[]) {
  const planetsData = await Promise.all(
    planetIds.map(planetId => getPlanetData(planetId))
  );
  planetsData.forEach(({ planet, planetId, error }) => {
    if (planet) {
      console.log(`Planet #${planetId}: ${planet.name}`);
    } else if (error) {
      console.log(
        `Planet #${planetId}: Error fetching data: ${error.message}`
      );
    }
  });
}

function getErrorMessage(errorStatus: number) {
  switch (errorStatus) {
    case 404:
      return "Planet id not found";
    case 400:
      return "Invalid request";
  }
  return "Server Error";
}

async function getPlanetData(planetId: number) {
  try {
    const { data: planet } = await axios.get<Planet>(
      `${PLANETS_API_URL}/${planetId}`
    );
    return { planet, planetId };
  } catch ({ code, response }) {
    let errorMessage = "Unknown Error";
    if (response) {
      const { status } = response;
      errorMessage = getErrorMessage(status);
    } else if (code === "ENOTFOUND") {
      errorMessage = "Network Error";
    }
    return { error: { message: errorMessage }, planetId };
  }
}

export default printPlanetNames;

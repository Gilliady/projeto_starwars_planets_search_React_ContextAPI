const fetchStarwarsData = async () => {
  const response = await fetch('https://swapi.dev/api/planets');
  const data = await response.json();
  const filtredData = data.results.map((planet) => {
    delete planet.residents;
    return planet;
  });
  return filtredData;
};
export default fetchStarwarsData;

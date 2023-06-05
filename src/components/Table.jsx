import React, { useContext } from 'react';
import planetsContext from '../contexts/planetsContext';
import Loading from './Loading';

export default function Table() {
  const { state } = useContext(planetsContext);
  const { planets, filters } = state;
  const { planetName,
  } = filters;
  let filtredPlanets = planets.filter((planet) => (planet.name.toLowerCase()
    .includes(planetName.toLowerCase())));
  Object.keys(filters).forEach((key) => {
    if (key === 'planetName' || filters[key].comparison === '') return;
    filtredPlanets = filtredPlanets.filter((planet) => {
      const { value, comparison } = filters[key];
      switch (comparison) {
      case 'maior que':
        return Number(planet[key]) > Number(value);
      case 'menor que':
        return Number(planet[key]) < Number(value);
      case 'igual a':
        return Number(planet[key]) === Number(value);
      default:
        return planet;
      }
    });
  });
  return (
    planets.length === 0 ? <Loading /> : (
      <table>
        <thead>
          <tr>
            {Object.keys(planets[0]).map((key) => (
              <th key={ key }>{key.toUpperCase().replace('_', ' ')}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtredPlanets.map((planet) => (
            <tr key={ planet.name }>
              {Object.values(planet).map((value) => (
                <td key={ value }>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>)
  );
}

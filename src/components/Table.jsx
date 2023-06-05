import React, { useContext } from 'react';
import planetsContext from '../contexts/planetsContext';
import Loading from './Loading';

export default function Table() {
  const { state } = useContext(planetsContext);
  const { planets, filters, sort, sorted } = state;
  const { planetName,
  } = filters;
  let filtredPlanets = planets.filter((planet) => (planet.name.toLowerCase()
    .includes(planetName.toLowerCase())));
  Object.keys(filters).forEach((key) => {
    if (filters[key].comparison === '') return;
    filtredPlanets = filtredPlanets.filter((planet) => {
      const { value, comparison } = filters[key];
      switch (comparison) {
      case 'maior que':
        return +(planet[key]) > +(value);
      case 'menor que':
        return +(planet[key]) < +(value);
      case 'igual a':
        return +(planet[key]) === +(value);
      default:
        return planet;
      }
    });
  });

  filtredPlanets.sort((a, b) => {
    if (!sorted) {
      return 0;
    }
    if (a[sort.column] === 'unknown') return 1;
    if (b[sort.column] === 'unknown') return +'-1';
    if (sort.sort === 'ASC') {
      return +a[sort.column] - +b[sort.column];
    }
    return +b[sort.column] - +a[sort.column];
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
              {Object.values(planet).map((value, i) => (
                <td
                  data-testid={ `${i === 0 && 'planet-name'}` }
                  key={ value }
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>)
  );
}

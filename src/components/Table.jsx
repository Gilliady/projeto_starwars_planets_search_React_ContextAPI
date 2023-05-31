import React, { useContext } from 'react';
import planetsContext from '../contexts/planetsContext';
import Loading from './Loading';

export default function Table() {
  const { state } = useContext(planetsContext);
  const { planets, filters } = state;
  return (
    planets.length === 0 ? <Loading /> : (
      <table>
        <thead>
          <tr>
            {Object.keys(planets[0]).map((key) => (
              <th key={ key }>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {planets
            .filter(({ name }) => name.toLowerCase().includes(filters
              .planetName))
            .map((planet) => (
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

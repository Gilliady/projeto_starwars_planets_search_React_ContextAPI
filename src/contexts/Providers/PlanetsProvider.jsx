import PropTypes from 'prop-types';
<<<<<<< HEAD
import React, { useEffect, /* useMemo */ useState } from 'react';
=======
import React, { useEffect, useState } from 'react';
>>>>>>> 9aaee66
import planetsContext from '../planetsContext';
import fetchStarwarsData from '../../services/fetchStarWarsData';

const INITIAL_STATE = {
  planets: [],
<<<<<<< HEAD
  planetName: '',
  filters: {
=======
  filters: {
    planetName: '',
>>>>>>> 9aaee66
    diameter: { value: 0, comparison: '' },
    orbital_period: { value: 0, comparison: '' },
    population: { value: 0, comparison: '' },
    rotation_period: { value: 0, comparison: '' },
    surface_water: { value: 0, comparison: '' },
  },
<<<<<<< HEAD
  sort: { column: 'population', sort: 'ASC' },
  sorted: false,
=======
>>>>>>> 9aaee66
};
export default function PlanetsProvider({ children }) {
  const [state, setState] = useState(INITIAL_STATE);

  const updateState = (planets) => {
    setState({ ...INITIAL_STATE, planets });
  };

  useEffect(() => {
    const fetchPlanets = async () => {
      const planets = await fetchStarwarsData();
      updateState(planets);
    };
    fetchPlanets();
  }, []);
<<<<<<< HEAD
  /* const memorizedPlanets = useMemo(() => ({ planets: state.planets }), [state.planets]);
  setState({ ...state, planets: memorizedPlanets.planets }); */

=======
>>>>>>> 9aaee66
  return (
    <planetsContext.Provider value={ { state, setState } }>
      {children}
    </planetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;

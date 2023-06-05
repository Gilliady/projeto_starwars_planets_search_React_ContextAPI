import PropTypes from 'prop-types';
import React, { useEffect, /* useMemo */ useState } from 'react';
import planetsContext from '../planetsContext';
import fetchStarwarsData from '../../services/fetchStarWarsData';

const INITIAL_STATE = {
  planets: [],
  planetName: '',
  filters: {
    diameter: { value: 0, comparison: '' },
    orbital_period: { value: 0, comparison: '' },
    population: { value: 0, comparison: '' },
    rotation_period: { value: 0, comparison: '' },
    surface_water: { value: 0, comparison: '' },
  },
  sort: { column: 'population', sort: 'ASC' },
  sorted: false,
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
  /* const memorizedPlanets = useMemo(() => ({ planets: state.planets }), [state.planets]);
  setState({ ...state, planets: memorizedPlanets.planets }); */

  return (
    <planetsContext.Provider value={ { state, setState } }>
      {children}
    </planetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;

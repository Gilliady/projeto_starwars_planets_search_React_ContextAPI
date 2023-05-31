import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import planetsContext from '../planetsContext';
import fetchStarwarsData from '../../services/fetchStarWarsData';

export default function PlanetsProvider({ children }) {
  const INITIAL_STATE = {
    planets: [],
    filters: {
      planetName: '',
    },
  };
  const [state, setState] = useState(INITIAL_STATE);

  const updateState = (planets) => {
    setState({ ...state, planets });
  };

  useEffect(() => {
    const fetchPlanets = async () => {
      const planets = await fetchStarwarsData();
      updateState(planets);
    };
    fetchPlanets();
  }, []);
  return (
    <planetsContext.Provider value={ { state, setState } }>
      {children}
    </planetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;

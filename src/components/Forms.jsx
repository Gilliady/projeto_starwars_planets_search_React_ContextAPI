import React, { useContext } from 'react';
import planetsContext from '../contexts/planetsContext';

export default function Forms() {
  const { state, setState } = useContext(planetsContext);
  const { filters } = state;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, filters: { ...filters, [name]: value } });
  };

  return (
    <form>
      <input
        data-testid="name-filter"
        name="planetName"
        onChange={ handleChange }
        placeholder="Insira o nome do planeta"
      />
    </form>
  );
}

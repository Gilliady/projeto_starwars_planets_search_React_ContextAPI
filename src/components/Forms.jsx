import React, { useContext, useState } from 'react';
import planetsContext from '../contexts/planetsContext';

export default function Forms() {
  const { state, setState } = useContext(planetsContext);
  const { filters } = state;
  const {
    population,
    orbital_period: orbitalPeriod,
    diameter,
    rotation_period: rotationPeriod,
    surface_water: surfaceWater } = filters;

  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);

  const [sort, setSort] = useState({ column: 'population', sort: 'ASC' });

  const filterClick = () => {
    setState({
      ...state,
      filters: {
        ...filters,
        [columnFilter]: {
          value: valueFilter,
          comparison: comparisonFilter,
        },
      },
    });
    setColumnFilter('');
    setComparisonFilter('maior que');
    setValueFilter(0);
  };

  const removeFilter = (filter) => {
    setState({
      ...state,
      filters: {
        ...filters,
        [filter]: { value: 0, comparison: '' },
      },
    });
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };

  return (
    <form>
      <input
        data-testid="name-filter"
        name="planetName"
        onChange={ handleChange }
        placeholder="Insira o nome do planeta"
      />

      <select
        name="column-filter"
        data-testid="column-filter"
        onClick={ ({ target: { value } }) => setColumnFilter(value) }
      >
        {population.comparison.length === 0
          && <option value="population">population</option>}
        {orbitalPeriod
          .comparison.length === 0
            && <option value="orbital_period">orbital_period</option>}
        {rotationPeriod.comparison.length === 0
          && <option value="rotation_period">rotation_period</option>}
        {diameter.comparison.length === 0
          && <option value="diameter">diameter</option>}
        {surfaceWater.comparison.length === 0
          && <option value="surface_water">surface_water</option>}
      </select>

      <select
        name="comparison-filter"
        data-testid="comparison-filter"
        onChange={ ({ target: { value } }) => setComparisonFilter(value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        data-testid="value-filter"
        onChange={ ({ target: { value } }) => setValueFilter(value) }
        name="value-filter"
        value={ valueFilter }
        type="number"
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ filterClick }
        disabled={ columnFilter === '' }
      >
        Filtrar
      </button>
      { Object.keys(filters)
        .filter((filter) => filter !== 'planetName' && filters[filter].comparison !== '')
        .map((filter) =>
          /* if (filter === 'planetName') {
            return null;
          } */
          (
            <div
              data-testid="filter"
              key={ filter }
            >
              {`${filter}: ${filters[filter].value} ${filters[filter].comparison}`}
              <button type="button" onClick={ () => { removeFilter(filter); } }>X</button>
            </div>
          )) }
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ () => {
          setState({ ...state,
            filters: {
              population: { value: 0, comparison: '' },
              orbital_period: { value: 0, comparison: '' },
              diameter: { value: 0, comparison: '' },
              rotation_period: { value: 0, comparison: '' },
              surface_water: surfaceWater,
              planetName: '' } });
        } }
      >
        Limpar
      </button>
      <select
        data-testid="column-sort"
        selected={ sort.column }
        onChange={ ({ target: { value } }) => { setSort({ ...sort, column: value }); } }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <label htmlFor="ASC">Ascendente</label>
      <input
        value="ASC"
        type="radio"
        name="sort"
        id="ASC"
        checked={ sort.sort === 'ASC' }
        onChange={ () => setSort({ ...sort, sort: 'ASC' }) }
        data-testid="column-sort-input-asc"
      />
      <label htmlFor="DESC">Descendente</label>
      <input
        value="DESC"
        checked={ sort.sort === 'DESC' }
        onChange={ () => setSort({ ...sort, sort: 'DESC' }) }
        type="radio"
        name="sort"
        id="DESC"
        data-testid="column-sort-input-desc"
      />
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => { setState({ ...state, sort, sorted: true }); } }
      >
        Ordenar
      </button>
    </form>
  );
}

import { createContext } from 'react';

const planetsContext = createContext({ planets: [], filters: {} });

export default planetsContext;

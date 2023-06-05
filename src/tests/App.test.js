import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import mockData from './helpers/mockData';
import PlanetsProvider from '../contexts/Providers/PlanetsProvider';
import { act } from 'react-dom/test-utils';

describe('I am your test', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockData),
      });
      
      act(() => {
        render(<PlanetsProvider><App /></PlanetsProvider>);
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('testando requisição na API', async () => {
    
    await waitFor(() => expect(screen.getByText('Tatooine')).toBeInTheDocument(), { timeout: 3000 });
  });
});

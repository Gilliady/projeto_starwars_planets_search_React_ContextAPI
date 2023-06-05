import React from 'react';
import { findByText, queryByText, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import mockData from './helpers/mockData';
import PlanetsProvider from '../contexts/Providers/PlanetsProvider';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

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
  it('Testando Renderização da tabela e filtro por nome', async () => {
    
    await screen.findByText('Tatooine');
    expect(fetch).toHaveBeenCalled();
    
    const nameInput = screen.getByRole('textbox');
    act(() => {
      userEvent.type(nameInput, 'Hoth');
    });
    expect(nameInput).toHaveValue('Hoth');
    expect(screen.queryByText('Tatooine')).not.toBeInTheDocument();
    screen.getByText('Hoth');
    expect(screen.getAllByRole('row')).toHaveLength(2);
    act(() => {
      userEvent.clear(nameInput);
    });
    expect(nameInput).toHaveValue('');
    expect(screen.getAllByRole('row')).toHaveLength(11);
  });

  it('Testando filtro por coluna, comparação e valor', async () => {
    const [columnSelect, comparisonSelect] = screen.getAllByRole('combobox');
    const [valueInput] = screen.getAllByRole('spinbutton');
    const filterButton = screen.getByRole('button', { name: 'Filtrar' });
    userEvent.selectOptions(columnSelect, 'diameter');
    userEvent.selectOptions(comparisonSelect, 'maior que');
    userEvent.type(valueInput, '12000');
    
    act(() => {
      userEvent.click(filterButton);
    });
    expect(screen.getAllByRole('row')).toHaveLength(6);
    screen.getByText('Alderaan');
    screen.getByText('Bespin');
    screen.getByText('Coruscant');
    screen.getByText('Naboo');
    screen.getByText('Kamino');
    userEvent.selectOptions(columnSelect, 'population');
    userEvent.selectOptions(comparisonSelect, 'menor que');
    userEvent.type(valueInput, '4500000000');
    act(() => {
      userEvent.click(filterButton);
    });
    expect(screen.getAllByRole('row')).toHaveLength(4);
    screen.getByText('Alderaan');
    screen.getByText('Bespin');
    screen.getByText('Kamino');
    userEvent.selectOptions(columnSelect, 'orbital_period');
    userEvent.selectOptions(comparisonSelect, 'igual a');
    userEvent.type(valueInput, '5110');
    act(() => {
      userEvent.click(filterButton);
    });
    expect(screen.getAllByRole('row')).toHaveLength(2);
    screen.getByText('Bespin');
    const clearFilterButton = screen.getByRole('button', { name: 'Limpar' });
    const removeSingleButtons = screen.getAllByRole('button', { name: 'X' });
    expect(removeSingleButtons).toHaveLength(3);
    act(() => {
      userEvent.click(removeSingleButtons[1]);
    });
    expect(screen.getAllByRole('row')).toHaveLength(4);
    screen.getByText('Alderaan');
    screen.getByText('Bespin');
    screen.getByText('Kamino');
    expect(screen.getAllByRole('button', { name: 'X' })).toHaveLength(2);
    act(() => {
      userEvent.click(clearFilterButton);
    });
    expect(screen.getAllByRole('row')).toHaveLength(11);
    expect(screen.queryAllByRole('button', { name: 'X' })).toHaveLength(0);
  });
  it('Testando ordenação', async () => {
    
    await screen.findByText('Tatooine');
    expect(screen.getAllByRole('row')).toHaveLength(11);
    const [,,columnSelect] = screen.getAllByRole('combobox');
    const orderAsc = screen.getByRole('radio', {  name: /ascendente/i});
    const orderDesc = screen.getByRole('radio', {  name: /descendente/i});
    const orderButton = screen.getByRole('button', { name: 'Ordenar' });
    userEvent.selectOptions(columnSelect, 'population');
    userEvent.click(orderDesc);
    expect(orderAsc).not.toBeChecked();
    userEvent.click(orderAsc);
    expect(orderDesc).not.toBeChecked();
    act(() => {
      userEvent.click(orderButton);
    });
    expect(screen.getAllByRole('row')).toHaveLength(11);
    const rows = screen.getAllByRole('row');
    expect(rows[1].children[0].innerHTML).toBe('Yavin IV');
    expect(rows[10].children[0].innerHTML).toBe('Dagobah');
    userEvent.click(orderDesc);
    expect(orderAsc).not.toBeChecked();
    act(() => {
      userEvent.click(orderButton);
    });
    expect(screen.getAllByRole('row')).toHaveLength(11);
    const newRows = screen.getAllByRole('row');
    expect(newRows[1].children[0].innerHTML).toBe('Coruscant');
    expect(newRows[10].children[0].innerHTML).toBe('Dagobah');
  });
});

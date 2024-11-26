import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';

global.fetch = jest.fn();

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays random acronym on component mount', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ result: 'TEST' })
      })
    );

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Your lucky acronym today is TEST')).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('/random_acronym');
  });

  test('handles error when fetching random acronym fails', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Failed to fetch'))
    );

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Your lucky acronym today is An error occurred while fetching a random acronym.')).toBeInTheDocument();
    });
  });

  test('generates new random acronym when button is clicked', async () => {
    // First render with initial acronym
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ result: 'FIRST' })
      })
    );

    // Second fetch for when button is clicked
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ result: 'SECOND' })
      })
    );

    render(<Home />);

    // Wait for initial acronym
    await waitFor(() => {
      expect(screen.getByText('Your lucky acronym today is FIRST')).toBeInTheDocument();
    });

    // Click the generate button
    const generateButton = screen.getByText('Generate New Acronym');
    generateButton.click();

    // Wait for new acronym
    await waitFor(() => {
      expect(screen.getByText('Your lucky acronym today is SECOND')).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenLastCalledWith('/random_acronym');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
}); 
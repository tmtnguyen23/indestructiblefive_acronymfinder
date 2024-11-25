import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchBox from './SearchBox';
import SearchResult from './SearchResult';

describe('SearchBox Component', () => {
  it('calls onSearch with the correct query when the Search button is clicked', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBox onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search acronym...');
    const button = screen.getByText('Search');

  
    fireEvent.change(input, { target: { value: '2FA' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('2FA');
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it('updates the input value when the user types', () => {
    render(<SearchBox onSearch={jest.fn()} />);

    const input = screen.getByPlaceholderText('Search acronym...');
    fireEvent.change(input, { target: { value: 'HTML' } });
    expect(input).toHaveValue('HTML');
  });

  it('handles empty search query', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBox onSearch={mockOnSearch} />);

    const button = screen.getByText('Search');
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('');
  });

});

describe('SearchResult Component', () => {
  it('renders search results when results are available', () => {
    const results = ['HTML', '2FA', 'BAC'];
    render(<SearchResult results={results} hasSearched={true} />);

    results.forEach((result) => {
      expect(screen.getByText(result)).toBeInTheDocument();
    });
    expect(screen.queryByText('No results found.')).not.toBeInTheDocument();
  });

  it('shows "No results found" when no results are available', () => {
    render(<SearchResult results={[]} hasSearched={true} />);

    expect(screen.getByText('No results found.')).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('renders nothing if a search has not been performed', () => {
    render(<SearchResult results={[]} hasSearched={false} />);

    expect(screen.queryByText('No results found.')).not.toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('handles a single result correctly', () => {
    render(<SearchResult results={['NASA']} hasSearched={true} />);

    expect(screen.getByText('NASA')).toBeInTheDocument();
    expect(screen.queryByText('No results found.')).not.toBeInTheDocument();
  });

  it('handles special characters in search results', () => {
    const results = ['C++', 'C#', '.NET'];
    render(<SearchResult results={results} hasSearched={true} />);

    results.forEach((result) => {
      expect(screen.getByText(result)).toBeInTheDocument();
    });
  });

  it('handles long acronym definitions', () => {
    const longResult = 'WYSIWYG - What You See Is What You Get';
    render(<SearchResult results={[longResult]} hasSearched={true} />);

    expect(screen.getByText(longResult)).toBeInTheDocument();
  });
});

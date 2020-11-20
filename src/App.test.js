import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

xtest('renders search button', () => {
  const { getByText } = render(<App />);
  const button = getByText(/sprawdź/i);
  expect(button).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Tracker Board', () => {
  render(<App />);
  const linkElement = screen.getByText(/Tracker Board/i);
  expect(linkElement).toBeInTheDocument();
});

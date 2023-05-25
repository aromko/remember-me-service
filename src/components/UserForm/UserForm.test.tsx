import React from 'react';
import { UserForm } from './UserForm';
import { render, screen } from '@testing-library/react';

jest.mock('next/router', () => require('next-router-mock'));

test('allows to set custom width', () => {
  render(<UserForm />);

  const label = screen.getByLabelText('Name:');
  const input = screen.getByRole('textbox', { name: 'Name:' });
  const error = screen.getByText('The field is required. Please enter a name.');

  expect(label).toBeInTheDocument();
  expect(input).toBeInTheDocument();
  expect(error).toBeInTheDocument();
});

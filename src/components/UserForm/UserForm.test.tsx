import React from 'react';
import { UserForm } from './UserForm';
import { render, screen } from '@testing-library/react';

jest.mock('next/router', () => require('next-router-mock'));

test('allows to set custom width', () => {
  render(<UserForm />);

  const label = screen.getByText('Name:s').parentElement;
  const input = label!.querySelector('input');
  const error = screen.getByText('Please enter a name.');

  expect(label).toBeInTheDocument();
  expect(input).toBeInTheDocument();
  expect(error).toBeInTheDocument();
});

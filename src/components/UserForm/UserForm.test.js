import React from 'react';
import { UserForm } from './UserForm';
import { render } from '@testing-library/react';

test('allows to set custom width', () => {
  render(<UserForm />);

  const label = screen.getByText('Name').parentElement;

  expect(label).toMatchInlineSnapshot();
});

import React from 'react';
import { UserForm } from './UserForm';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

jest.mock('next/router', () => require('next-router-mock'));

test('allows to set custom width', () => {
  render(<UserForm />);

  const label = screen.getByText('Name:').parentElement;

  expect(label).toMatchInlineSnapshot(`
    <div
      class="css-1bpk2h0"
    >
      <label
        aria-required="true"
        class="css-konieo"
        for="name"
        id="react-aria804789145-1"
      >
        Name:
        <svg
          class="css-1brmz26"
          role="presentation"
          viewBox="0 0 24 24"
        >
          <path
            d="M10.8 3.84003H13.2V9.85259L18.1543 7.01815L19.3461 9.10132L14.3584 11.9549L19.3371 14.7999L18.1463 16.8836L13.2 14.0572V20.16H10.8V13.9907L5.76116 16.8735L4.56935 14.7903L9.5232 11.9561L4.56 9.12003L5.75073 7.03624L10.8 9.92154V3.84003Z"
          />
        </svg>
      </label>
      <div
        class="css-j7qwjs"
      >
        <div
          class="css-1alnb86"
        >
          <input
            aria-describedby="react-aria804789145-2"
            aria-labelledby="react-aria804789145-1"
            aria-required="true"
            class="css-18psrrd"
            id="name"
            name="name"
            placeholder="Name"
            type="text"
            value=""
          />
          <div
            class="css-1nbv9tt"
          />
        </div>
        <div
          class="css-qj59y9"
          id="react-aria804789145-2"
        >
          Please enter a name.
        </div>
      </div>
    </div>
  `);
});

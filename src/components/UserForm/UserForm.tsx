import React from 'react';
import { useRouter } from 'next/router';
import theme from '@marigold/theme-b2b';
import {
  Button,
  FieldGroup,
  Headline,
  MarigoldProvider,
  Message,
  Stack,
  Text,
  TextField,
} from '@marigold/components';
import { useResponse } from '../../customHooks';

export const UserForm = () => {
  const router = useRouter();
  const message = useResponse();

  const registerUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameInput = event.currentTarget.elements.namedItem(
      'name'
    ) as HTMLInputElement;
    const name = nameInput.value;

    fetch('/api/telegram', {
      body: JSON.stringify({
        name: name,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then(result => result.json())
      .then(result => {
        if (result.errorMessage.length > 0) {
          message.handleResponse(result);
          window.open(
            `https://t.me/react_remember_me_service_bot?start=${name}`,
            '_blank'
          );
        } else {
          fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({
              name: name,
              userTelegramId: result.userTelegramId,
            }),
          });

          router.push({
            pathname: '/',
            query: {
              message: `User ${name} successful added.`,
            },
          });
        }
      });
  };

  return (
    <MarigoldProvider theme={theme}>
      <Stack space="large" alignX="center">
        <Stack space="xsmall">
          <FieldGroup labelWidth="medium">
            <Headline level="2">User Registration</Headline>
            <form onSubmit={registerUser}>
              <Stack space="medium">
                <TextField
                  id="name"
                  name="name"
                  label="Name:"
                  required
                  placeholder="Name"
                  type="text"
                  description="Please enter a name."
                  onChange={message.resetResponse}
                />
              </Stack>
              <Stack alignX="right">
                <Button variant="primary" size="small" type="submit">
                  Register
                </Button>
              </Stack>
            </form>
            <Stack alignX="center">
              {message.response.errorMessage.length > 0 ? (
                <Message messageTitle="Error" variant="error">
                  <Text>{message.response.errorMessage}</Text>
                </Message>
              ) : null}
            </Stack>
          </FieldGroup>
        </Stack>
      </Stack>
    </MarigoldProvider>
  );
};

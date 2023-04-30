import React, { useState } from 'react';
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

export const UserForm = () => {
  const initialState = { userTelegramId: 0, errorMessage: '' };
  const router = useRouter();
  const [response, setResponse] = useState(initialState);
  const resetStatus = () => {
    setResponse(initialState);
  };

  const registerUser = event => {
    fetch('/api/telegram', {
      body: JSON.stringify({
        name: event.target.name.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then(result => result.json())
      .then(result => {
        if (result.errorMessage.length > 0) {
          setResponse(result);
          window.open(
            `https://t.me/react_remember_me_service_bot?start=${event.target.name.value}`,
            '_blank'
          );
        } else {
          fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({
              name: event.target.name.value,
              userTelegramId: result.userTelegramId,
            }),
          });

          router.push({
            pathname: '/',
            query: {
              message: `User ${event.target.name.value} successful added.`,
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
            <Stack space="medium">
              <TextField
                label="Name:"
                required
                placeholder="Name"
                type="text"
                description="Please enter a name."
                onChange={resetStatus}
              />
            </Stack>
            <Stack alignX="right">
              <Button
                variant="primary"
                size="small"
                type="submit"
                onPress={registerUser}
              >
                Register
              </Button>
            </Stack>
            <Stack alignX="center">
              {response.errorMessage.length > 0 ? (
                <Message messageTitle="Error" variant="error">
                  <Text>{response.errorMessage}</Text>
                </Message>
              ) : null}
            </Stack>
          </FieldGroup>
        </Stack>
      </Stack>
    </MarigoldProvider>
  );
};

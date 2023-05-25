import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import theme from '@marigold/theme-b2b';
import {
  Button,
  Container,
  FieldGroup,
  Headline,
  MarigoldProvider,
  Message,
  Stack,
  Text,
  TextField,
} from '@marigold/components';
import { useResponse } from '../../customHooks';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

interface IFormInputs {
  name: string;
}

export const UserForm = () => {
  const router = useRouter();
  const message = useResponse();

  useEffect(() => {
    if (message.response.errorMessage.length > 0) {
      setTimeout(() => {
        message.resetResponse();
      }, 10000);
    }
  }, [message]);

  const registerUser: SubmitHandler<IFormInputs> = data => {
    const name = data.name;

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

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      name: '',
    },
  });

  return (
    <MarigoldProvider theme={theme}>
      <Container size="large" align="center">
        <Stack space="medium">
          <FieldGroup labelWidth="medium">
            <Headline level="2">User Registration</Headline>
            <form onSubmit={handleSubmit(registerUser)}>
              <Stack space="small">
                <Stack>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Name:"
                        required
                        type="text"
                        description="Please enter a name."
                        error={field.value.length === 0}
                        errorMessage="The field is required. Please enter a name."
                      />
                    )}
                  />
                </Stack>
                <Stack alignX="right">
                  <Button
                    variant="primary"
                    size="small"
                    type="submit"
                    disabled={!isValid}
                  >
                    Register
                  </Button>
                </Stack>
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
      </Container>
    </MarigoldProvider>
  );
};

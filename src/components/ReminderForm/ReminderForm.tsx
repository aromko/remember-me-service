import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useResponse } from '../../customHooks';
import theme from '@marigold/theme-b2b';
import {
  Button,
  Container,
  FieldGroup,
  Headline,
  MarigoldProvider,
  Select,
  Stack,
  TextField,
} from '@marigold/components';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

interface User {
  _id: string;
  name: string;
  telegramId: string;
}

interface IFormInputs {
  name: string;
  description: string;
  executionAt: string;
  messageType: string;
  telegramId: string;
}

export const ReminderForm: React.FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const message = useResponse();

  useEffect(() => {
    fetch('api/user')
      .then(res => res.json())
      .then(res => {
        setUsers(res.data);
      });
  }, []);

  const saveReminder: SubmitHandler<IFormInputs> = data => {
    const splitTelegramId = data.telegramId.split('_');

    fetch('/api/reminder', {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        executionAt: data.executionAt,
        messageType: data.messageType,
        telegramId: splitTelegramId[2],
        userName: splitTelegramId[1],
      }),
    });

    router.push({
      pathname: '/',
      query: {
        message: `Reminder ${data.name} successfully added.`,
      },
    });
  };

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      executionAt: '',
      messageType: 'TELEGRAM',
      userName: '',
      telegramId: '',
    },
  });

  return (
    <MarigoldProvider theme={theme}>
      <Container size="large" align="center">
        <Stack space="medium">
          <FieldGroup labelWidth="large">
            <Headline level="2">Add Reminder</Headline>
            <form onSubmit={handleSubmit(saveReminder)}>
              <Stack space="small">
                <Stack space="medium">
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
                  <Controller
                    name="description"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Description"
                        required
                        type="text"
                        description="Please enter a description."
                        error={field.value.length === 0}
                        errorMessage="The field is required. Please enter a description."
                      />
                    )}
                  />
                  <Controller
                    name="executionAt"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Execution date"
                        required
                        type="date"
                        description="Please enter an execution date."
                        error={field.value.length === 0}
                        errorMessage="The field is required. Please enter an execution date."
                      />
                    )}
                  />
                  <Controller
                    name="messageType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        required
                        label="Message type"
                        defaultSelectedKey="TELEGRAM"
                      >
                        <Select.Option key={'TELEGRAM'}>Telegram</Select.Option>
                      </Select>
                    )}
                  />
                  <Controller
                    name="telegramId"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        id="telegramId"
                        name="telegramId"
                        required
                        label="User"
                        placeholder="Please select a user"
                        error={field.value.length === 0}
                        errorMessage="The field is required. Please choose a user."
                      >
                        {users.map(item => (
                          <Select.Option
                            key={`${item._id}_${item.name}_${item.telegramId}`}
                            textValue="test"
                          >
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
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
                    Save
                  </Button>
                </Stack>
              </Stack>
            </form>
          </FieldGroup>
        </Stack>
        {message.response.errorMessage.length > 0 ? (
          <div style={{ color: 'red' }}>{message.response.errorMessage}</div>
        ) : null}
      </Container>
    </MarigoldProvider>
  );
};

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useResponse } from '../../customHooks';
import theme from '@marigold/theme-b2b';
import {
  Button,
  FieldGroup,
  Headline,
  MarigoldProvider,
  Select,
  Stack,
  TextField,
} from '@marigold/components';
import { Key } from 'react/index';

interface User {
  _id: string;
  name: string;
}

export const ReminderForm: React.FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [messageType, setMessageType] = useState('TELEGRAM');
  const [telegramId, setTelegramId] = useState<string[]>([]);
  const message = useResponse();

  useEffect(() => {
    fetch('api/user')
      .then(res => res.json())
      .then(res => {
        setUsers(res.data);
      });
  }, []);

  const saveReminder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch('/api/reminder', {
      method: 'POST',
      body: JSON.stringify({
        // @ts-ignore
        name: event.currentTarget['name'].value,
        description: event.currentTarget['description'].value,
        executionAt: event.currentTarget['executionAt'].value,
        messageType: messageType,
        userName: telegramId[1],
        telegramId: telegramId[0],
      }),
    });

    router.push({
      pathname: '/',
      query: {
        // @ts-ignore
        message: `Reminder ${event.currentTarget['name'].value} successfully added.`,
      },
    });
  };

  return (
    <MarigoldProvider theme={theme}>
      <Stack space="large" alignX="center">
        <Stack space="xsmall">
          <FieldGroup labelWidth="large">
            <Headline level="2">Add Reminder</Headline>
            <form onSubmit={saveReminder}>
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
                <TextField
                  id="description"
                  name="description"
                  label="Description"
                  required
                  placeholder="Description"
                  type="text"
                  description="Please enter a description."
                  onChange={message.resetResponse}
                />
                <TextField
                  id="executionAt"
                  name="executionAt"
                  label="Execution date"
                  required
                  placeholder="Execution date"
                  type="date"
                  description="Please enter an execution date."
                  onChange={message.resetResponse}
                />
                <Select
                  id="messageType"
                  name="messageType"
                  required
                  label="Message type"
                  defaultSelectedKey="TELEGRAM"
                  onChange={(selectedKey: Key) => {
                    setMessageType(selectedKey as string);
                  }}
                >
                  <Select.Option key={'TELEGRAM'}>Telegram</Select.Option>
                </Select>
                <Select
                  id="telegramId"
                  name="telegramId"
                  required
                  label="User"
                  placeholder="Please select a user"
                  onChange={(selectedKey: string | number | null) => {
                    if (selectedKey !== null) {
                      setTelegramId(String(selectedKey).split('_'));
                    }
                  }}
                >
                  {users.map(item => (
                    <Select.Option
                      key={`${item._id}_${item.name}`}
                      // @ts-ignore
                      value={`${item._id}_${item.name}`}
                    >
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Stack>
              <Stack alignX="right">
                <Button variant="primary" size="small" type="submit">
                  Save
                </Button>
              </Stack>
            </form>
          </FieldGroup>
        </Stack>
      </Stack>
      {message.response.errorMessage.length > 0 ? (
        <div style={{ color: 'red' }}>{message.response.errorMessage}</div>
      ) : null}
    </MarigoldProvider>
  );
};

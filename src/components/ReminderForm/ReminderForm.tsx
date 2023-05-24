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

export const ReminderForm = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [messageType, setMessageType] = useState('TELEGRAM');
  const [telegramId, setTelegramId] = useState([]);
  const message = useResponse();

  useEffect(() => {
    fetch('api/user')
      .then(res => res.json())
      .then(res => {
        setUsers(res.data);
      });
  }, []);

  const saveReminder = event => {
    event.preventDefault();

    fetch('/api/reminder', {
      method: 'POST',
      body: JSON.stringify({
        name: event.target.name.value,
        description: event.target.description.value,
        executionAt: event.target.executionAt.value,
        messageType: messageType,
        userName: telegramId[1],
        telegramId: telegramId[0],
      }),
    });

    router.push({
      pathname: '/',
      query: {
        message: `Reminder ${event.target.name.value} successful added.`,
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
                  description="Please enter a execution date."
                  onChange={message.resetResponse}
                />
                <Select
                  id="messageType"
                  name="messageType"
                  required
                  label="Messae type"
                  defaultSelectedKey="TELEGRAM"
                  onChange={selectedKey => {
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
                  onChange={selectedKey => {
                    setTelegramId((selectedKey as string).split('_'));
                  }}
                >
                  {users.length !== 0
                    ? users.map(item => (
                        <Select.Option key={`${item._id}_${item.name}`}>
                          {item.name}
                        </Select.Option>
                      ))
                    : null}
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

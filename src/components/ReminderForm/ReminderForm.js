import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useResponse } from '../../customHooks';

export const ReminderForm = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
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
        messageType:
          event.target.messageType[event.target.messageType.selectedIndex]
            .value,
        userName:
          event.target.telegramId[event.target.telegramId.selectedIndex].text,
        telegramId:
          event.target.telegramId[event.target.telegramId.selectedIndex].value,
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
    <div>
      <form onSubmit={saveReminder}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            onChange={message.resetResponse}
          />
        </div>
        <div>
          <label htmlFor="name">Beschreibung</label>
          <input
            id="description"
            name="description"
            type="text"
            autoComplete="name"
            required
            onChange={resetStatus}
          />
        </div>
        <div>
          <label htmlFor="name">Ausführungdatum</label>
          <input
            id="executionAt"
            name="executionAt"
            type="date"
            autoComplete="name"
            required
            onChange={message.resetResponse}
          />
        </div>
        <div>
          <label htmlFor="name">Nachrichtenart</label>
          <select id="messageType" name="messageType" required>
            <option value="TELEGRAM">Telegram</option>
          </select>
        </div>
        <div>
          <label htmlFor="name">Benutzer</label>
          <select id="telegramId" name="telegramId" required>
            {users.length !== 0
              ? users.map(item => (
                  <option key={item._id} value={item.telegramId}>
                    {item.name}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div>
          <button type="submit">Speichern</button>
        </div>
      </form>
      {message.response.errorMessage.length > 0 ? (
        <div style={{ color: 'red' }}>{message.response.errorMessage}</div>
      ) : null}
    </div>
  );
};

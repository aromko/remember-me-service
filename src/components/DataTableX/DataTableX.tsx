import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from '@marigold/components';
import { useRouter } from 'next/router';

interface Reminder {
  _id: string;
  name: string;
  description: string;
  executionAt: string;
  messageType: string;
  userName: string;
  telegramId: string;
}

const columns = [
  {
    name: 'Name',
    selector: (row: Reminder) => row.name,
  },
  {
    name: 'Description',
    selector: (row: Reminder) => row.description,
  },
  {
    name: 'Execution Data',
    selector: (row: Reminder) => row.executionAt,
  },
  {
    name: 'Message type',
    selector: (row: Reminder) => row.messageType,
  },
  {
    name: 'User',
    selector: (row: Reminder) => row.userName,
  },
  {
    name: 'Telegram-Id',
    selector: (row: Reminder) => row.telegramId,
  },
];

export const DataTableX: React.FC = () => {
  const router = useRouter();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [selectedRows, setSelectedRows] = useState<Reminder[]>([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  useEffect(() => {
    fetch('api/reminder')
      .then(res => res.json())
      .then(res => {
        setReminders(res.data);
      });
  }, []);

  const handleRowSelected = useCallback(
    (state: { selectedRows: Reminder[] }) => {
      setSelectedRows(state.selectedRows);
    },
    []
  );

  const contextActions = useMemo(() => {
    const handleDelete = () => {
      if (
        window.confirm(
          `Are you sure you want to delete:\r ${selectedRows.map(r => r.name)}?`
        )
      ) {
        setToggleCleared(!toggleCleared);
        setReminders(differenceBy(reminders, selectedRows));
        fetch('/api/reminder', {
          method: 'DELETE',
          body: JSON.stringify(selectedRows),
        });

        router.push({
          pathname: '/',
          query: { message: `Reminder(s) successful deleted.` },
        });
      }
    };

    const differenceBy = (
      reminders: Reminder[],
      selectableRows: Reminder[]
    ) => {
      return reminders.filter(x => !selectableRows.includes(x));
    };

    return (
      <Button
        key="delete"
        onClick={handleDelete}
        style={{ backgroundColor: 'red', color: 'white' }}
      >
        Delete
      </Button>
    );
  }, [reminders, selectedRows, toggleCleared, router]);

  return (
    <DataTable
      keyField="_id"
      title="Reminders"
      columns={columns}
      data={reminders}
      selectableRows
      contextActions={contextActions}
      onSelectedRowsChange={handleRowSelected}
      clearSelectedRows={toggleCleared}
      pagination
    />
  );
};

import DataTable from 'react-data-table-component';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

const columns = [
    {
        name: 'Name',
        selector: row => row.name,
    },
    {
        name: 'Description',
        selector: row => row.description,
    },
    {
        name: 'Execution Data',
        selector: row => row.executionAt
    },
    {
        name: 'Message type',
        selector: row => row.messageType
    },
    {
        name: 'User',
        selector: row => row.userName
    },
    {
        name: 'Telegram-Id',
        selector: row => row.telegramId
    }
];

export default function DataTableX() {
    const router = useRouter();
    const [reminders, setReminders] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);

    useEffect(() => {
        fetch('api/reminder')
        .then((res) => res.json())
        .then((res) => {
            setReminders(res.data);
        })
    }, [])

    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const contextActions = useMemo(() => {
        const handleDelete = () => {
            
            if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.name)}?`)) {
                setToggleCleared(!toggleCleared);
                setReminders(differenceBy(reminders, selectedRows));
                fetch('/api/reminder', {
                    method: 'DELETE',
                    body: JSON.stringify(selectedRows)
                });

                router.push({
                    pathname: '/',
                    query: { message: `Reminder(s) successful deleted.` }
                });
            }
        };

        const differenceBy = (reminders, selectableRows) => {
            return reminders.filter(x => !selectableRows.includes(x));
        };

        return (
            <div>
                <Button key="delete" onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
                    Delete
                </Button>
            </div>
        );
    }, [reminders, selectedRows, toggleCleared]);

    return (
        <DataTable
            title="Reminders"
            columns={columns}
            data={reminders}
            selectableRows
			contextActions={contextActions}
			onSelectedRowsChange={handleRowSelected}
			clearSelectedRows={toggleCleared}
			pagination
        />
    )
}
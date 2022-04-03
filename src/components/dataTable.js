import DataTable from 'react-data-table-component';
import React from 'react'
import Button from '@mui/material/Button'

const columns = [
    {
        name: 'Name',
        selector: row => row.name,
    },
    {
        name: 'Beschreibung',
        selector: row => row.description,
    },
    {
        name: 'Ausführungdatum',
        selector: row => row.date
    },
    {
        name: 'Nachrichtenart',
        selector: row => row.messageType
    },
    {
        name: 'Benutzer',
        selector: row => row.user
    }
];

const tableDataItems = [
    {
        id: 1,
        name: 'Beetlejuice',
        description: '1988',
        date: '26.03.2022',
        messageType: 'TELEGRAM',
        user: 'sabutori'
  
    },
    {
        id: 2,
        name: 'Ghostbusters',
        description: '1984',
        date: 'aaa',
        messageType: 'TELEGRAM',
        user: 'sabutori'
    }
  ]

export default function DataTableX() {
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [toggleCleared, setToggleCleared] = React.useState(false);
    const [data, setData] = React.useState(tableDataItems);

    const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const contextActions = React.useMemo(() => {
        const handleDelete = () => {
            
            if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.name)}?`)) {
                setToggleCleared(!toggleCleared);
                setData(differenceBy(data, selectedRows));
            }
        };

        const differenceBy = (data, selectableRows) => {
            return data.filter(x => !selectableRows.includes(x));
        };

        return (
            <div>
            <Button key="delete" onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
                Delete
            </Button>
            </div>
        );
    }, [data, selectedRows, toggleCleared]);

    return (
        <DataTable
            title="Tasks"
            columns={columns}
            data={data}
            selectableRows
			contextActions={contextActions}
			onSelectedRowsChange={handleRowSelected}
			clearSelectedRows={toggleCleared}
			pagination
        />
    )
}
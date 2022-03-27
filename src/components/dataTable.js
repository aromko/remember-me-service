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
        name: 'Datum',
        selector: row => row.date
    },
    {
      name: 'Nachrichtenart',
      selector: row => row.messageType
    }
];

export default function DataTableX({tableDataItems}) {
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
            <Button key="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }}>
                Delete
            </Button>
            <Button key="insert" onClick={handleDelete} style={{ backgroundColor: 'green' }}>
                Insert
            </Button>
            </div>
        );
    }, [data, selectedRows, toggleCleared]);

    return (
        <DataTable
            title="Desserts"
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
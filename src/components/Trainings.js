import React, { useState, useEffect } from 'react';
import{ AgGridReact} from'ag-grid-react';
import Button from '@mui/material/Button';
import'ag-grid-community/dist/styles/ag-grid.css';
import'ag-grid-community/dist/styles/ag-theme-material.css';
import dayjs from 'dayjs';
import Customerlist from './Customerlist';

export default function Trainings() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
    }

    const DeleteTraining = (id) => {
        if (window.confirm('Are you sure?')) {
        fetch('https://customerrest.herokuapp.com/api/trainings/' + id, {method: 'DELETE'})
        .then(res => fetchData())
        .catch(err => console.error(err))
        }
     }
  
    const columns = [
        {headerName: 'Activity', field: 'activity', sortable: true, filter: true},
        {headerName: 'Date', field: 'date', sortable: true, filter: true,
            valueFormatter: (data) => {
            return dayjs(data.value).format('MM/DD/YYYY HH:mm')
        }},
        {headerName: 'Duration', field: 'duration', sortable: true, filter: true},
        {headerName: 'Customer', field: 'customer.firstname' , sortable: true, filter: true},
        {headerName: "Delete", field: "id", sortable: false, filter: false, resizable: true, width:100,
            cellRendererFramework: params => {
                 return (
                <Button size="small" color ="secondary" onClick={() => DeleteTraining(params.value)}>Delete</Button>
            );
        }
    },
    ]

    return (
        <div>
            <div className="ag-theme-material"
                style={{
                height:'700px',
                width:'100%',
                margin:'auto'}}>
            <AgGridReact 
                columnDefs={columns}
                rowData={trainings}> 
            </AgGridReact>
            </div>
        </div>
    );
}
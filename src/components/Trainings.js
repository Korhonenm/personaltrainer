import React, { useState, useEffect } from 'react';
import{ AgGridReact} from'ag-grid-react';
import'ag-grid-community/dist/styles/ag-grid.css';
import'ag-grid-community/dist/styles/ag-theme-material.css';
import dayjs from 'dayjs';

export default function Trainings() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
    }
  
    const columns = [
        {headerName: 'Activity', field: 'activity', sortable: true, filter: true},
        {headerName: 'Date', field: 'date', sortable: true, filter: true,
            valueFormatter: (data) => {
            return dayjs(data.value).format('MM/DD/YYYY HH:mm')
        }},
        {headerName: 'Duration', field: 'duration', sortable: true, filter: true}
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
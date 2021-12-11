import React, { useState, useEffect } from 'react';
import{ AgGridReact} from'ag-grid-react';
import'ag-grid-community/dist/styles/ag-grid.css';
import'ag-grid-community/dist/styles/ag-theme-material.css';

export default function Customerlist() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }

    const columns = [
        {headerName: 'First name', field: 'firstname', sortable: true, filter: true},
        {headerName: 'Last name', field: 'lastname', sortable: true, filter: true},
        {headerName: 'Street address', field: 'streetaddress', sortable: true, filter: true},
        {headerName: 'Postcode', field: 'postcode', sortable: true, filter: true},
        {headerName: 'City', field: 'city', sortable: true, filter: true},
        {headerName: 'Email', field: 'email', sortable: true, filter: true},
        {headerName: 'Phone', field: 'phone', sortable: true, filter: true}
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
                rowData={customers}> 
            </AgGridReact>
            </div>
        </div>
    );
}
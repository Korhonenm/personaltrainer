import React, { useState, useEffect } from 'react';
import{ AgGridReact} from'ag-grid-react';
import'ag-grid-community/dist/styles/ag-grid.css';
import'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining'


export default function Customerlist() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }

    const saveCustomer = (customer) =>{
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
     }

     const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
            .catch(err => console.error(err))
        }


    const DeleteCustomer = (url) => {
        if (window.confirm('Are you sure?')) {
        console.log("Deleting customer", url)
        fetch(url, {method: 'DELETE'})
        .then(res => fetchData())
        .catch(err => console.error(err))
        }
     }

     const saveTraining = (training) =>{
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
     }

    const columns = [
        {headerName: 'First name', field: 'firstname', sortable: true, filter: true},
        {headerName: 'Last name', field: 'lastname', sortable: true, filter: true},
        {headerName: 'Street address', field: 'streetaddress', sortable: true, filter: true},
        {headerName: 'Postcode', field: 'postcode', sortable: true, filter: true},
        {headerName: 'City', field: 'city', sortable: true, filter: true},
        {headerName: 'Email', field: 'email', sortable: true, filter: true},
        {headerName: 'Phone', field: 'phone', sortable: true, filter: true},
        {headerName: 'Add training', field: "links.0.href", sortable: false, filter: false, resizable: true, width:200,
        cellRendererFramework: params => 
           
            <AddTraining link ={params.value} training ={params.data} saveTraining={saveTraining} customerId={params.value} /> },
        
        {headerName: 'Edit', field: "links", sortable: false, filter: false, resizable: true, width:100,
         cellRendererFramework:  function(params) {
            return <EditCustomer updateCustomer={updateCustomer} customer={params.data} /> }},
            
        {headerName: "Delete", field: "links", sortable: false, filter: false, resizable: true, width:100,
        cellRendererFramework: params => {
            const url = params.value[0].href;
                return (
                    <Button size="small" color ="secondary" onClick={() => DeleteCustomer(url)}>Delete</Button>
                );
            }
        },
    ]

    return (
        <div>
            <AddCustomer saveCustomer={saveCustomer}/>
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
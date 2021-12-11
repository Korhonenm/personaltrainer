import React, {useState} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Customerlist from './components/Customerlist';
import Trainings from './components/Trainings';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from'@mui/material/Tabs';
import Tab  from'@mui/material/Tab';


function App() {
  const[value, setValue] = useState(0);
  
  const handleChange= (event, value) => 
   {setValue(value);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Personal trainer
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Tabs value={value} onChange={handleChange}>
        <Tab  label="Customerlist" />
        <Tab label="Trainings"/>
      </ Tabs>
      {value=== 0 && <Customerlist />}
      {value=== 1 &&<Trainings/>}
    </div>
  );
}

export default App;

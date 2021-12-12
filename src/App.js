import React, {useState} from 'react';
import './App.css';
import Customerlist from './components/Customerlist';
import Trainings from './components/Trainings';
import Calendar from './components/Calendar';
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
        <Tab label="Customerlist" />
        <Tab label="Trainings"/>
        <Tab label="Calendar" />
      </ Tabs>
      {value=== 0 && <Customerlist />}
      {value=== 1 &&<Trainings/>}
      {value=== 2 &&<Calendar/>}
    </div>
  );
}

export default App;

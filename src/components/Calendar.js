import React, {useState, useEffect} from 'react';
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function CalendarPage() {

const [trainings, setTrainings] = useState([]);

    useEffect(() => {
      fetchTrainings()
  }, [])

const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
    .then((response) => response.json())
    .then((data) => setTrainings(data))
    .catch(err => console.error(err))
}

const eventList = trainings.map(tr => {
    let date = new Date(tr.date)

    const eventInfo = {
        start: date,
        end: new Date(moment(date).add(tr.duration, "minutes")),
        title: tr.activity + '/ ' + tr.customer.firstname  + ' '+ tr.customer.lastname
    }
    return eventInfo
    });


    return(
        <div style={{height:"700px"}}>
            <Calendar
                localizer={localizer}
                events={eventList}
                step={60}
                defaultView={"month"}
            ></Calendar>
        </div>
    )
}
export default CalendarPage;
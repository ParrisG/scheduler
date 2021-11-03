import {useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData() {

  //setting the application state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    });
  }, [])


  //Aliasing the previous set(Day) function
  const setDay = day => setState({...state, day});

  //updating the available spots
  const updateSpots = function (state, appointments) {
    let spotCount = 0;
  
    const daysIndex = state.days.findIndex((day) => day.name === state.day);
    let appointArr = state.days[daysIndex].appointments;
  
    for (let key of appointArr) {
      if (appointments[key].interview === null) {
        spotCount++;
      }
    }
  
    const day = {
      ...state.days[daysIndex],
      spots: spotCount
    };
    const beginning = state.days.slice(0, daysIndex);
    const ending = state.days.slice(daysIndex + 1, state.days.length);
    const newDaysArr = [...beginning, day, ...ending];
  
    return newDaysArr;
  };

  //add a new interview to the db
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(state, appointments);

    return axios.put(`/api/appointments/${id}`, {interview}).then(() => {
      setState({
        ...state,
        appointments,
        days
      });
    });
  };


  //remove the interview details from the db
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(state, appointments);

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
        days
      });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };

}
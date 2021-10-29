

export function getAppointmentsForDay(state, day) {
  let appointmentsForDay = [];
  let appointmentsId = [];
  
  state.days.forEach(element => {
    if (element.name === day) {
      appointmentsId = element.appointments;
    }
  })

  for (const id of appointmentsId){
    appointmentsForDay.push(state.appointments[id])
  };

  return appointmentsForDay;
}
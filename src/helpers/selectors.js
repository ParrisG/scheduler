

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
};

export function getInterview(state, interview) {
  if (interview) {
    const id = interview.interviewer
    return {
      student: interview.student,
      interviewer: {
        id: id,
        name: state.interviewers[id].name,
        avatar: state.interviewers[id].avatar
      }
    };
  } else {
    return null;
  }
};

export function getInterviewersForDay(state, day) {
  let interviewersForDay = [];
  let interviewersId = [];
  
  state.days.forEach(element => {
    if (element.name === day) {
      interviewersId = element.interviewers;
    }
  })

  for (const id of interviewersId){
    interviewersForDay.push(state.interviewers[id])
  };

  return interviewersForDay;
};
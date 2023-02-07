import React from "react";

function calendarReducer(state, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "INCREMENT":
      if (state.month < 11) {
        return { ...state, month: state.month + 1 };
      }
      // 12월을 넘길 경우 Year + 1
      else {
        return { ...state, year: state.year + 1, month: 0 };
      }
    case "DECREMENT":
      if (state.month > 0) {
        return { ...state, month: state.month - 1 };
      }
      // 1월 보다 작을 경우 Year - 1
      else {
        return { ...state, year: state.year - 1, month: 11 };
      }
    case "MODAL":
      return {
        ...state,
        modal: {
          ...state.modal,
          visible: !state.modal.visible,
          index: action.value,
        },
      };
    // 초기화
    case "INITIALIZATIONSCHEDULE":
      return { ...state, schedule: [] };

    case "INSERT":
      // 해당 인덱스에 이미 일정이 있는 경우
      if (state.schedule[action.index] !== undefined) {
        return {
          ...state,
          schedule: {
            ...state.schedule,
            [action.index]: [
              ...state.schedule[action.index],
              [action.todo, action.color, action.no, action.region],
            ],
          },
        };
      }
      // 해당 인덱스에 일정이 없는 경우
      else {
        return {
          ...state,
          schedule: {
            ...state.schedule,
            [action.index]: [
              [action.todo, action.color, action.no, action.region],
            ],
          },
        };
      }

    case "setYearMonth":
      const targetdate = action.date;            
      sessionStorage.setItem("selected", action.region);
      const year = new Date(targetdate).getFullYear();
      const month = new Date(targetdate).getMonth();      
      return { ...state, year: year, month: month  };
  }
}

export default calendarReducer;

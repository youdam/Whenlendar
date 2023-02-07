import React, { Fragment, useContext, useState } from "react";
import Calendar from "../components/Calendar/containers/Calendar";
import AuthContext from "../store/authContext";

import "../components/Calendar/style/calendar.css";
import "../components/Calendar/style/table.css";
import "../components/Calendar/style/calendarModal.css"


const CalendarPage = () => {
  const authCtx = useContext(AuthContext);
  const userid = authCtx.userObj.userid;
  const usernickname = authCtx.userObj.usernickname;  
  const islogin = authCtx.isLoggedIn; // 로그인 여부 true: 로그인, false:비로그인    
  const userRole = authCtx.userObj.role;
  console.log('권한:', userRole)
  

  return (    
    <Fragment>
      <Calendar />      
    </Fragment>
  );
};

export default CalendarPage;
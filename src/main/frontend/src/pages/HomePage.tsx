import React, { useContext, useState } from "react";
import MainNavigation from "../components/Layout/MainNavigation";
import AuthContext from "../store/authContext";
import addNotification from "react-push-notification";
import TodayWeatherComponent from "../components/WeatherAPI/TodayWeatherComponent";
import WeekWeatherComponent from "../components/WeatherAPI/WeekWeatherComponent";
import Calendar from "../components/Calendar/containers/Calendar";

const HomePage = () => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const userid = authCtx.userObj.userid;
  const usernickname = authCtx.userObj.usernickname;  
  const islogin = authCtx.isLoggedIn; // 로그인 여부 true: 로그인, false:비로그인    
  const userRole = authCtx.userObj.role;
  console.log('권한:', userRole)
  console.log('토큰:', token)
  console.log('아이디:', userid)
  console.log('닉네임:', usernickname)
  const [Image, setImage] = useState("/profileImg/cat2.jpg")

  const click = () => {
    addNotification({
      title: '제목',
      message: userid,      
      icon: Image,
      native: true,
      duration: 4000,           
    })
    
  } 

  return (
    <div>
      <Calendar />   
    </div>
  );
};

export default HomePage;
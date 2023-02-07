import axios from "axios";
import React, {useContext, useState, useEffect} from "react"
import AuthContext from '../../store/authContext';
import WeekWeatherComponent from "./WeekWeatherComponent";


export const TodayWeatherComponent = (props) => {
    const authCtx = useContext(AuthContext)
    const token = authCtx.token;
    const [TempCelcius, setTempCelcius] = useState("")
    const [Description, setDescription] = useState("")
    const [icon, setIcon] = useState("")
    const [iconUrl, setIconUrl] = useState("")
    const [city, setCity] = useState("")
    useEffect(()=> {
       
        getWeather();

    }, []);
    
    const getWeather = async () => {
       await(axios.get("/api/todayWeather", token)).then((res) => {
        const kelbinTemp = res.data.main.temp;
        setTempCelcius((kelbinTemp-273.15).toFixed(1))
        setDescription(res.data.weather[0].main)
        setIcon(res.data.weather[0].icon);
        console.log(res.data)
        // 현재 날씨(구름, 비 등등) :  weather
        // 기온정보:  main}
        const iconUrl = "http://openweathermap.org/img/w/"+res.data.weather[0].icon+".png"
        setIconUrl(iconUrl)
        setCity(res.data.name)
       })
       
    }
    // const weatherRendering = ()=> {
    //     setIconUrl("http://openweathermap.org/img/w/04d.png");
   
        
    // }
    ;
    
    return(
       <>
        <div>
            <div className="weatherBox" style = {{padding: '5%', marginTop: '10%', position: 'fixed', textalign:'center', width:'25%', left:'65%', border:'1px solid black'}} >
                {city} 현재날씨
                <br/>
                <img src={iconUrl}/>
                <br/>
                온도: {TempCelcius}
                <br/>
                {Description}
                <br/>
            </div>
        </div>
        
        </>
    )
}
export default TodayWeatherComponent;
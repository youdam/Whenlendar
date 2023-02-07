import axios from "axios";
import { setDate } from "date-fns";
import React, {useContext, useState, useEffect} from "react"
import AuthContext from '../../store/authContext';

export const WeekWeatherComponent = (props) => {
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const [weekPredict, setWeekPredict] = useState([]);
    
    useEffect(()=>{
        getWeekWeather();
    }, []);
    
    const getWeekWeather = async ()=> {
        await(axios.get("/api/weekPredict", token)).then((res)=>{
           
            console.log(res.data)
            const weekData = [res.data.daily]
            console.log(weekData[0])
            const newData = weekData[0]
            console.log(newData[0].dt)
            
            for (var i=0; i<=7; i++){
               const setDate = new Date(newData[i].dt*1000).toLocaleString('kor-KR', {month:"long", day:"2-digit"})
               newData[i].dt = setDate
            }
        setWeekPredict(weekData[0])  

        })
    }
    return (
        <>
        <div>
            <table>
                <thead>
                    <th> 일   자  </th>
                    <th> 날   씨  </th>
                    <th> 최저기온 </th>
                    <th> 최고기온 </th>
                    <th> 습   도  </th>
                </thead>
                <tbody>
            {
            weekPredict.map((weekPredict) =>
                <tr key={weekPredict.dt}>
                <td>{weekPredict.dt}</td>
                <td>{weekPredict.weather[0].description}</td>
                <td>{(weekPredict.temp.min-273.15).toFixed(1)}</td>
                <td>{(weekPredict.temp.max-273.15).toFixed(1)}</td>
                <td>{weekPredict.humidity}</td>
                </tr>
               
            )}
            </tbody>
            </table>
        </div>
        </>
    )
}
export default WeekWeatherComponent;
import React from "react";
import Style from "./Style";

const Schedule = (index, todo) => {
    const result =[]
    const info = []
    if (todo[index] !== undefined) {
        todo[index].map((item) => {
            result.push(<li className="calendarLi" style={Style(item[1])} key={index+item}>{item[0]}</li>)
            info.push({index: index, todo: item})
        })
        return result
    }
    return null;
}

export default Schedule

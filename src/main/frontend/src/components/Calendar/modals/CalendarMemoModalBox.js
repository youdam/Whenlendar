import React, { useState, useEffect, useCallback, useReducer } from 'react'
import { Modal, Container } from 'react-bootstrap'
import axios from 'axios'
import Region from '../module/Region'

const CalendarMemoModalBox = ( props ) => {       

    return (
        <>
            <td className="calendarTd">{props.memo}</td>
            <td className="calendarTd">{props.targetdate}</td>
            <td className="calendarTd">{Region({regionNumber:props.region, groupName: props.groupName})}</td>
        </>           
            );      
}

export default CalendarMemoModalBox
import React,{useContext} from "react";
import Schedule from "./Schedule";
import { transString } from "./CalcDate";
import AuthContext from "../../../store/authContext";

/*
 * 현재 날짜를 key값 형식으로 변환
 * key ex) 2021.10.11
 */
const returnIdx = (order, year, month, day) => {
  if (order == "PREV") {
    if (month == 0) {
      return transString(year - 1, 12, day);
    } else {
      return transString(year, month, day);
    }
  } else if (order == "NEXT") {
    if (month == 11) {
      return transString(year + 1, 1, day);
    } else {
      return transString(year, month + 2, day);
    }
  }

  return transString(year, month + 1, day);
};

const MakeCalendar = ({
  year,
  month,
  firstDay,
  lastDate,
  changeVisible,
  todo,
  setCalendarUpdateModalOn,
  onCancel,
  groupLeader,
  userid,
  groupName,
}) => {
  const authCtx = useContext(AuthContext);
  const isLogin = authCtx.isLoggedIn;
  const result = [];

  const viewModal = () => {
    setCalendarUpdateModalOn(true);
    changeVisible(onCancel);
  };

  const makeDay = (week) => {
    const result = [];
    // 첫 주
    if (week == 1) {
      const prevLastDate = parseInt(new Date(year, month, 0).getDate());
      for (let i = 1; i <= 7; i++) {
        // 저번 달 날짜
        if (i <= firstDay) {
          const now = prevLastDate - firstDay + i;
          const idx = returnIdx("PREV", year, month, now);

          result.push(
            <>
              {!groupName || (groupName && groupLeader === userid) ? (
                <td className="diff calendarMainTd"
                  onClick={() => changeVisible(idx)}
                  key={idx}
                >
                  {now}                  
                    <div className="calendarDiv" onClick={viewModal}>{Schedule(idx, todo)}</div>
                </td>
              ) : null}
              {groupName && groupLeader !== userid ? (
                <td className="diff calendarMainTd"
                  key={idx}
                >
                  {now}
                    <div className="calendarDiv">{Schedule(idx, todo)}</div>
                </td>
              ) : null}
            </>
          );
        }
        // 현재 달 날짜
        else {
          const now = i - firstDay;
          const idx = returnIdx("", year, month, now);

          result.push(
            <>
              {isLogin && !groupName || (groupName && groupLeader === userid) ? (
                <td
                  className="calendarMainTd"
                  onClick={() => changeVisible(idx)}
                  key={idx}
                >
                  {now}
                    <div className="calendarDiv" onClick={viewModal}>{Schedule(idx, todo)}</div>
                </td>
              ) : null}
              {!isLogin || groupName && groupLeader !== userid ? (
                <td
                  className="calendarMainTd"                 
                  key={idx}
                >
                  {now}
                    <div className="calendarDiv">{Schedule(idx, todo)}</div>
                </td>
              ) : null}
            </>
          );
        }
      }
    } else {
      const startDate = (week - 1) * 7;
      for (let i = startDate; i <= week * 7 - 1; i++) {
        // 현재 달 날짜
        if (i - firstDay < lastDate) {
          const now = i - firstDay + 1;
          const idx = returnIdx("", year, month, now);

          result.push(
            <>
              {isLogin && !groupName || (groupName && groupLeader === userid) ? (
                <td
                  className="calendarMainTd"
                  onClick={() => changeVisible(idx)}
                  key={idx}
                >
                  {now}
                    <div className="calendarDiv" onClick={viewModal}>{Schedule(idx, todo)}</div>
                </td>
              ) : null}
              {!isLogin || groupName && groupLeader !== userid ? (
                <td
                 className="calendarMainTd"                
                  key={idx}
                >
                  {now}
                    <div className="calendarDiv">{Schedule(idx, todo)}</div>
                </td>
              ) : null}
            </>
          );
        }
        // 다음 달 날짜
        else {
          const now = i - lastDate - firstDay + 1;
          const idx = returnIdx("NEXT", year, month, now);

          result.push(
            <>
              {isLogin && !groupName || (groupName && groupLeader === userid) ? (
                <td className="diff calendarMainTd"
                  onClick={() => changeVisible(idx)}
                  key={idx}
                >
                  {now}
                    <div className="calendarDiv" onClick={viewModal}>{Schedule(idx, todo)}</div>
                </td>
              ) : null}
              {!isLogin || groupName && groupLeader !== userid ? (
                <td className="diff calendarMainTd"
                  key={idx}
                >
                  {now}
                    <div className="calendarDiv">{Schedule(idx, todo)}</div>
                </td>
              ) : null}
            </>
          );
        }
      }
    }
    return result;
  };

  // 주 계산
  const week = Math.ceil((firstDay + lastDate) / 7);
  for (let i = 1; i <= week; i++) {
    result.push(<tr classname="calendarTr" key={week + i}>{makeDay(i)}</tr>);
  }
  return result;
};

export default MakeCalendar;

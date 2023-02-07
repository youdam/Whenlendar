import React from "react";
import GroupBoxForBoardList from "../GroupBox/GroupBoxForBoardList";


const GroupListForBoardList = (props) => {

return(
    <>
        {Array.isArray(props.data) ?
        props.data.map((i) => (
            <GroupBoxForBoardList
                key = {i.no}
                no = {i.no}
                userid = {i.userid}
                groupname = {i.groupname}
                time = {i.time.slice(0,10)}
                grade = {i.grade}
                accessiblelevel = {i.accessiblelevel}
  />
        ))
        : null}

    </>
    );

};
export default GroupListForBoardList;

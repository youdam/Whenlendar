
import React from "react";
import ManageMemberBox from "./ManageMemberBox";

const ManageMemberList = (props) => {


    if (!props.data || !props.data.length){
        return <div> data is emty </div> }

    

    console.log('받아온거', props.data );
    console.log('받아온 function 자체는 못보니까 props. : ',  props );

    return (

        

        <>
        <h6> 현 소모임 멤버들 </h6>
        {Array.isArray(props.data) ?
        props.data.map((i) => (
            <ManageMemberBox
                key={i.userid}
                userid = {i.userid}
                usernickname = {i.usernickname}
                grade = {i.grade}
                groupname = {i.groupname}
                time = {i.time.slice(0,10)}
                updateBoardList={props.updateBoardList}
                />

        ))
        : null}
        </>
    );
    
    
};
        
export default ManageMemberList;
import React from "react";
import { Fragment, useContext, useState } from "react";
import { Member } from "../components/User/Admin/MemberList";
import Group from "../components/User/Admin/Group";


const ProfilePage = () => {
  const [member, setMember] = useState(true);
  const [group, setGroup] = useState(false);  

  return (
    <Fragment>
      <button
        onClick={() => {
          setMember(false);
          setGroup(true);          
        }}
      >
        소모임
      </button>
      <button
        onClick={() => {
          setMember(true);
          setGroup(false);          
        }}
      >
        회원
      </button>  
      <div className="userInfo">
        {member && <Member />}
      </div>    
      {group && <Group />}    
    </Fragment>
  );
};

export default ProfilePage;

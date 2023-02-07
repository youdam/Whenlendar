import React, { useContext, useState } from "react";
import AuthContext from "../../../store/authContext";
import { useNavigate } from "react-router-dom";
import "../../../css/admin.css"
import Button from 'react-bootstrap/Button';
import BoardNoteModal from "../../Group/Modals/BoardNoteModal";

const MemberBox = (props: any) => {
  const authCtx = useContext(AuthContext);
  const userid = authCtx.userObj.userid;
  const token = authCtx.token;
  const [selected, setSelected] = useState("");
  const [boardNoteModalOn, setBoardNoteModalOn] = useState(false);
  const navigate = useNavigate();

  const userDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    //console.log("정보:", user);
    const userid = props.userid;
    const useremail = props.useremail;
    const usernickname = props.usernickname;
    authCtx.userDelete(userid, useremail, usernickname);
  };

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setSelected(event.target.value);
    console.log(selected);
  };

  const submitHandler = (event: React.FormEvent, userid: string) => {
    event.preventDefault();
    //console.log('권한변경',selected, userid);
    authCtx.roleChange(selected, userid);
    window.location.reload();
    //navigate("/admin", { replace: true });
  };

  return (    
  <div className="parent_user_list">
    <form onSubmit={(event) => submitHandler(event, props.userid)}>
      <span className="userid">{props.userid}</span>
      <span className="userNickname">{props.usernickname}</span>
      {props.role === 'ROLE_ADMIN' && <span className="userRole">관리자</span>}
      {props.role === 'ROLE_USER' && <span className="userRole">일반유저</span>}
      <span>{props.time}</span>
      <select className="grade" onChange={selectChange} >
        <option>관리등급</option>
        <option value="ROLE_ADMIN">관리자</option>
        <option value="ROLE_USER">일반유저</option>
      </select>
      <Button variant="outline-primary" type='submit' className="button" size="sm">등급 변경</Button>
    </form>
    <Button variant="outline-primary" className="child_user_list button" size="sm" onClick={() => setBoardNoteModalOn(true)}>쪽지</Button>
    <Button variant="outline-danger" className="child_user_list button" size="sm" onClick={userDelete}>탈퇴</Button>
    <BoardNoteModal
        visible={boardNoteModalOn}
        onCancel={() => setBoardNoteModalOn(false)}
        userid={userid}
        recept={props.userid}
        token={token}
        setBoardNoteModalOn={setBoardNoteModalOn}
      />
  </div>  
  );
};

export default MemberBox;

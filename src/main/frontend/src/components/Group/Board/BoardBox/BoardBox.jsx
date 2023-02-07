// # main/frontend/src/compoents/BoardBox/BoardBox.jsx
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../../store/authContext";
import BoardNoteModal from "../../Modals/BoardNoteModal";
import Table from 'react-bootstrap/Table';
import "../../../../DamCss/Component/Component.css"

const BoardBox = (props) => {
  const authCtx = useContext(AuthContext);
  const userid = authCtx.userObj.userid;
  const token = authCtx.token;
  const [boardNoteModalOn, setBoardNoteModalOn] = useState(false);


  const { Admin } = props;
  console.log("BoardBox/Admin: ,", Admin);

  console.log("BoardBox/time : " , props.time.slice(0,10));
  //<Link
  //   to = {"/page"}
  // state = {{
  //    no: props.no,
  // }}
  //>

  return (
    <div className="board-box">
      
    <div className="parent-board-box">
      <div className="child-board-box-tag">{props.tag}</div>
      <Link to={"/page"} state={{ no: props.no, allowcomment: props.allowcomment, Admin: Admin }}>
        <div className="child-board-box-title">
          {props.title} (  {props.commentcount} )
        </div>
      </Link>
      {props.userid !== userid ? (
        <div className="child-board-box-userid" onClick={() => setBoardNoteModalOn(true)}>{props.userid}</div>
      ) : null}
      {props.userid === userid ? <div  className="child-board-box-userid">{props.userid}</div> : null}
      <BoardNoteModal
        visible={boardNoteModalOn}
        onCancel={() => setBoardNoteModalOn(false)}
        userid={userid}
        recept={props.userid}
        token={token}
        setBoardNoteModalOn={setBoardNoteModalOn}
      />
        <div className="child-board-box-readcount">
          {props.readcount} </div>
        <div  className="child-board-box-time"> {props.time} </div>
      </div> 
    </div >
  );

};
export default BoardBox;

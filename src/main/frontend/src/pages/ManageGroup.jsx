import React, { useEffect, useContext } from "react";
import AuthContext from "../store/authContext";
import axios from "axios";     
import { useNavigate, useLocation } from "react-router-dom";
import ManageMemberList from "../components/Group/ManageSide/ManageMember/ManageMemberList";
import BoardList from "../components/Group/Board/BoardList/BoardList";
import { useState } from "react";
//import SelectList from "../components/SelectComponentForModify";
import SelectList from "../components/Group/Board/SelectComponentForModify";
import { EditableSelect } from "./ddd";
import DDD from "./ddd";
import InviteUserModal from "../components/Group/Modals/InviteUserModal";
import NoteAllUserModal from "../components/Group/Modals/NoteAllUserModal";
import "../DamCss/Page/page.css";
import "../DamCss/newCss.css";


const ManageGroup  = () => {
  const location = useLocation();
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const groupname = location.state.groupname.selectedGroup;
  const groupleader = location.state.groupleader.groupLeader;
  const userid = location.state.userid.userid;
  const Admin = location.state.Admin.Admin;
  const [memberListData, setMemeberListData] = useState([]);
  const [BoardListData, setBoardListData] = useState([]);
  const [Choice, setChoice] = useState(null);
  const DeleteMultifle = true
  const [ IsSubmitting, setIsSubmitting] = useState(false);
  const [ Error, setError ] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalForNote ,setShowModalForNote] = useState(false);
  const [fig, setFig] = useState(0);
  const navigate = useNavigate();


  const [jsxElement, setJsxElement] = useState(null)
  const [modyElement, setModyElement]  = useState(null)

  console.log('managegroup-location.staes :  groupleader, userid, Admin : ', groupleader, userid, Admin);

  const deleteGroup = async (event) => {
    setIsSubmitting(true);
    setError(null);

    if (window.confirm('한번 삭제하면 되돌릴 수 없습니다. 삭제하시겠습니까?')){
      

    try {
      const request_data = {groupname : groupname}; 
        let response = await axios({
            method : 'DELETE',
            url: '/api/delete-group/',
            headers: {'Content-type': 'application/json',
                      'Authorization': 'Bearer ' + token},
            data : JSON.stringify(request_data)
            });
      alert("삭제되었습니다");
      navigate("/");
    
    }catch(err){
      setError(err.message);
    }finally{
      setIsSubmitting(false);
    }
  }
  else {
    alert("no?");
  }
  };

  const exampleFunction = () => {

    if (window.confirm('Really go to another page?'))
      {
    
        setJsxElement(<div>Hello, yes!</div>);
      }
    else
      {
    
        setJsxElement(<div>Hello, no!</div>);
      }
  }

  const modifyTag = () => {

    
    if (modyElement === null) {
      const forMody = {
        groupname : groupname,
        groupleader : groupleader,
        userid : userid
      };
      console.log('다음으로 보낼 데이터:' , forMody);
    setModyElement(<SelectList data = { forMody }/>)
  }
    else {
      setModyElement(null);
    }
    

}

  useEffect(() => {

    const getMemberList = async () => {
        let response = await axios.get(`/api/member-list/${groupname}`, {
          headers: {
          'Authorization': 'Bearer ' + token
          }
          });
        setMemeberListData(response.data.data);
        console.log('memberlist : ' , response.data.data);
      };

    const getBoardList = async () => {
        let response = await axios.get(`/api/board-list/${groupname}`, {
          headers: {
          'Authorization': 'Bearer ' + token
          }
          });
        setBoardListData(response.data.data);
        console.log('boardlist : ' , response.data.data);
    };


    getMemberList();
    getBoardList();


    }, [groupname, Choice, fig]);

    console.log('choice : ' , Choice);

    const forMody = {
      groupname : groupname,
      groupleader : groupleader,
      userid : userid
    };

  //callback해야댐. newData라는 state를 사용할겨
  const updateBoardList = () => {
    setFig( fig + 1); 
  };

  console.log('MANAGEGROUP/FIG : ' , fig);
  //updateData={updateBoardList} 콜백함수를 prop으로 애새기한테 넘김 



    return (
        <>
        <div className="dam-managegroup-total">
        <div className="dam-managegroup-buttons">
          <code>
        <button className="dambutton" onClick={()=>setChoice(true)}> 모임인원관리 </button> 
        <button className="dambutton" onClick={()=> setChoice(false)}>게시판관리</button>
        <button className="dambutton" onClick={deleteGroup}>소모임 삭제</button>

          </code>
        </div>
            <h1 className="dam-managegroup-groupname">{groupname}</h1>
            
              { Choice === true  &&  <ManageMemberList data = {memberListData} updateBoardList={updateBoardList}/> }
              { Choice === false &&  <BoardList data = {BoardListData} state = { DeleteMultifle } updateBoardList={updateBoardList} /> }
            
          <div className="dam-managegroup-dd-butons-parents">
            <div className="dam-managegroup-ddd">
              <DDD data = { forMody }/>
              </div>
             {!Admin && <button className="dambutton" onClick={ () => setShowModal(true)}>INVITE</button>}
            {showModal && (
                <InviteUserModal  groupname = {groupname} groupleader = {groupleader} data = {memberListData} onClose={() => setShowModal(false)} />
            )}
            <div>
             {!Admin && <button className="dambutton" onClick={ () => setShowModalForNote(true)}>전체쪽지</button>}
              {showModalForNote && (
                <NoteAllUserModal groupname = {groupname}  groupleader = {groupleader} onClose={() => setShowModalForNote(false)}  />
              )}
          </div>
        </div>
        </div>
        </>
    );
}

export default ManageGroup;
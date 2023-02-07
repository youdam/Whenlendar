import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../../store/authContext";

const InviteUserModal = (props) => {
    //groupname 만 받아오면 됨
    const { groupname, groupleader } = props;
    const [userId, setUserId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    console.log( '초대1', props.data[0].userid );
    console.log( '초대2', props.data[1] );
    const [userList, setUserList] = useState([]);
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;

   

    useEffect(() => {
        const newList = [...userList];
        for(let i = 0; i < props.data.length; i++){
            newList.push(props.data[i].userid);

        }

        console.log('멤버리스트 : ' , newList);

        setUserList(newList);
    }, []);



    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!userId){
            setErrorMessage('초대할 사람의 아이디를 입력해주세요');
            return;
        }


        if(userList.indexOf(userId) !== -1){
            setErrorMessage('이미 가입된 멤버입니다');
            return;
        }

        try {
            let data = {
                no : null,
                send : groupleader,
                recept : userId,
                title : `${groupname}에서 당신을 초대합니다`,
                content : groupname,
                readcheck : 0,
                deleted : 0,
                invitation : true
            };
        await axios.post("/api/invite", data, {
            headers: {
            'Authorization': 'Bearer ' + token
            }
            });
        window.location.reload();
        }catch ( err ){
            console.log('errrrr');
        }

    };



    return (
        <div className="dam-modal-overlay-to-invite">
            <div className="dam-modal-content-to-invite">
                <h2>초대하기</h2>
                <form className="dam-form-invite" onSubmit={handleSubmit}>
                    <input className="dam-input-invite-userid"
                        type = "text"
                        id = "invite-user"
                        value={userId}
                        onChange={(event) => setUserId(event.target.value)}
                    />
                    <label className="dam-label-invite-whom" htmlFor="invite-user"> 회원을 </label>
                    <br />
                    {groupname}
                    <label className="dam-label-invite-whom-for-real" > 에 초대하시겠습니까? </label>
                    <br />
                    <button className="dam-button-yes-invite" type="submit"> 네 </button>
                    <button className="modal-close-button" onClick={props.onClose}>
                    취소
                </button>
                {errorMessage && (
                        <p className="error-message">{errorMessage}</p>
                    )}
                </form>
            </div>
        </div>

    );
};

export default InviteUserModal;
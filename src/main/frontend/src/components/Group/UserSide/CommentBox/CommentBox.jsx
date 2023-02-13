//현재 board의 id값을 가지고 있음 state로 받아옴
import React, { useState, useContext } from "react";
import UpdateAndDelete from "../ForDetail/UpdateAndDelete";
import axios from "axios";
import AuthContext from "../../../../store/authContext";
//import { useNavigate } from "react-router-dom";



const CommentBox = (props) => {
    const [showForm, setShowForm] = useState(false);
 //   const navigate = useNavigate();
    console.log('commentbox : ' , props);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;

    const userid = authCtx.userObj.userid;

    //props 해체쇼
    const { no, contentNo } = props;


    const handleUpdateClick = () => {
        setShowForm(true);
      };
    
    const handleCancelUpdate = () => {
        setShowForm(false);
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);
        
        
        const updatedContent = event.target.elements.updatedContent.value;
       
        
        if (!updatedContent){
            setError("Content is required");
            setIsSubmitting(false);
            return;
        }

        let data = {

            no: Number(no),
            content: updatedContent
        };


        //이전 props의 userid와 토큰(현재 접속 유저)의 userid가 동일해야 해당 기능이 사용가능 
        // update랑 delete 둘다 
        try {
            const response = await axios.post("/api/update-comment", data, {
                headers: {
                'Authorization': 'Bearer ' + token
                }
                });
            if (response.status >= 200 && response.status < 300) {
                alert("db에 요청을 잘 보냈습니다");
                console.log("content_no: 얘는 없어, contentono",  no);
                console.log('바꾼 내용 -> ', updatedContent );
                console.log('contentNo:', contentNo);
                console.log('Number(contentNo)', Number(contentNo));
                console.log('대체 어디로 가길래지랄이고 state: { no : Number(contentNo) }',{ no : Number(contentNo) });
               // window.location.reload();
               // navigate("/page", { state: { no : Number(contentNo) } });
                props.updateCommentList();
                
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }

        
       
        setShowForm(false);
    };
       
       



    const handleDeleteClick = async (e) => {
        e.preventDefault();
        const request_data = { no : no };
        try{
        let response = await axios({
            method: 'delete',
            url: '/api/delete-comment',
            headers: {'Content-Type': 'application/json',
                     'Authorization': 'Bearer ' + token },
            data: JSON.stringify(request_data), 
         
                
        });
        console.log('Detail/handleDeleteBtnClick/response: ', response);
        console.log('contentNo:', contentNo);
        console.log('Number(contentNo)', Number(contentNo));
        console.log('대체 어디로 가는거니 state: { no : Number(contentNo) }',{ no : Number(contentNo) });
        //navigate("/page", { state: { no : Number(contentNo) } });
       // window.location.reload(); 
       props.updateCommentList();

    }catch (err){
        setError(err.message);
    }
};  



    return(
        <>
            <div>
                <h6>*{props.userid} * (이)가  *
                {props.content}   *라고 댓글 달았다</h6>
            </div>
            {error && <p>{error}</p>}
            <div>
            {props.userid === userid && <UpdateAndDelete no = {props.no}
                                 onUpdateClick={handleUpdateClick}
                                 onDeleteClick={handleDeleteClick}/>}
            </div>
            {showForm ? (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="updateContent">Updated Content:</label>
                    <input type="text" name="updatedContent" />
                    <button type="submit" disabled={isSubmitting}>
                    Update
                    </button>
                    <button type="button" onClick={handleCancelUpdate}>
                        Cancle
                    </button>
                </form>
            ) : null}
            </>
            );
        };



export default CommentBox;
import React, {useState, useContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../../store/authContext";


const CommentForm = (prop) => {
    
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const userid = authCtx.userObj.userid;
    const usernickname = authCtx.userObj.usernickname;
    console.log('CommentForm에 boardId = {id} 로 받았음 ->', prop);

    //prop 이 지금 boardId임

    const contentNo = prop;        //  {boardId: 5 }   5는 예시고 이 Object가 아래 data로 들어감 Long타입이 아니라

    const { contentNo : no } = contentNo;
    const { fig, setFig } = prop;    

    const navigate = useNavigate();
    

    

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);


        let data = {
            contentNo: Number(no),
            userid: userid,
            content: content
        }

        try {
            const response = await axios.post("/api/create-comment", data, {
                headers: {
                'Authorization': 'Bearer ' + token
                }
                });
            if (response.status >= 200 && response.status < 300) {
                alert("Comment created successfully");
                setFig(fig + 1);
                console.log('figfig: ', fig);
                navigate("/page", { state: { no: Number(no), allowcomment : true } });
                
            }
        } catch (err) {
            setError(err.message);
        } finally {
            console.log('3. 결국 boardId는 ? : ' , contentNo);
            setIsSubmitting(false);
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <label>
               {usernickname} <h6> | </h6> {userid}  <h6> | </h6> 
            </label>
            <label>
                content :
                <textarea
                    placeholder="Enter content"
                    value={content}
                    onChange={(event)=> setContent(event.target.value)}
                />
            </label>
            <button type="submit" disabled={isSubmitting}>
                댓글달기
            </button>
        </form>
    
      
  </>
    )
};

export default CommentForm;

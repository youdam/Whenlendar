import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../store/authContext";
import { useLocation } from "react-router-dom";
import Detail from "./Detail";
import CommentList from "../components/Group/UserSide/CommentList/CommentList";
import CommentForm from "../components/Group/UserSide/ForDetail/CommentForm";
import axios from "axios";
import "../DamCss/Page/page.css";


const Page = () => {
 
 const location = useLocation();  

 const no = location.state.no;
 console.log('Page.no:' , no );

 const noey = location.state;
 console.log('no없이', noey);

 const authCtx = useContext(AuthContext);
 const token = authCtx.token;


 const  allowcomment  = location.state.allowcomment;
 console.log('allowcomment :', allowcomment);

 const [data, setData] = useState("");
 const [fig, setFig] = useState(0);

  
  console.log('1. page의 fig보자 :' , fig);

  useEffect(() => {
    const getCommentList = async () => {

      let response = await axios.get(`/api/comment-list/${no}`, {
        headers: {
        'Authorization': 'Bearer ' + token
        }
        });
      setData(response.data.data);
    }
    getCommentList();
    
  }, [fig]);    // [id, data]로 바꿔

  const updateCommentList = () => {
    setFig(fig + 1);

  }

  
  return (
      <div className="page">
        <Detail no={no} />
        <CommentList data={data}
                      updateCommentList = {updateCommentList} /> 
                       
        {allowcomment === true &&<CommentForm contentNo={no}
                      fig={fig} 
                      setFig={setFig} />}
       
      </div>
    );
  }

  export default Page;
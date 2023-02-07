import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import CenterBox from "./CenterBox";
import { Link } from 'react-router-dom';
import AuthContext from "../../store/authContext";
import "../../DamCss/Component/Component.css"

const Announcement = () => {
    const [lists, setList] = useState([]);
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const isLogin = authCtx.isLoggedIn;
    const role = authCtx.userObj.role;
    const announce = "announce";

    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(lists.length / itemsPerPage);

    useEffect ( () =>{
        const getAnnouncementList = async () => {
            let res = await axios({
                method : 'GET',
                url : `/direct/get-service-center/${1}`,
                headers: {'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token}
            });
            setList(res.data.data);
        };
        getAnnouncementList();
    }, [])

    if (!lists || !lists.length){
        return <div> data is emty</div>
    }

    const renderPageLinks = () => {
        const pageLinks = [];
        pageLinks.push(
            <button className="damclick-left" key="prev" onClick={ () => setPage(page - 1)}>
            Prev
            </button>
        );
    
        for (let i =1; i <= totalPages; i++){
            const className = i === page ? 'current-page' : '';
            pageLinks.push(
              <button key={i} className={`damclick-number ${i === page ? 'current-page' : ''}`} onClick={ () => setPage(i)}>
                {i}
              </button>
            );
         }
        
        pageLinks.push(
            <button className="damclick-right" key="next" onClick = { () => setPage(page + 1)}>
            Next
        </button>
        );

    return pageLinks;

    }

    const startIndex = (page - 1) * itemsPerPage;

    const items = lists.slice(startIndex, startIndex + itemsPerPage);



    const listsEliments = items.map(list => {

        return (
            <div key={list.no}>
                <CenterBox 
                    key = {list.no}
                    no = {list.no}
                    title ={list.title}
                    userid = {list.userid}
                    content = {list.content}
                    time = {list.time}
                    tag = {list.tag}
                    parents = {announce}
                    />
            </div>
        );
    });

    /*
    <div>
          {isLogin && role ==='ROLE_ADMIN' &&<CreateAnnounceOrFAQ parents={announce} />}
        </div>
    */


    return(

        <>
        <div className="DamcolDam">
        <div className="parent-board-box">
         <div className="damone">말머리</div>  <div className="damtwo">질문</div> <div className="damone">작성자</div>
         </div>
        <div className="Damthi">{listsEliments}</div>
        </div>

        <div className="damPagination" >{renderPageLinks()}</div>
        <div>

        {isLogin && role === 'ROLE_ADMIN' && <Link to={"/create-annouce-or-faq"}
                state={{ 
                parents: announce, tagList: null }}>
        <input className="dambutton" type='button' value='게시글 작성하기'/>
            </Link>}
        </div>   
        

        </>
    )
};

export default Announcement;
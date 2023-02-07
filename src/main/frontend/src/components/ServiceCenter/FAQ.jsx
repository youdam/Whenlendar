import React, {useContext, useState, useEffect} from "react";
import AuthContext from "../../store/authContext";
import { Link } from 'react-router-dom';
import axios from "axios";
import CenterBox from "./CenterBox";
import "../../DamCss/Component/Component.css"


const FAQ = (props) => {

    const [lists, setList] = useState([]);
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const isLogin = authCtx.isLoggedIn;
    const role = authCtx.userObj.role;
    const faq = "FAQ";

    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(lists.length / itemsPerPage);


    //태그별 fag 보기
    const [selectedTag, setSelectedTag] = useState('');

    const filterByTag = (tag) => {
        setSelectedTag(tag);
        return lists.filter(list => list.tag === tag);
    }    
 
  
    useEffect ( () =>{
        const getFAQList = async () => {
            let res = await axios({
                method : 'GET',
                url : `/direct/get-service-center/${2}`,
                headers: {'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token}
            });
            setList(res.data.data);
        };
        getFAQList();
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


    //보내줘야하는 taglist 만들어야댐

    const tagList = lists.reduce((acc, list) => {
        if (!acc.includes(list.tag)){
            acc.push(list.tag);
        }
        return acc;
    }, []).map(tag => ({value: tag, label: tag}));

    console.log('taglist? : ', tagList);


    const startIndex = (page - 1) * itemsPerPage;
    //const filteredLists = selectedTag ? filterByTag(selectedTag) : lists; 무한랜더링되노
    const filteredLists = selectedTag ? 
        lists.filter(list => list.tag === selectedTag).slice(startIndex, startIndex + itemsPerPage) 
        : lists.slice(startIndex, startIndex + itemsPerPage);






    const listsEliments = filteredLists.map(list => {

        return (
            <div key={list.no}>
                <CenterBox 
                    key = {list.no}
                    no = {list.no}
                    title ={list.title}
                    userid = {list.userid}
                    content = {list.content}
                    time = {list.time.slice(0,10)}
                    tag = {list.tag}
                    parents = {faq}
                    />
            </div>
        );
    });

    /*
        {isLogin && role ==='ROLE_ADMIN' &&<CreateAnnounceOrFAQ parents={faq} tagList={tagList}/>}

        /create-annouce-or-faq
    */


    return (


        <>
        <div className="dam-faq-buttons-onetwothree">
            <button className="dam-faq-small-one" onClick={() => filterByTag('달력')}>달력</button>
            <button className="dam-faq-small-one" onClick={() => filterByTag('소모임')}>소모임</button>
            <button className="dam-faq-small-one" onClick={() => filterByTag('기타')}>기타</button>
        </div>
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
                    parents: faq, tagList: tagList }}>
        <input className="dambutton" type='button' value='게시글 작성하기'/>
            </Link>}
        </div>   
      
        </>

    )
};

export default FAQ;
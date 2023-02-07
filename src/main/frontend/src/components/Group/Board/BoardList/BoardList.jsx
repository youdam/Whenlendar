// # main/frontend/src/componets/BoardList/BoardList.jsx

import React, { useState, useContext } from "react";
//import BoardBox from "../../../BoardBox/BoardBox";
import BoardBox from "../BoardBox/BoardBox";

import 'react-input-checkbox/lib/react-input-checkbox.min.css';
import axios from "axios";
import AuthContext from "../../../../store/authContext";
import "../../../../DamCss/Component/Component.css";

const BoardList = (props) => {

  //main인 경우 그냥 네개만 보여주기. only4가 없다면 false가 default
  const { only4 = false} = props;
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  
  console.log('1. props는 부모한테 받은 정보 boerdList/props : ', props);
  console.log('2. props.data랑 props랑 무슨차이일까 boerdList/props.data : ', props.data);
  const { state } = props;
  const [DeleteMultiple, setDeleteMultiple] = useState(state);
  const [selectedItems, setSelectedItems] = useState([]);
  const [data, setData] = useState("");
  const [fig, setFig] = useState(0);
  const { Admin } = props;

  console.log('BoardList/Admin? : ' , Admin);
  //main

  
  //페이징
  const [page, setPage] = useState(1); //현재 페이지
  const itemsPerPage = 10; //보여줄 게시글 갯수

  //페이지 계산
  const totalPages = Math.ceil(props.data.length / itemsPerPage );

  //해당 숫자로 가서 보기
  const [jumpToPage, setJumpToPage] = useState('');


  if (!props.data || !props.data.length){
    return <div> data is emty </div>
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

  /*
   pageLinks.push(
      <div key = "jump-to">
        <input value={jumpToPage} onChange = {e => setJumpToPage(e.target.value)}/>
        <button onClick={ () => setPage(jumpToPage)}>Go</button>
      </div>
    );
  */


  // 시작점 계산
  const startIndex = (page - 1) * itemsPerPage;


  
  const items = only4 ? props.data.slice(0, 4) :  props.data.slice(startIndex, startIndex + itemsPerPage);
  //const items = props.data.slice(startIndex, startIndex + itemsPerPage);

  //관리자의 true로 온 경우, 댓글 여러개 삭제 가능. 일반으로 접근시 true아니고 undefined.
  const DeleteMultifle = props.state;

  console.log('true면 삭제가능. undefined면 불가능 : ', DeleteMultifle);

  const handleCheckboxChange = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }


  //MAPPING + checkbox 아힘드러
  const itemEliments = items.map(item => {
    return (
      <div key={item.no}>
        {DeleteMultiple && <input type="checkbox" value={item.no} onChange={() => handleCheckboxChange(item.no)} />} 
      <BoardBox
                key = {item.no}
                no = {item.no}
                title = {item.title}
                userid = {item.userid}
                content = {item.content}
                readcount = {item.readcount}
                groupname = {item.groupname}
                time = {item.time.slice(0,10)}
                allowcomment = {item.allowcomment}
                tag = {item.tag}
                commentcount = {item.commentCount}
                Admin = {Admin}
      />
    </div>
    );
  });

  //선택된 게시글들 삭제 

console.log('1seleteditem모지 : ', selectedItems);
console.log('1진짜 보내는건? :', {data});
  const deleteSelectedItems = async () => {
    
    try{
      await axios.delete('/api/delete-multiple', { data :  selectedItems  }, {
        headers: {
          'Authorization': 'Bearer ' + token
        }}
      );
      setSelectedItems([]);
      await props.updateBoardList();
    }catch(err){
        console.log(err)
      }
    };

  //const updatedData = props.data.filter(item => !selectedItems.inclusdes(item.no));

  return(
    <div>
    <div>{itemEliments}</div>
    <div>
      {selectedItems.length > 0 && (
        <button onClick={() =>
        deleteSelectedItems()}>Delete Selected Items</button>
      )}
      </div>
      <div className="damPagination">
      {!only4 ? renderPageLinks() : null}
      </div></div>
  );
};

export default BoardList;
import React, { useState } from "react";
import GroupBox from "../GroupBox/GroupBox";
import "../../../../DamCss/Component/Component.css";


const GroupList = (props) => {

    const [page, setPage] = useState(1); 
    const itemsPerPage = 5;

    const totalPages = Math.ceil(props.data.length / itemsPerPage);

    if (!props.data || !props.data.length){
        return <div className="dam-data-is-emty"> data is emty </div>
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
const items = props.data.slice(startIndex, startIndex + itemsPerPage);
    
const itemEliments = items.map(item => {
    return (
        <div key = {item.no}>
            <GroupBox
                    key = {item.no}
                    no = {item.no}
                    groupleader = {item.groupleader}
                    groupname = {item.groupname}
                    time = {item.time.slice(0,10)}
                    grade = {item.grade}
                    Admin = {props.Admin}
                    updateGroupList = {props.updateGroupList}
            />

        </div>
    );
});


if(props.Admin){
    //관리자 모드인 경우만 페이징. 
    console.log("true", props.Admin);

    return(
        <>

        <div>
            <div>{itemEliments}</div>

            <div className="damPagination"> {renderPageLinks()} </div>
        </div>
        
        </>
        );

}else if(!props.Admin){
    console.log('관리자 모드로 접근하지 않았습니다');
    //페이징 안함.여기는 그냥 리스트임. 

    return(
        <>
            {Array.isArray(props.data) ?
            props.data.map((i) => (
                <GroupBox
                    key = {i.no}
                    no = {i.no}
                    userid = {i.userid}
                    groupname = {i.groupname}
                    time = {i.time.slice(0,10)}
                    grade = {i.grade}
                    accessiblelevel = {i.accessiblelevel}
                    updateGroupList = {props.updateGroupList}
    
      />
            ))
            : null}
    
        </>
        );
};



};
export default GroupList;

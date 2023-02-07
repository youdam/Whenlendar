import React, { useContext, useEffect, useState } from "react"
import AuthContext from '../../store/authContext';
import {InquiryInterface} from './InquiryInterface';
import * as InquiryService from "../../service/InquiryService";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import InquiryReply from "./InquiryReplyComponent"
import { Right } from "react-bootstrap/lib/Media";

const InquiryRead: React.FC = (props: any) => {
    const [inquiryRead, setInquiryRead] = useState<Array<InquiryInterface>>([]);
    const [inputReply, setInputReply] = useState(false);
    const [isUpdating, setIsUpdating] = useState<number | null>(null);
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    // url 파라미터 가져오기
    const location = useLocation();
    const no:any  = queryString.parse(location.search).no;
    const grpNo:any = queryString.parse(location.search).no;
    const userId = authCtx.userObj.userid;
    const userRole = authCtx.userObj.role;
    const navigate = useNavigate();
    useEffect(() => {

        getInquiryRead(no, token)
       
    },[]);

    const getInquiryRead = async (no: string, token: string) => {
        const readData = InquiryService.getInquiryRead(no, token);
        const newInquiryRead = (await readData).data.inquiryRead
        setInquiryRead(newInquiryRead)
        console.log('listData', (await readData).data)
        console.log('inquiryRead', inquiryRead)
    }
    
    const reply = () =>{
        setInputReply(!inputReply);
        console.log("버튼")
    }


    const deleteInquiry = (no :any) => {
        InquiryService.inquiryDelete(no, token).then((res) =>{
            if(res.status === 200) {
                alert("삭제하였습니다")
                getInquiryRead(grpNo, token)
            }else{
                alert("실패!");
            }
        });
    }
    //답글달고 목록 다시 불러오기
    const updatingInfo = ()=> {
        getInquiryRead(grpNo, token)
    }

    //수정버튼 눌렀을 때 상태변화
    const handleUpdateClick = (no:any) => {
        setIsUpdating(no)
    }

    //수정메소드
    const inquiryUpdate = async (event:any) =>{
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        const no:any = isUpdating
        const inquiry = {
            no: no
            ,title: form.title.value
            ,content: form.content.value
        }
        InquiryService.inquiryUpdate(inquiry, token).then((res) =>{
            if(res.status ===200) {
                setIsUpdating(null)
                getInquiryRead(grpNo, token)
            }else{
                alert("실패!")
            }
        })
        
    }

    return (
   
        <>
        {/* 업데이트 폼 */}
        <div className = "card col-md-6 offset-md-3">
            <h3 className = "text-center"> 1:1 문의 상세보기 </h3>
        { Array.isArray(inquiryRead) && inquiryRead.map((inquiry: InquiryInterface) =>
           <div className = "card-body" key={inquiry.no}>
            {isUpdating === inquiry.no? (
                <form onSubmit={inquiryUpdate}>
                    <div className="row">
                        <label>작성자: {inquiry.userId}</label>
                        <label>작성시간:{inquiry.time}</label>
                        <label>제 목</label>
                        <input type="text" id="title" defaultValue={inquiry.title} style={{width: "auto", flex:"1", margin: "2%", resize:"none"}}/>
                        <div className="row" style={{height:"50%", flexGrow:"1"}}>
                            <label>내용</label>
                            <textarea id="content" defaultValue={inquiry.content} style={{height:"20%", width: "auto", flex: "1", margin: "2%", resize: "vertical"}}/>
                        </div>
                    </div>
                    <div style={{float:"right"}}>
                    <button className = "btn btn-primary" type="submit" > 수정하기 </button>
                    <button className = "btn btn-primary" onClick={ ()=> setIsUpdating(null)}>취  소</button>
                    </div>
                </form>
            ):

              (  
                <>
                <div className="row">
                    <label>작성자 : {inquiry.userId}</label>
                    <label>작성시간 : {inquiry.time}</label>
                    <label>제목 : {inquiry.title} </label>
                    <br></br>
                </div>
                <div className = "row">
                    <label>내 용</label>
                    <textarea value={inquiry.content} readOnly style={{flex: "1", margin: "2%", resize: "none"}}/>
                </div>
                <div className= "buttons" style={{float:"right"}}>
                    {inquiry.userId === userId && <button className = "btn btn-primary"onClick={()=> handleUpdateClick(inquiry.no)}> 수정하기</button>}               
                    {inquiry.userId === userId? <button className = "btn btn-primary"onClick={()=> deleteInquiry(inquiry.no)}> 삭제하기</button> :
                     userRole ==='ROLE_ADMIN' && <button className = "btn btn-primary"onClick={()=> deleteInquiry(inquiry.no)}> 삭제하기</button>} 
                </div>
                <br></br>
                </>
            )
        }
            </div>
        )}  
        {!inputReply}
        <button className = "btn btn-primary" onClick={()=> reply()}> {inputReply? "답글닫기" : "답글달기"} </button>
        <hr/>
        {inputReply && <InquiryReply updatingInfo={updatingInfo} />}
        {}
        </div>
        </>

    );

};
export default InquiryRead;
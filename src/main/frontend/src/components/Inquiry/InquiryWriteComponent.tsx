/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */

import React, { useContext, useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as InquiryService from "../../service/InquiryService";
import AuthContext from '../../store/authContext';
import {InquiryInterface} from '../Inquiry/InquiryInterface';

const InquiryWrite: React.FC = (props: any) => {
// html5 validation 시행
    const [validated, setVaildated] = useState(false);
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const userId = authCtx.userObj.userid;
    const navigate = useNavigate();
    
    const handleSubmit = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (!form.checkValidity()) {
            setVaildated(false);
            return;
        }
        setVaildated(true);
        console.log('실행test')
        console.log(form.titleInput.value);
        const inquiry = {
            title: form.titleInput.value,
            content: form.contextText.value,
            userId: userId
        }
        
        writeInquiry(inquiry, token);
    };

    const writeInquiry = async (inquiry: InquiryInterface, token: string) => {
        InquiryService.inquiryWrite(inquiry, token).then((res)=>{
            navigate(-1)
         })
    }
    

    //읽기 폼 함수 


    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="titleInput"> 
                 <Form.Label>제목</Form.Label>
                 <Form.Control required as ="textarea" rows = {1}/>
                 <Form.Control.Feedback type="invalid"> 제목을 입력하세요 </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="contextText">
                <Form.Label>내용</Form.Label>
                <Form.Control required as="textarea" rows={20}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                등록
            </Button>
            <Button variant="primary" onClick={ () => navigate(-1)}> 취소 </Button>
        </Form>

    );
}

export default InquiryWrite;
import React, { SetStateAction, useContext, useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from '../../store/authContext';
import * as InquiryService from "../../service/InquiryService";
import {InquiryInterface} from './InquiryInterface';
import queryString from "query-string";

const InquiryReply = (props: { updatingInfo: () => void}) => {
  
    const [validated, setValidated] = useState(false);
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const userId = authCtx.userObj.userid;
    const navigate = useNavigate();
    const location = useLocation();
    const no:any  = queryString.parse(location.search).no;
    const handleSubmit = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if(!form.checkValidity()) {
            setValidated(false);
            return;
        }
        setValidated(true);
        console.log('실행test')
        console.log(form.titleInput.value);
        const inquiry = {
            title: form.titleInput.value,
            content: form.contextText.value,
            userId: userId,
            grpNo: no
        }

        writeInquiryReply(inquiry, token);
        form.titleInput.value=''
        form.contextText.value=''
    };

    const writeInquiryReply = async (inquiry: InquiryInterface, token: string) => {
        InquiryService.inquiryReply(inquiry, token).then(props.updatingInfo)
        console.log("입력")
        console.log(no)
       
    }


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
        </Form>
    );
}

export default InquiryReply;

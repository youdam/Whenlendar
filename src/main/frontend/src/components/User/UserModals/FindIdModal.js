import React, { useState, useEffect, useCallback, useContext } from 'react'
import { Modal, Button, Form, Container } from 'react-bootstrap'
import axios from 'axios'

const SignUpModal = ({ show, onHide }) => {
    
    const [useremail, setUseremail] = useState('');
    

    const dataReset = () => {
        setUseremail('')
    }
    const handleChange_useremail = useCallback((e) => {
        e.preventDefault();
        setUseremail(e.target.value);
        console.log('오류' + useremail)
    }, [useremail]);

    const handleSubmit = (e) => {       
        e.preventDefault();
        console.log('submit:'+useremail)
        axios.post('/auth/findid', { useremail: useremail })
            .then((res) => {
                const data = res.data;
                if (data !== '') {
                    alert("아이디는 " + data + " 입니다.")                    
                    console.log('정상:' + data)                    
                } else if (data == '') {
                    alert("이메일을 다시 입력해 주세요")                                        
                }
            });         
            
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Container>
                <Modal.Header closeButton onClick={dataReset}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        회원가입
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="my-3">
                            <Form.Label>이메일</Form.Label>
                            <Form.Control type="useremail" placeholder="이메일을 입력하세요" value={useremail || ''} onChange={handleChange_useremail} />                            
                        </Form.Group>
                        <Button variant="info" type="submit" className="my-3">
                            찾기
                        </Button>
                    </Form>
                </Modal.Body>
            </Container>
        </Modal>
    )
}

export default SignUpModal
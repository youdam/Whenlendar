import React, { useRef, useState, useContext } from 'react'
import { Modal, Button, Form, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../store/authContext';
import FindIdModal from './FindIdModal';
import FindPwModal from './FindPwModal';


const SignInModal = ({ show, onHide }) => {


    const [FindIdModalOn, setFindIdModalOn] = useState(false);
    const [FindPwModalOn, setFindPwModalOn] = useState(false);
    const [userid, setUserid] = useState(false);
    const [userpw, setUserpw] = useState(false);

    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const authCtx = useContext(AuthContext);

    const handleChange_userid = (e) => {
      e.preventDefault();
      setUserid(e.target.value);
      console.log("오류" + userid);
    }

    const handleChange_userpw = (e) => {
      e.preventDefault();
      setUserpw(e.target.value);
      console.log("오류" + userid);
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        setIsLoading(true);
        authCtx.login(userid, userpw);
        setIsLoading(false);

        if (authCtx.isSuccess) {
            navigate("/", { replace: true });
        }

    }

    return (
        <><FindIdModal
            show={FindIdModalOn}
            onHide={() => setFindIdModalOn(false)} />
            <FindPwModal
                show={FindPwModalOn}
                onHide={() => setFindPwModalOn(false)} />
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Container>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            로그인
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={submitHandler}>
                            <Form.Group className="my-3">
                                <Form.Label>아이디</Form.Label>
                                <Form.Control type="text" id='userid' value={userid || ""} onChange={handleChange_userid} placeholder="아이디를 입력하세요" />
                            </Form.Group>

                            <Form.Group className="my-3">
                                <Form.Label>비밀번호</Form.Label>
                                <Form.Control type="password" id='userpw' value={userpw || ""} onChange={handleChange_userpw} placeholder="비밀번호를 입력하세요" />
                            </Form.Group>

                            <Form.Group className="my-3">
                                <Button variant="info" type="submit">
                                    로그인
                                </Button>
                            </Form.Group>
                            {isLoading && <p>Loading</p>}
                            <Button variant="info" type="button" onClick={() => setFindIdModalOn(true)}>
                                아이디 찾기
                            </Button>
                            <Button variant="info" type="button" onClick={() => setFindPwModalOn(true)}>
                                비밀번호 찾기
                            </Button>
                        </Form>
                    </Modal.Body>
                </Container>
            </Modal></>
    )
}

export default SignInModal
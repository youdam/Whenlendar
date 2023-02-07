import React, { useState, useEffect, useCallback, useContext } from 'react'
import { Modal, Button, Form, Container } from 'react-bootstrap'
import axios from 'axios'
import AuthContext from '../../../store/authContext'


const SignUpModal = ({ show, onHide }) => {

    const [userid, setUserid] = useState('');
    const [userpw, setUserpw] = useState('');
    const [usernickname, setUsernickname] = useState('');
    const [useremail, setUseremail] = useState('');
    const [checkUserpw, setcheckUserpw] = useState('');
    const [idCheckMsg, setIdCheckMsg] = useState('');         // id 사용가능 메세지
    const [nickCheckMsg, setNickCheckMsg] = useState('');     // 별명 사용가능 메세지
    const [emailCheckMsg, setEmailCheckMsg] = useState('');   // email 사용가능 메세지
    const [pwCheckMsg, setPwCheckMsg] = useState('');         // 비밀번호 사용가능 메세지
    const [pwCheckCheckMsg, setPwCheckCheckMsg] = useState('');         // 비밀번호 사용가능 메세지
    const [idcolor, setIdColor] = useState();
    const [emailcolor, setEmailColor] = useState();
    const [nickcolor, setNickColor] = useState();
    const [pwcolor, setPwColor] = useState();
    const [pwcheckcolor, setPwCheckColor] = useState();
    const authCtx = useContext(AuthContext);



    const dataReset = (e) => {
        setUserid('')
        setUserpw('')
        setcheckUserpw('')
        setUsernickname('')
        setUseremail('')
    }
    const handleChange_userid = useCallback((e) => {
        e.preventDefault();
        setUserid(e.target.value);
    }, [userid]);

    // 아이디 중복체크    
    useEffect(() => {
        const regExp = /^[a-z0-9_-]{4,21}$/g;
        if (!regExp.test(userid) || userid.length < 5) {
            setIdCheckMsg("아이디는 4글자 이상의 영문 소문자와 숫자의 조합으로 입력해주세요.");
            setIdColor({ color: "black" });
            console.log('오류' + idCheckMsg)
        } else {
            setIdCheckMsg("");
            console.log('정상')            
            axios.post('/auth/userCheck', {userid: userid})
                .then((res) => {
                    const resMessge = res.data;
                    if (resMessge === 0) {
                        setIdCheckMsg("사용 가능한 아이디입니다.");
                        setIdColor({ color: "green" });
                        console.log('정상' + idCheckMsg)
                    } else if (resMessge >= 1) {
                        setIdCheckMsg("이미 사용중인 아이디입니다.");
                        setIdColor({ color: "red" });
                        console.log('오류' + idCheckMsg)
                    }
                });
        }
    }, [userid]);

    const handleChange_userpw = useCallback((e) => {
        e.preventDefault();
        setUserpw(e.target.value);
    }, [userpw]);


    // 비밀번호 확인
    useEffect(() => {
        const regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/g;
        if (!regExp.test(userpw)) {
            setPwCheckMsg("8~16자 영문, 숫자, 특수문자를 사용하세요.");
            setPwColor({ color: "black" });
            console.log('오류' + pwCheckMsg + userpw)
        } else {
            setPwCheckMsg('');
        }
    }, [userpw]);


    const handleChange_checkUserpw = useCallback((e) => {
        e.preventDefault();
        setcheckUserpw(e.target.value);
    }, [checkUserpw]);

    //비밀번호 확인 일치 체크
    useEffect(() => {        
        if (userpw !== checkUserpw) {
            setPwCheckCheckMsg("비밀번호가 일치하지 않습니다.");
            setPwCheckColor({ color: "red" });            
        } else {
            setPwCheckCheckMsg('');
        }
    }, [checkUserpw]);


    const handleChange_usernickname = useCallback((e) => {
        e.preventDefault();
        setUsernickname(e.target.value);
    }, [usernickname]);    

    // 닉네임 중복체크
    useEffect(() => {
        const regExp = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/g;        // 닉네임: 영문/숫자/한글 조합으로만
        if (!regExp.test(usernickname)) {
            setNickCheckMsg("닉네임은 한글과 영문, 숫자의 조합으로 입력해주세요.");
            setNickColor({ color: "black" });
            console.log('오류' + nickCheckMsg)
        } else {
            setNickCheckMsg("");
            console.log('정상')
            axios.post('/auth/nicknameCheck', { usernickname: usernickname })
                .then((res) => {
                    const resMessge = res.data;
                    if (resMessge === 0) {
                        setNickCheckMsg("사용 가능한 닉네임입니다.");
                        setNickColor({ color: "green" });
                        console.log('정상' + nickCheckMsg)
                    } else if (resMessge === 1) {
                        setNickCheckMsg("이미 사용중인 닉네임입니다.");
                        setNickColor({ color: "red" });
                        console.log('오류' + nickCheckMsg)
                    }
                });
        }
    }, [usernickname]);


    const handleChange_useremail = useCallback((e) => {
        e.preventDefault();
        setUseremail(e.target.value);
    }, [useremail]);

    //이메일 중복체크
    useEffect(() => {
        const regExp = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{3,4}|[0-9]{1,3})(\]?)$/g;
        if (!regExp.test(useremail)) {
            setEmailCheckMsg("이메일을 입력해주세요");
            setEmailColor({ color: "black" });
            console.log('오류' + emailCheckMsg)
        } else {
            setEmailCheckMsg("");
            console.log('정상')
            axios.post('/auth/emailCheck', { useremail: useremail })
                .then((res) => {
                    const resMessge = res.data;
                    if (resMessge === 0) {
                        setEmailCheckMsg("사용 가능한 이메일입니다.");
                        setEmailColor({ color: "green" });
                        console.log('정상' + emailCheckMsg)
                    } else if (resMessge === 1) {
                        setEmailCheckMsg("이미 사용중인 이메일입니다.");
                        setEmailColor({ color: "red" });
                        console.log('오류' + emailCheckMsg)
                    }
                });
        }
    }, [useremail]);    


    const handleSubmit = (e) => {
        if (userid === '') {
            e.preventDefault();
            return alert('아이디를 입력해주세요');
        }
        else if (userpw === '') {
            e.preventDefault();
            return alert('비밀번호를 입력해주세요');
        }
        else if (checkUserpw === '') {
            e.preventDefault();
            return alert('비밀번호확인을 입력해주세요');
        }
        else if (userpw !== checkUserpw) {
            e.preventDefault();
            return alert('비밀번호와 비밀번호 확인이 같지 않습니다.');
        }
        else if (usernickname === '') {
            e.preventDefault();
            return alert('닉네임을 입력해주세요');
        }
        else if (useremail === '') {
            e.preventDefault();
            return alert('이메일을 입력해주세요');
        }
        else if (idCheckMsg !== '사용 가능한 아이디입니다.') {
            e.preventDefault();
            return alert('아이디 형식이 올바르지 않습니다.');
        }
        else if (pwCheckMsg !== '') {
            e.preventDefault();
            return alert('비밀번호 형식이 올바르지 않습니다.');
        }
        else if (nickCheckMsg !== '사용 가능한 닉네임입니다.') {
            e.preventDefault();
            return alert('닉네임 형식이 올바르지 않습니다.');
        }
        else if (emailCheckMsg !== '사용 가능한 이메일입니다.') {
            e.preventDefault();
            return alert('이메일 형식이 올바르지 않습니다.');
        }

        authCtx.signup(
            userid,
            userpw,
            usernickname,
            useremail
          );
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
                            <Form.Label>아이디</Form.Label>
                            <Form.Control type="text" placeholder="아이디를 입력하세요" value={userid || ''} onChange={handleChange_userid} />
                            <span style={idcolor}> {idCheckMsg} </span>
                        </Form.Group>

                        <Form.Group className="my-3">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control type="password" placeholder="비밀번호를 입력하세요" value={userpw || ''} onChange={handleChange_userpw} />
                            <span style={pwcolor}> {pwCheckMsg} </span>
                        </Form.Group>

                        <Form.Group className="my-3">
                            <Form.Label>비밀번호 확인</Form.Label>
                            <Form.Control type="password" placeholder="비밀번호를 입력하세요" value={checkUserpw || ''} onChange={handleChange_checkUserpw} />
                            <span style={pwcheckcolor}> {pwCheckCheckMsg} </span>
                        </Form.Group>

                        <Form.Group className="my-3">
                            <Form.Label>닉네임</Form.Label>
                            <Form.Control type="text" placeholder="닉네임을 입력하세요" value={usernickname || ''} onChange={handleChange_usernickname} />
                            <span style={nickcolor}> {nickCheckMsg} </span>
                        </Form.Group>

                        <Form.Group className="my-3">
                            <Form.Label>이메일</Form.Label>
                            <Form.Control type="useremail" placeholder="이메일을 입력하세요" value={useremail || ''} onChange={handleChange_useremail} />
                            <span style={emailcolor}> {emailCheckMsg} </span>
                        </Form.Group>
                        <Button variant="info" type="submit" className="my-3">
                            가입
                        </Button>
                    </Form>
                </Modal.Body>
            </Container>
        </Modal>
    )
}

export default SignUpModal
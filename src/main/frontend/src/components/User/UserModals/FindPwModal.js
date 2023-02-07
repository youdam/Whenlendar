import React, { useState, useEffect, useCallback, useContext } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import axios from "axios";

const SignUpModal = ({ show, onHide }) => {
  const [userid, setUserid] = useState("");

  const dataReset = () => {
    setUserid("");
  };
  const handleChange_userid = 
    (e) => {
      e.preventDefault();
      setUserid(e.target.value);
      console.log("오류" + userid);
    }
    
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { 'userid': userid };

    console.log("submit:" + userid);
    axios.post('/auth/sendEmail', data).then((res) => {
      const data = res.data;
      if (data !== '') {
        alert("이메일을 확인해 주세요");
        console.log("정상:" + data);
      } 
    });
  };

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
            비밀번호 찾기
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="my-3">
              <Form.Label>아이디</Form.Label>
              <Form.Control
                type="useremail"
                placeholder="아이디를 입력하세요"
                value={userid || ""}
                onChange={handleChange_userid}
              />
            </Form.Group>
            <Button variant="info" type="submit" className="my-3">
              찾기
            </Button>
          </Form>
        </Modal.Body>
      </Container>
    </Modal>
  );
};

export default SignUpModal;

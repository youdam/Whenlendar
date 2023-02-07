import React, {
  useState,
} from "react";
import { Modal, Container } from "react-bootstrap";
import * as NoteService from "../../../service/NoteService"

const BoardNoteModal = ({ visible, onCancel, userid, recept, token, setBoardNoteModalOn }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const changeTitleHandler = (event) => {
    setTitle(event.target.value);
  };
  const changeContentHandler = (event) => {
    setContent(event.target.value);
  };

  const noteWrite = (event) => {
    const sendData = ({
      send: userid,
      recept: recept,
      title: title,
      content: content,
    })
    console.log('쪽지보내기',sendData)
    NoteService.noteWrite(sendData, token)    
    setBoardNoteModalOn(false)
  };

  if (!visible) return null;
  return (
    <Modal
      show={visible}
      onHide={onCancel}
      size="mi"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Container>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            쪽지 보내기
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="form-group">
              <label> Recept: </label> &nbsp;
              <label> {recept} </label>
            </div>
            <div className="form-group">
              <label> Title </label>
              <input
                type="text"
                placeholder="제목"
                onChange={changeTitleHandler}
              />
            </div>
            <div className="form-group">
              <label> Content </label>
              <textarea
                placeholder="내용"
                name="content"
                onChange={changeContentHandler}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="choice" onClick={noteWrite}>
            보내기
          </button>
          <button className="choice" onClick={onCancel}>
            Cancel
          </button>
        </Modal.Footer>
      </Container>
    </Modal>
  );
};

export default BoardNoteModal;

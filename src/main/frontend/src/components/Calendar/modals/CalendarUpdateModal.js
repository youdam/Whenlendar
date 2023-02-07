import React, {
  useState,  
  useCallback,
  useReducer,
  useContext,
} from "react";
import { Modal, Container } from "react-bootstrap";
import axios from "axios";
import Style from "../module/Style";
import ModalReducer from "../containers/reducer/ModalReducer";
import AuthContext from "../../../store/authContext";

const CalendarUpdateModal = ({
  targetdate,
  visible,  
  onCancel,
  todo,  
}) => {  
  const initialState = {
    color: "",
    todos: "",
    checked: false,
    date: "",
  };

  const [state, dispatch] = useReducer(ModalReducer, initialState);
  const [memo, setMemo] = useState([]);

  const info = todo[targetdate];
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  // 초기화
  const Initialization = () => {
    dispatch({ type: "INITIALIZATION" });
  };

  // 수정된 메모
  const handleChange = useCallback((index, e) => {
    const newValues = [...memo];
    newValues[index] = e.target.value;
    setMemo(newValues);
  }, [memo]);
  
  // 입력 취소
  const cancel = () => {
    onCancel();
    Initialization();
  };

  // 삭제
  const remove = () => {
    // 선택된 목록 가져오기
    const inputElements = document.querySelectorAll("input[name='info']:checked");
    const values = [];
    for (let input of inputElements) {
        const value1 = input.getAttribute("value1");
        const value2 = input.getAttribute("value2");
        values.push({value1, value2});
    } 

    // 선택된 목록에서 value 찾기
    let result = [];
    values.forEach((el) => {
      const data = el.value1.split(",");
      result.push({ targetdate: targetdate, memo: data[0], color: data[1], no: data[2] });
    });
    console.log(result);

    axios.post("/calendar/deleteSchedules", result, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    window.location.reload();
  };
  

  // 수정
  const update = () => {
    // 선택된 목록 가져오기       
    const inputElements = document.querySelectorAll("input[name='info']:checked");
    const values = [];
    for (let input of inputElements) {
        const value1 = input.getAttribute("value1");
        const value2 = input.getAttribute("value2");
        values.push({value1, value2});
    }    

    // 선택된 목록에서 value 찾기
    let result = [];
    values.forEach((el) => {
      console.log('데이터1',el)
      const data = el.value1.split(",");
      const newMemo = el.value2;
      console.log('newMemo:',newMemo)      
      result.push({ targetdate: targetdate, exMemo: data[0], newMemo: newMemo, color: data[1], no: data[2] });
    });
    console.log('결과',result);

     axios.post('/calendar/updateSchedules', result, {
         headers: {
           'Authorization': 'Bearer ' + token
         }
       })
       window.location.reload();
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
            {targetdate}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {info.map((info, index) => {
              return (
                <div className="parentcustom-check-box" key={info}>                  
                  <input name="info" type="checkbox" className="custom-check-box-div" value1={info} value2={memo[index]} />
                  <div>일정: &nbsp;</div>
                  <span>
                    <input                      
                      type="text"
                      placeholder={info[0]}
                      value={memo[index] || ''} onChange={(e) => handleChange(index, e)}                     
                    ></input>
                  </span>
                  <div style={Style(info[1])} className="custom-check-box">
                    {" "}
                  </div>
                </div>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="choice" onClick={update}>
            수정
          </button>
          <button className="choice" onClick={remove}>
            삭제
          </button>
          <button className="choice" onClick={cancel}>
            취소
          </button>
        </Modal.Footer>
      </Container>
    </Modal>
  );
};

export default CalendarUpdateModal;

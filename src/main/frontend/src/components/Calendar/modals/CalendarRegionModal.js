import React, {
  useState,
  useEffect,
  useCallback,
  useReducer,
  useContext,
} from "react";
import { Modal, Container } from "react-bootstrap";
import axios from "axios";
import Region from "../module/Region";
import AuthContext from "../../../store/authContext";

const CalendarRegionModal = ({
  visible,
  onCancel,
  onClickRegion,
  setCalendarRegionModalOn,
  groupName,
}) => {
  const [regionNumber, setRegionNumber] = useState(1);
  const authCtx = useContext(AuthContext);
  const userNickname = authCtx.userObj.usernickname;
  // 상위지역
  const [regionList, setRegionList] = useState([]);

  //최초 접속시 유저 달력 출력하도록 0으로 설정
  useEffect(() => {
    if (groupName == null) {
      setRegionList([
        { no: 0, region: userNickname },
        { no: 1, region: "강원도" },
        { no: 2, region: "경기도" },
        { no: 3, region: "경상남도" },
        { no: 4, region: "경상북도" },
        { no: 5, region: "광주" },
        { no: 6, region: "대구" },
        { no: 7, region: "대전" },
        { no: 8, region: "부산" },
        { no: 9, region: "서울" },
        { no: 10, region: "세종" },
        { no: 11, region: "울산" },
        { no: 12, region: "인천" },
        { no: 13, region: "전라남도" },
        { no: 14, region: "전라북도" },
        { no: 15, region: "제주도" },
        { no: 16, region: "충청남도" },
        { no: 17, region: "충청북도" },
      ]);
    } else {
      setRegionList([
        { no: 0, region: groupName },
        { no: 1, region: "강원도" },
        { no: 2, region: "경기도" },
        { no: 3, region: "경상남도" },
        { no: 4, region: "경상북도" },
        { no: 5, region: "광주" },
        { no: 6, region: "대구" },
        { no: 7, region: "대전" },
        { no: 8, region: "부산" },
        { no: 9, region: "서울" },
        { no: 10, region: "세종" },
        { no: 11, region: "울산" },
        { no: 12, region: "인천" },
        { no: 13, region: "전라남도" },
        { no: 14, region: "전라북도" },
        { no: 15, region: "제주도" },
        { no: 16, region: "충청남도" },
        { no: 17, region: "충청북도" },
      ]);
    }    
    console.log("지역리스트", regionList);
    setRegionNumber(0);
  }, [visible]);

  useEffect(() => {
    setRegionList([...regionList, { no: 0, region: userNickname }]);
  }, []);

  //상위지역 선택
  const changeRegion = (e) => {
    setRegionNumber(e.target.value);
  };

  //하위지역 선택
  const ClickRegion = ({ subRegion }) => {
    onClickRegion({ subRegion });
    setRegionList([]);
    setCalendarRegionModalOn(false);
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
          <Modal.Title id="contained-modal-title-vcenter">지역</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="calendarTable">
            <tbody className="calendarTbody">
              <tr className="calendarTr">
                <td className="regionTd">
                  <select onChange={changeRegion}>
                    {regionList.map((item) => {
                      return <option value={item.no}>{item.region}</option>;
                    })}
                  </select>
                </td>
                <div>{Region({ regionNumber, ClickRegion, groupName })}</div>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <button className="choice" onClick={onCancel}>
            Cancel
          </button>
        </Modal.Footer>
      </Container>
    </Modal>
  );
};

export default CalendarRegionModal;

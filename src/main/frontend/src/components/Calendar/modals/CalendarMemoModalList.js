import React, { useState, useEffect, useCallback, useReducer } from "react";
import { Modal, Container } from "react-bootstrap";
import axios from "axios";
import CalendarMemoModalBox from "./CalendarMemoModalBox";

const CalendarMemoModal = ({
  visible,
  onCancel,
  token,
  onClickSchedule,
  setCalendarMemoModalOn,
  groupName,
}) => {
  const [Schedules, setSchedules] = useState([{}]);
  const [allSchedules, setAllSchedules] = useState([{}]);
  const data = {
    groupname: groupName,
  };

  // 해당유저의 전체 메모 불러오기
  useEffect(() => {
    axios
      .post("/calendar/getAllSchedules", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        //console.log('allSchedules:',res.data)
        setAllSchedules(res.data);
        setSchedules(res.data);
        //console.log('allSchedules:',allSchedules)
      });
  }, [visible]);

  // 메모 클릭시 해당 날짜, 지역의 달력으로 이동
  const clickSchedule = (schedule) => {
    onClickSchedule({ schedule });
    setCalendarMemoModalOn(false);
  };

  //페이징
  const [page, setPage] = useState(1); //현재 페이지
  const itemsPerPage = 5; //보여줄 게시글 갯수

  //페이지 계산
  const totalPages = Math.ceil(allSchedules.length / itemsPerPage);

  const renderPageLinks = () => {
    const pageLinks = [];
    pageLinks.push(
      <button key="prev" onClick={() => setPage(page - 1)}>
        Prev
      </button>
    );
    for (let i = 1; i <= totalPages; i++) {
      const className = i === page ? "current-page" : "";
      pageLinks.push(
        <button key={i} className={className} onClick={() => setPage(i)}>
          {i}
        </button>
      );
    }
    pageLinks.push(
      <button key="next" onClick={() => setPage(page + 1)}>
        Next
      </button>
    );
    return pageLinks;
  };

  // 시작점 계산
  const startIndex = (page - 1) * itemsPerPage;
  const items = allSchedules.slice(startIndex, startIndex + itemsPerPage);

  const callSchedulesList = (items) => {
    const scheduleList = items.map((schedule, index) => {
      //console.log('schedule:', schedule, index)
      return (
        <tr className="calendarTr" onClick={() => clickSchedule(schedule)}>
          <CalendarMemoModalBox
            key={index}
            memo={schedule.memo}
            targetdate={schedule.targetdate}
            region={schedule.region}
            groupName={groupName}
          />
        </tr>
      );
    });
    return scheduleList;
  };

  //검색
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const searchMemo = [];

    Schedules.map((schedule, index) => {
      if (schedule.memo === searchQuery) {
        searchMemo.push(schedule, index);
        //console.log('search',searchMemo)
      }
      setAllSchedules(searchMemo);
    });
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
            내가 쓴 메모
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="calendarTable">
            <thead>
              <tr className="calendarTr">
                <td className="calendarTd">내용</td>
                <td className="calendarTd">날짜</td>
                <td className="calendarTd">지역</td>
              </tr>
            </thead>
            <tbody className="calendarTbody">{callSchedulesList(items)}</tbody>
          </table>
          <div >
            {renderPageLinks()}
          </div>

          <form onSubmit={handleSubmit}>
            <label>
              Search:
              <input
                className="input"
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </label>
            <input className="button" type="submit" value="내용검색" />
          </form>
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

export default CalendarMemoModal;

import React, { useState, useContext } from "react";
import AuthContext from "../../../store/authContext";
import Style from "./Style";

const Region = ({ regionNumber, ClickRegion, groupName }) => {
  const authCtx = useContext(AuthContext);
  const userNickname = [];
  if (groupName == null) {
    userNickname.push({ no: 0, region: authCtx.userObj.usernickname });
  } else {
    userNickname.push({ no: 0, region: groupName });
  }

  const gangwon = [
    { no: 105, region: "강릉" },
    { no: 100, region: "대관령" },
    { no: 106, region: "동해" },
    { no: 104, region: "북강릉" },
    { no: 93, region: "북춘천" },
    { no: 214, region: "삼척" },
    { no: 90, region: "속초" },
    { no: 121, region: "영월" },
    { no: 114, region: "원주" },
    { no: 211, region: "인제" },
    { no: 217, region: "정선군" },
    { no: 95, region: "철원" },
    { no: 101, region: "춘천" },
    { no: 216, region: "태백" },
    { no: 212, region: "홍천" },
  ];

  const gyeonggi = [
    { no: 98, region: "동두천" },
    { no: 119, region: "수원" },
    { no: 202, region: "양평" },
    { no: 203, region: "이천" },
    { no: 99, region: "파주" },
  ];

  const gyeongnam = [
    { no: 294, region: "거제" },
    { no: 284, region: "거창" },
    { no: 253, region: "김해시" },
    { no: 295, region: "남해" },
    { no: 288, region: "밀양" },
    { no: 255, region: "북창원" },
    { no: 289, region: "산청" },
    { no: 257, region: "양산시" },
    { no: 263, region: "의령군" },
    { no: 192, region: "진주" },
    { no: 155, region: "창원" },
    { no: 162, region: "통영" },
    { no: 264, region: "함양군" },
    { no: 285, region: "합천" },
  ];

  const gyeongbuk = [
    { no: 283, region: "경주시" },
    { no: 279, region: "구미" },
    { no: 273, region: "문경" },
    { no: 271, region: "봉화" },
    { no: 137, region: "상주" },
    { no: 136, region: "안동" },
    { no: 277, region: "영덕" },
    { no: 272, region: "영주" },
    { no: 281, region: "영천" },
    { no: 115, region: "울릉도" },
    { no: 130, region: "울진" },
    { no: 278, region: "의성" },
    { no: 276, region: "청송군" },
    { no: 138, region: "포항" },
  ];

  const gwangju = [{ no: 156, region: "광주" }];

  const daegu = [
    { no: 143, region: "대구" },
    { no: 176, region: "대구(기)" },
  ];

  const daejeon = [{ no: 133, region: "대전" }];

  const busan = [{ no: 159, region: "부산" }];

  const seoule = [
    { no: 116, region: "관악산" },
    { no: 108, region: "서울" },
  ];

  const sejong = [{ no: 239, region: "세종" }];

  const ulsan = [{ no: 152, region: "울산" }];

  const incheon = [
    { no: 201, region: "강화" },
    { no: 102, region: "백령도" },
    { no: 112, region: "인천" },
  ];

  const jeonnam = [
    { no: 259, region: "강진군" },
    { no: 262, region: "고흥" },
    { no: 266, region: "광양시" },
    { no: 165, region: "목포" },
    { no: 164, region: "무안" },
    { no: 258, region: "보성군" },
    { no: 174, region: "순천" },
    { no: 168, region: "여수" },
    { no: 252, region: "영광군" },
    { no: 170, region: "완도" },
    { no: 260, region: "장흥" },
    { no: 256, region: "주암" },
    { no: 175, region: "진도(첨찰산)" },
    { no: 268, region: "진도군" },
    { no: 261, region: "해남" },
    { no: 169, region: "흑산도" },
  ];

  const jeonbuk = [
    { no: 172, region: "고창" },
    { no: 251, region: "고창군" },
    { no: 140, region: "군산" },
    { no: 247, region: "남원" },
    { no: 243, region: "부안" },
    { no: 254, region: "순창군" },
    { no: 244, region: "임실" },
    { no: 248, region: "장수" },
    { no: 146, region: "전주" },
    { no: 245, region: "정읍" },
  ];

  const jeju = [
    { no: 185, region: "고산" },
    { no: 189, region: "서귀포" },
    { no: 188, region: "성산" },
    { no: 265, region: "성산포" },
    { no: 184, region: "제주" },
  ];

  const chungnam = [
    { no: 238, region: "금산" },
    { no: 235, region: "보령" },
    { no: 236, region: "부여" },
    { no: 129, region: "서산" },
    { no: 232, region: "천안" },
    { no: 177, region: "홍성" },
  ];

  const chungbuk = [
    { no: 226, region: "보은" },
    { no: 221, region: "제천" },
    { no: 131, region: "청주" },
    { no: 135, region: "추풍령" },
    { no: 127, region: "충주" },
  ];

  const allRegion = userNickname.concat(
    gangwon,
    gyeonggi,
    gyeongnam,
    gyeongbuk,
    gwangju,
    daegu,
    daejeon,
    busan,
    seoule,
    ulsan,
    incheon,
    sejong,
    jeonnam,
    jeonbuk,
    jeju,
    chungnam,
    chungbuk
  );

  const result = [];

  const regionClick = (subRegion) => {
    ClickRegion({ subRegion });
  };

  if (regionNumber == 0) {
    userNickname.map((subRegion) => {
      result.push(
        <li className="calendarLi" key={subRegion.no} onClick={() => regionClick(subRegion)}>
          {subRegion.region}
        </li>
      );
    });
  } else if (regionNumber == 1) {
    gangwon.map((subRegion) => {
      result.push(
        <li className="calendarLi" key={subRegion.no} onClick={() => regionClick(subRegion)}>
          {subRegion.region}
        </li>
      );
    });
  } else if (regionNumber == 2) {
    gyeonggi.map((subRegion) => {
      result.push(
        <li className="calendarLi" key={subRegion.no} onClick={() => regionClick(subRegion)}>
          {subRegion.region}
        </li>
      );
    });
  } else if (regionNumber == 3) {
    gyeongnam.map((subRegion) => {
      result.push(
        <li className="calendarLi" key={subRegion.no} onClick={() => regionClick(subRegion)}>
          {subRegion.region}
        </li>
      );
    });
  } else if (regionNumber == 4) {
    gyeongbuk.map((subRegion) => {
      result.push(
        <li className="calendarLi" key={subRegion.no} onClick={() => regionClick(subRegion)}>
          {subRegion.region}
        </li>
      );
    });
  } else if (regionNumber == 5) {
    gwangju.map((subRegion) => {
      result.push(
        <li className="calendarLi" key={subRegion.no} onClick={() => regionClick(subRegion)}>
          {subRegion.region}
        </li>
      );
    });
  } else if (regionNumber == 6) {
    daegu.map((subRegion) => {
      result.push(
        <li className="calendarLi" key={subRegion.no} onClick={() => regionClick(subRegion)}>
          {subRegion.region}
        </li>
      );
    });
  } else if (regionNumber == 7) {
    daejeon.map((subRegion) => {
      result.push(
        <li className="calendarLi" key={subRegion.no} onClick={() => regionClick(subRegion)}>
          {subRegion.region}
        </li>
      );
    });
  } else if (regionNumber == 8) {
    busan.map((subRegion) => {
      result.push(
        <li className="calendarLi" key={subRegion.no} onClick={() => regionClick(subRegion)}>
          {subRegion.region}
        </li>
      );
    });
  } else if (regionNumber == 9) {
    seoule.map((subRegion) => {
      result.push(
        <li className="calendarLi" key={subRegion.no} onClick={() => regionClick(subRegion)}>
          {subRegion.region}
        </li>
      );
    });
  } else if (regionNumber == 10) {
    sejong.map((subRegion) => {
      result.push(
        <li className="calendarLi" key={subRegion.no} onClick={() => regionClick(subRegion)}>
          {subRegion.region}
        </li>
      );
    });
  } else if (regionNumber == 11) {
    ulsan.map((subRegion) => {
      result.push(
        <li className="calendarLi" key={subRegion.no} onClick={() => regionClick(subRegion)}>
          {subRegion.region}
        </li>
      );
    });
  } else if (regionNumber == 12) {
    incheon.map((subRegion) => {
      result.push(
        <li className="calendarLi" key={subRegion.no} onClick={() => regionClick(subRegion)}>
          {subRegion.region}
        </li>
      );
    });
  } else if (regionNumber == 13) {
    jeonnam.map((subRegion) => {
      result.push(
        <li className="calendarLi" key={subRegion.no} onClick={() => regionClick(subRegion)}>
          {subRegion.region}
        </li>
      );
    });
  } else if (regionNumber == 14) {
    jeonbuk.map((subRegion) => {
      result.push(
        <li className="calendarLi" key={subRegion.no} onClick={() => regionClick(subRegion)}>
          {subRegion.region}
        </li>
      );
    });
  } else if (regionNumber == 15) {
    jeju.map((subRegion) => {
      result.push(
        <li className="calendarLi" key={subRegion.no} onClick={() => regionClick(subRegion)}>
          {subRegion.region}
        </li>
      );
    });
  } else if (regionNumber == 16) {
    chungnam.map((subRegion) => {
      result.push(
        <li className="calendarLi" key={subRegion.no} onClick={() => regionClick(subRegion)}>
          {subRegion.region}
        </li>
      );
    });
  } else if (regionNumber == 17) {
    chungbuk.map((subRegion) => {
      result.push(
        <li className="calendarLi" key={subRegion.no} onClick={() => regionClick(subRegion)}>
          {subRegion.region}
        </li>
      );
    });
  } else {
    allRegion.map((subRegion) => {
      if (subRegion.no == regionNumber)
        result.push(<li className="calendarLi" key={subRegion.no}>{subRegion.region}</li>);
    });
  }

  return result;
};

export default Region;

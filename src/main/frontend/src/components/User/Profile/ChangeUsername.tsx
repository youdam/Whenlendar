import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../store/authContext";
import axios from "axios";

const ChangeUsername = () => {
  let navigate = useNavigate();

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const nicknameInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredNickname = nicknameInputRef.current!.value;
    const usernickname = {usernickname: enteredNickname}
    axios
      .post("/member/nicknameCheck", usernickname , {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then((res) => {
        const resMessge = res.data;
        if (resMessge >= 1) {
          alert("이미 사용중인 닉네임입니다.")  
          console.log("오류");
        } else if (resMessge === 0) {
          console.log("change nickname start!");
          authCtx.changeNickname(enteredNickname);
          if (authCtx.isSuccess) {
            alert("변경 되었습니다.");
            authCtx.getUser();
            navigate("/", { replace: true });
          }          
          window.location.reload();
        }
      });
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="username">New Nickname</label>
        <input
          type="text"
          id="username"
          minLength={3}
          required
          ref={nicknameInputRef}
        />
      </div>
      <div>
        <button type="submit">Change Username</button>
      </div>
    </form>
  );
};

export { ChangeUsername };

import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../store/authContext";
import axios from "axios";

const ChangePassword = () => {
  let navigate = useNavigate();

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const exPasswordInputRef = useRef<HTMLInputElement>(null);
  const newPasswordInputRef = useRef<HTMLInputElement>(null);
  const newPasswordAgainInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredExPassword = exPasswordInputRef.current!.value;
    const enteredNewPassword = newPasswordInputRef.current!.value;
    const enteredNewPasswordAgain = newPasswordAgainInputRef.current!.value;
    const regExp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/g;
    if (!regExp.test(enteredNewPassword)) {
      alert("8~16자 영문, 숫자, 특수문자를 사용하세요.");
    } else {
      axios
        .post(
          "/member/exPasswordCheck",
          { userpw: enteredExPassword },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          const resMessge = res.data;
          if (resMessge === 1) {
            alert("이전 비밀번호를 확인해 주세요.");
          } else if (resMessge === 0) {
            console.log("확인");
            if (enteredNewPassword !== enteredNewPasswordAgain) {
              alert("새비밀번호와 비밀번호 확인이 같지 않습니다.");
              return;
            }

            console.log("change pw start!");
            authCtx.changePassword(enteredExPassword, enteredNewPassword);
            console.log(authCtx.isSuccess);

            if (authCtx.isSuccess) {
              alert("다시 로그인 하세요.");
              authCtx.logout();
              window.location.reload();
            }
          }
        });
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="exPassword">Old Password</label>
        <input
          type="password"
          id="exPassword"
          minLength={4}
          ref={exPasswordInputRef}
        />
        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          id="newPassword"
          minLength={4}
          ref={newPasswordInputRef}
        />
        <label htmlFor="newPassword">New Password Again</label>
        <input
          type="password"
          id="newPasswordAgain"
          minLength={4}
          ref={newPasswordAgainInputRef}
        />
      </div>
      <div>
        <button type="submit">Change Password</button>
      </div>
    </form>
  );
};

export { ChangePassword };

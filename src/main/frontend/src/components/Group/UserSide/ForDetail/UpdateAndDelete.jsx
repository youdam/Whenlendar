import React from "react";


//다음에 로그인 기능 넣었을떄 접속중인 사람 id와 댓글 단 id가 같은경우만 사용할 수 있도록 따로 빼둠
const UpdateAndDelete = (props) => {
  return (
    <div>
      <button onClick={props.onUpdateClick}>Update Content</button>
      <button onClick={props.onDeleteClick}>Delete</button>
    </div>
  );
};

export default UpdateAndDelete;

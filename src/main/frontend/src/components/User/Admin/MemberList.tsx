import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../store/authContext";
import MemberBox from "./MemberBox";
import "../../../css/admin.css"

const Member = () => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const [users, setUsers] = useState([
    {
      userid: "",
      usernickname: "",
      useremail: "",
      role: "",
      time: "",
    },
  ]);
  const [allUser, setAllUser] = useState([{}]);

  //페이징
  const [page, setPage] = useState(1); //현재 페이지
  const itemsPerPage = 5; //보여줄 게시글 갯수
    
  //페이지 계산
  const totalPages = Math.ceil(allUser.length / itemsPerPage);

  const renderPageLinks = () => {
    const pageLinks = [];
    pageLinks.push(
      <button  key="prev" onClick={() => setPage(page - 1)}>
        Prev
      </button>
    );
    for (let i =1; i <= totalPages; i++){
      const className = i === page ? 'current-page' : '';
      pageLinks.push(
        <button key={i} className={` ${i === page ? 'current-page' : ''}`} onClick={ () => setPage(i)}>
          {i}
        </button>
      );
    }
    pageLinks.push(
      <button  key="next" onClick={() => setPage(page + 1)}>
        Next
      </button>
    );
    return pageLinks;
  };

  // 시작점 계산
  const startIndex = (page - 1) * itemsPerPage;
  const items = allUser.slice(startIndex, startIndex + itemsPerPage);

  const callUserList = (items: any) => {
    const userList = items.map((user: any) => {      
      return (
        <MemberBox
          key={user.userid}
          userid={user.userid}
          useremail={user.useremail}
          usernickname={user.usernickname}
          role={user.role}
          time={user.time}
        />
      );
    });
    return userList
  };

  //검색
  const [searchQuery, setSearchQuery] = useState("");  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const searchUser: any = []
    
    users.map((user) => {
      if (user.userid === searchQuery) {        
        searchUser.push(user)        
      }
      setAllUser(searchUser)        
    });
  };

  useEffect(() => {
    axios
      .get("/admin/userList", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {        
        setUsers(res.data)                 
        setAllUser(res.data)                
      });
  }, []);  


  return (
    <div>
      <h2>회원 목록</h2>
      <div>                        
        {callUserList(items)}        
        {renderPageLinks()}
      </div>   
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Search:
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </label>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    </div>
  );
};

export { Member };

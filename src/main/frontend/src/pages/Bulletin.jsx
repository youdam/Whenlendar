// # Bulletin/frontend/src/pages/Bulletin.jsx

import { React, useEffect, useState, useContext } from "react"; 
import BoardList from "../components/Group/Board/BoardList/BoardList";
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Select from "react-select";
import AuthContext from "../store/authContext";
import Calendar from "../components/Calendar/containers/Calendar";
import "../DamCss/Page/page.css";


//this is 2023-01-04

const Bulletin = () => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const userid = authCtx.userObj.userid;
  const [data, setData] = useState("")
  const location = useLocation();
  const groupname = location.state.groupname;
  const role = authCtx.userObj.role;
  const Admin = location.state.Admin;
  
  //dropdown
  const [groupList, setGroupList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(location.state.groupname);
  const [groupLeader, setGroupLeader] = useState("");  

  //검색
  const [searchQuery, setSearchQuery] = useState("");
 // const [results, setResults] = useState([]);
  const navigate = useNavigate();

  console.log('그룹리더와 유저 아이디', groupLeader, userid, role, Admin);


  const handleSubmit = async (event) => {
      event.preventDefault();
   //   axios.get(`/api/searching-in-board/${searchQuery}`).then((response) => 
    //  {setResults(response.data.data);
   //   });


   console.log('Bulletin/searcingStart');

      const response = await axios.get(`/api/searching-in-board/${searchQuery}/${groupname}`, {
        headers: {
        'Authorization': 'Bearer ' + token
        }
        });
     // setResults(response.data.data);

 // const [results, setResults] = useState([]); 는 handleSubmit 밖에 있음
     //뭔뜻이냐면 handleSubmit 내에서 {results} 는 못씀. 그래서 콘솔 찍으면 안나온거 
  
     // console.log('1. :', response.data.data);
    //  navigate("/searching-function", { state : { results: response.data.data }});

        setData(response.data.data);

  };
  
  
  //내일 수정
  //selectedGroup === null 이면 {groupname} 으로 getBoardList 하는데 null 아니면
  //selectedGroup 으로 서치해서 그 값을 볼드 리스트로 다시 불러오면 됨. 
  
  useEffect(() => {

    const getBoardList = async () => {
        console.log('notnull', selectedGroup, 'groupname: ', groupname);
        let response = await axios.get(`/api/board-list/${selectedGroup}`, {
          headers: {
          'Authorization': 'Bearer ' + token
          }
          });
        setData(response.data.data);
        console.log('data->이거 boardlist:', data);
        console.log('data->이거 boardlist:', response.data.data);

      };


      //재밌는점 : 관리자로 가져오면 group_tb이므로 accessiblelevel이 없어서 select에서  GroupList에 filter로 2짜리가 사라지지않음.
    const getGroupList = async() => {

      if(Admin){
        console.log('admin? :' , Admin);

        let response = await axios.get("/direct/get-grouplist",  {
          headers: {
          'Authorization': 'Bearer ' + token
          }
        });
        setGroupList(response.data.data );

      }else if(!Admin){
        console.log('admin? ', Admin);
      
        let response = await axios.get(`/api/group-list`, {
          headers: {
          'Authorization': 'Bearer ' + token
        }
        });
        setGroupList(response.data.data );
        
      }
    };

    const getGroupLeader = async() => {
      console.log('리더가져오기 작동')
      let response2 = await axios.get(`/api/whoisGroupLeader/${selectedGroup}`, {
        headers: {
        'Authorization': 'Bearer ' + token
        }
        });
      setGroupLeader(response2.data.data.groupleader);
      console.log('response.groupleader', groupLeader);
      

    }

    getGroupList();
    getBoardList();
    getGroupLeader();

  }, [selectedGroup] );

  console.log('2.grouplist : ', groupList);
  

const handleGroupChange = (event) => {
  setSelectedGroup(event.target.value);
}

  return (
    <>
    <div className="page"> 
    <div className="damparent">
    <form>
      <label className="damlabel">
        Group :
        <select className="damselect" value={selectedGroup} onChange={handleGroupChange}>
          {groupList.filter(group => group.accessiblelevel !== 2)
          .map(group => (
            <option key = {group.groupname} 
                    value={group.groupname}>
              {group.groupname}
            </option>
          ))}
        </select>
      </label>
    </form>

    <div className="dam-manage-group">
    {groupLeader === userid || Admin ? 
      <Link to ={"/manage-group"}
            state = {{
            groupname : {selectedGroup},
            groupleader : {groupLeader},
            userid : {userid},
            Admin : {Admin}
        }}>
                      <input className="dambutton"  type='button' value = '소모임관리'/>
      </Link> : null }
    </div>
    </div>
    {/*달력 */}   
        <Calendar
         groupName={selectedGroup}
         groupLeader={groupLeader} />  



  <div className="damparent">
    
    <div className="damcreate-board">
      <Link to={"/create-board"} 
            state = {{
                  groupname : {selectedGroup},
                  groupleader : {groupLeader},
                  Admin : {Admin}
            }}>
        <input className="dambutton" type='button' value='게시글 작성하기'/>
      </Link>
      </div>

    <div className="dam-manage-group">
      <form onSubmit={handleSubmit}>
        <label>
          Search:
          <input type="text" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  </div>
       <BoardList data={data} Admin={Admin}/>
            <br />
            <br />
            <br /> 
      </div>
    </>
  );
};

export default Bulletin;
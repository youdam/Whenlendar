/* eslint-disable jsx-a11y/anchor-is-valid */

import React, {useContext, Component} from 'react';
import * as NoteService from '../../service/NoteService.js';
import { useLocation, useParams, useNavigate} from 'react-router-dom'
import AuthContext from '../../store/authContext';
import "../../css/Note.css"
import NoteSearchComponent from './NoteSearchComponent.jsx'
import queryString from 'query-string'
import NotePagingComponent from'./NotePagingComponent';

// useParams 사용을 위해 함수 HOC 생성 
export const withRouter = (WrappedComponent) => (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const authCtx = useContext(AuthContext);
    const sentList = false;

    const userId = authCtx.userObj.userid;
    const userNickName = authCtx.userObj.usernickname;
    const token = authCtx.token;
    return<WrappedComponent{...props} sentList={sentList} userId={userId} token = {token} params={params} navigate = {navigate} location={location}/>;
};


class NoteListComponent extends Component {
      
//생성자로 초기화하기(note:에 데이터 들어감)
    constructor(props) {
        super(props)
        this.state = {
            note: []
            ,num: 1
            ,paging: {}
            ,checkList:[]
            ,allCheck:false
            ,search:null
            ,option:null
            ,paged:false
        };
        this.noteWrite = this.noteWrite.bind(this);
        this.noteSentList = this.noteSentList.bind(this);
    }

    // 컴포넌트 생성시 실행(값 세팅)a
    componentDidMount() {
        this.listNote(1);
        console.log(this.state)
    }
    //페이징 포함 리스트 호출
    
    listNote(num){
        console.log("pageNum : ");
        const token = this.props.token;
        const option = queryString.parse(this.props.location.search).option
        const search = queryString.parse(this.props.location.search).search
        
        if (search !== undefined) {
            if (option !== undefined) {
                this.setState({
                    search: search
                    ,option: option 
                })
            }
        } else {
          console.log("검색없음")
        }
        
        NoteService.getNoteList(num, option, search, token).then((res) => {
        console.log(res.data);
        this.setState({
            num: res.data.pagingData.num,
            paging: res.data.pagingData,
            note: res.data.noteList
            });
        });
        console.log("lisNote 호출됨")
        console.log("state:")
        console.log(this.state)
    }

    pagi = (number) => {
        this.setState({
            ...this.state,
            num: number
        })
        this.listNote(number);
    };
    
    //체크박스 

    checkBoxHandler(id, isChecked){ 
        var newList = [...this.state.checkList];
        id=1*id;
        
        if (isChecked) {
            newList.push(id);
            this.setState({
                checkList: newList
            })
        } else if (!isChecked && newList.includes(id)) {
            newList=newList.filter((element) => element !==id);
            this.setState({
                checkList: newList
            })
        console.log("click!")
        console.log(this.state.checkList)
        console.log(this.state.checkList.includes(id))
        }
        // console.log(newList)
    }
  

    allCheckHandler(isChecked){
        const numbers = []
        this.state.note.map(
            note => numbers.push(note.no)
        )
        // console.log(numbers)
        if (isChecked) {
            this.setState({
                checkList: numbers,
                allCheck : true
            })
        } else {
            this.setState({
                checkList: [],
                allCheck: false
            })
        }
        const log = [...this.state.checkList]
        console.log(log)
    }
    
    // 쓰기 페이지 이동
    // history.push 사라지면서 navigate로 바뀜(hook이기 때문에 클래스에서 사용하려면 래퍼 필요)
    noteWrite() {
        this.props.navigate('/noteWrite')
    }

    //상세보기
    noteRead(no) {
        this.props.navigate('/noteRead/'+no)
    }
    //삭제
    noteDelete = async function() {
        const token = this.props.token;
        NoteService.noteDelete(this.state.checkList, token).then(res => {
            console.log(res);
            if(res.status == 200) {
                this.listNote(1);
            }else{
                alert("실패!");
            }
        });
    }
    noteSentList(){
        this.props.navigate('/noteSentList/')
    }
  
  
    render() {
        const paged = this.state.paged;
        const num = this.state.num;
        const paging = this.state.paging;
        console.log("renderingnow")
        console.log(paging)
        
        return (
            <div clssName="note_list">
                <h2 className="text-center">받은 쪽지함</h2>
                    <div className ="row">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th style = {{width: "5%"}}><input type="checkbox" className="note_checkbox" id="all_checkbox" onChange={(e)=>this.allCheckHandler(e.target.checked)}
                                    checked={this.state.checkList.length === this.state.note.length ? true : false} 
                                    /> </th>
                                    <th style = {{width: "50%"}}> 제  목 </th>
                                    <th style = {{width: "15%"}}> 보낸사람</th>
                                    <th style = {{width: "20%"}}> 받은날짜</th>
                                    <th style = {{width: "10%"}}> 수신확인</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*반복되는 컴포넌트 렌더링 위해 map()사용  */}
                                {
                                    this.state.note.map(
                                        note =>
                                        <tr key = {note.no}>
                                            <td><input type="checkbox" id={note.no} classame="note_checkbox" onChange={(e)=> this.checkBoxHandler(e.target.id, e.target.checked)}
                                            checked={this.state.checkList.includes(note.no)? true : false}
                                            /></td>
                                            <td> <a onClick = {() => this.noteRead(note.no)}>{note.title}</a></td>
                                            <td>{note.send}</td>
                                            <td>{note.time}</td>
                                            <td>{note.readCheckString}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div style={{float:"right"}}>
                        <button className="btn btn-primary" onClick={this.noteWrite}>쪽지 보내기</button>
                        <button className="btn btn-primary" onClick={this.noteSentList.bind(this)} style={{marginLeft: "5px"}}>보낸쪽지함</button>
                        <button className="btn btn-primary" onClick={()=>this.noteDelete()} style={{marginLeft:"10px"}}>쪽지삭제</button>
                    </div>
                   
                        <NotePagingComponent
                        num={num}
                        paging={paging}
                        token={this.props.token}
                        pagi={this.pagi}
                        />
                <div>
                    <NoteSearchComponent/>
                </div>
                </div>
        );
    }
}
export default withRouter(NoteListComponent);
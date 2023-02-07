import React, { Component } from 'react'
import * as NoteService from '../../service/NoteService.js';
import { withRouter } from './NoteListComponent';

class NoteReadComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            no: this.props.params.no
            ,note: {}
        }
    }

    componentDidMount(no, token) {
        no=this.state.no
        token = this.props.token;
        NoteService.noteRead(no, token).then((res) => {
        console.log(res.data);
        this.setState({note: res.data.noteVo});
        
        
        });
    }

    goToList() {
       this.props.navigate(-1)
}
    noteDelete = async function() {
        if(window.confirm("삭제하시겠습니까?")){
            var no = [this.state.no];
            var token = this.props.token;
            NoteService.noteDelete(no, token).then(res => {
                console.log("result => " + JSON.stringify(res));
                if (res.status === 200) {
                    this.props.navigate('/note');
                } else {
                    alert("실패!")
                }
            });
        }
    }

    render() {
        
        return (
            <div>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> 상세보기 </h3>
                    <div className = "card-body">
                        <div className="row">
                                   <label> 보낸사람 : {this.state.note.send}</label>
                                   <label> 받은시간  : {this.state.note.time}</label>
                                   <label> 제    목  : {this.state.note.title}</label>
                                   <br></br>
                        </div>
                        <div className = "row">
                            <label> 내 용 </label>
                            <textarea value={this.state.note.content} readOnly style={{ flex: "1", margin: "1%", resize: "none"}}/>
                        </div>
                        <br></br>
                        <div style={{float:"right"}}>
                            <button className="btn btn-primary" onClick={this.goToList.bind(this)} style={{marginLeft:"10px"}}>목록으로</button>
                            {this.props.userId === this.state.note.recept && 
                            <button className="btn btn-primary" onClick={()=>this.noteDelete()} style={{marginLeft:"10px"}}>쪽지삭제</button>
                            }
                         </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default withRouter(NoteReadComponent)
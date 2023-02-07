import React, {Component} from 'react';
import * as NoteService from '../../service/NoteService.js';
import { withRouter } from './NoteListComponent';
   
class NoteWriteComponent extends Component {
    
    //생성자, state 
    constructor(props) {
        
        super(props);
             
        this.state = {
            send : ''
            ,recept : ''
            ,title : ''
            ,content : ''
        }
        // 양식에 입력된 값 및 데이터 전송함수 bind 
        this.changeSendHandler = this.changeSendHandler.bind(this);
        this.changeReceptHandler = this.changeReceptHandler.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeContentHandler = this.changeContentHandler.bind(this);
        this.noteWrite= this.noteWrite.bind(this);

        }
        
    changeSendHandler = (event) => {
        this.setState({send: event.target.value});
    }
    changeReceptHandler =(event) => {
        this.setState({recept: event.target.value});
    }
    changeTitleHandler = (event) =>{
        this.setState({title: event.target.value});
    }
    changeContentHandler = (event) =>{
        this.setState({content: event.target.value});
    }
    
    noteWrite = (event) => {
        var token = this.props.token
        event.preventDefault();
        let note = {
             send: this.props.userId
            ,recept : this.state.recept
            ,title : this.state.title
            ,content : this.state.content
        };
        console.log("note = > "+JSON.stringify(note));
        NoteService.noteWrite(note, token).then(res => {
            this.props.navigate('/note');
        });
    }

    cancel(send) {
        console.log(send)
        this.props.navigate('/note');
    }

    render() {
        return (
            <div>
                <div className= "container">
                    <div className= "row">
                        <div className= "card col-md-6 offsett-md-3 offset-md-3">
                            <h3 className="text-center"></h3>
                            <div className= "card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Recept </label>   
                                        <input type="text" placeholder="받는사람 ID" name="recept" className="form-control"
                                        value={this.state.recept} onChange={this.changeReceptHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Title </label>
                                        <input type="text" placeholder="제목" name="title" className='form-control'
                                        value={this.state.title} onChange={this.changeTitleHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Content </label>
                                        <textarea placeholder="내용" name="content" className="form-control"
                                        value={this.state.content} onChange={this.changeContentHandler}/>
                                    </div>
                                    <button className="btn btn-success" onClick={this.noteWrite}>보내기</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>취 소</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(NoteWriteComponent);
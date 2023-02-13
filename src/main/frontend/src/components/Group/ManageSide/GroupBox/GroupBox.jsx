import axios from "axios";
import React, {useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../../store/authContext";
import HaltOrClosingModal from "../../Modals/HaltOrClosingModal";
import NoteAllUserModal from "../../Modals/NoteAllUserModal";
import Button from 'react-bootstrap/Button';
import "../../../../DamCss/Component/Component.css";


const GroupBox = (props) => {

    console.log('admin?' , props.Admin);
    
    const [ IsSubmitting, setIsSubmitting] = useState(false);
    const [ Error, setError ] = useState(null);
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const [showModalForHaltOrClosing, setShowModalForHaltOrClosing] = useState(false);
    const [showModalForNote, setShowModalForNote] = useState(false);

     //6글자 이상만 가입가능하므로 해당 id는 존재할 수 없음. 

    const handleSecession = async () => {
        await axios.delete(`/api/manage/sessecion/${props.groupname}`, {
            headers: {
                'Authorization': 'Bearer ' + token
                }
        });
        props.updateGroupList();
    };

    console.log('accessiblelevel' , props.accessiblelevel);

    if(!props.Admin){
    
    return(
        <>
        
        <div className="dam-groupbox-main-parent-same-line">
        {!props.Admin && props.accessiblelevel === 2 ? 
        <div className="dam-groupbox-main-child-same-line-cant"
            onClick={(event) => {
                event.preventDefault();
                alert("You can not access here");
            }}
        >
            <h5> {props.groupname} </h5>
        </div> 
        : 
        <Link
            to = {"/bulletin"}
            state = {{
                groupname : props.groupname 
               ,  Admin : props.Admin }}
        >
            <div className="dam-groupbox-main-child-same-line">
                <h5> {props.groupname} </h5>
            </div>
        </Link>
        } 

        <div className="dam-groupbox-main-button-for-secesison">
        {props.Admin === undefined  && <Button variant="outline-danger" size="1g" onClick={handleSecession}>탈퇴</Button>}
        </div>
        </div>

        </>

    )
}else if(props.Admin) {
    const {groupname, Admin} = props;
    
    console.log('props.admin', props.Admin);
    console.log('admin', Admin);
    console.log('admin/props.time ', props.time);
    console.log('admin/props.time ', typeof props.time);
    
    return(
        <>
        <div className="dam-groupbox-parent"> 

            <div className="dam-groupbox-children">
            <Link
                    to = {"/bulletin"}
                        state = {{
                        groupname : groupname,
                        Admin : Admin
                    }}
                >

                
                    <h5 className="dam-groupbox-groupname"> {props.groupname} </h5> </Link> <h5 className="dam-groupbox-groupleader"> {props.groupleader} </h5> <h5 className="dam-groupbox-grouptime"> {props.time.slice(0,10)}</h5>
                </div>


<div className="dam-groupbox-buttons">
<div className="dam-groupbox-child-button-note-all">
        {props.Admin === true &&  <button onClick={ () => setShowModalForNote(true)}> 전체 쪽지 </button>} </div>
<div>
        {showModalForNote && (
            <NoteAllUserModal groupname = {props.groupname} groupleader = {props.groupleader} 
            Admin = {props.Admin} onClose={()=> setShowModalForNote(false)}/>
        )} </div>
<div className="dam-groupbox-child-button-seccesion">
        {props.Admin === true &&  <button onClick={ () => setShowModalForHaltOrClosing(true) }> 정지|폐쇄 </button>} </div>
        {showModalForHaltOrClosing && (
            <HaltOrClosingModal groupname = {props.groupname}
            updateGroupList={props.updateGroupList}  onClose = {() => setShowModalForHaltOrClosing(false)} />
        )}
</div>
</div>
        </>
        )
    
    
    };
    
};
export default GroupBox;
import React, {useContext} from "react";
import AuthContext from "../../../store/authContext";
import {useState} from "react";
import axios from "axios";
import "../../../DamCss/Modal/Modal.css";


const HaltOrClosingModal = (props) => {
    
    const [ IsSubmitting, setIsSubmitting] = useState(false);
    const [ Error, setError ] = useState(null);
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const options = [
        {value : 2, label: '관리자 외 접근 금지'},
        {value : 3, label : '폐쇄'},
        {value : 4, label : '모두 접근 가능'}
    ];
    
    const [selectedOption, setSelectedOption] = useState("");


    const handleChange = async (event) => {
        
        setSelectedOption(event.target.value);
        console.log("target.number? : ", event.target.value);

        if(event.target.value === "1"){
            console.log("소모임장만");
            setIsSubmitting(true);
            setError(null);
    
    
            if (window.confirm('소모임장만 접근하도록 하시겠습니까?')){
    
            try {
            const request_data = {groupname : props.groupname}; 
            await axios({
                method : 'PUT',
                url: `/direct/change-accessiblelevel/${props.groupname}/${1}`,
                headers: {'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + token},
                data : JSON.stringify(request_data)
                });
            alert("변경되었습니다.");
            window.location.reload();
        
            }catch(err){
            setError(err.message);
            }finally{
            setIsSubmitting(false);
            }
            } else {
            alert("취소되었습니다.");
            };
        }else if(event.target.value === "2"){
            console.log("관리자만");
            setIsSubmitting(true);
            setError(null);
    
    
            if (window.confirm('관리자만 접근하도록 하시겠습니까?')){
    
            try {
            const request_data = {groupname : props.groupname}; 
            await axios({
                method : 'PUT',
                url: `/direct/change-accessiblelevel/${props.groupname}/${2}`,
                headers: {'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + token},
                data : JSON.stringify(request_data)
                });
            alert("변경되었습니다");
            //window.location.reload();
                props.updateGroupList();

            }catch(err){
            setError(err.message);
            }finally{
            setIsSubmitting(false);
            }
            } else {
            alert("취소되었습니다.");
            };
        }else if(event.target.value === "3"){
            console.log("폐쇄 클릭");
            setIsSubmitting(true);
            setError(null);
    
    
            if (window.confirm('한번 삭제하면 되돌릴 수 없습니다. 삭제하시겠습니까?')){
          
    
            try {
            const request_data = {groupname : props.groupname}; 
            await axios({
                method : 'DELETE',
                url: '/api/delete-group',
                headers: {'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + token},
                data : JSON.stringify(request_data)
                });
            alert("삭제되었습니다");
            //window.location.reload();
            props.updateGroupList();

            }catch(err){
            setError(err.message);
            }finally{
            setIsSubmitting(false);
            }
            } else {
            alert("취소되었습니다.");
            };

        }else if(event.target.value === "4"){
            console.log("모든회원접근가능");
            setIsSubmitting(true);
            setError(null);
    
    
            if (window.confirm('가입한 회원이 접근하도록 하시겠습니까?')){
    
            try {
            const request_data = {groupname : props.groupname}; 
            await axios({
                method : 'PUT',
                url: `/direct/change-accessiblelevel/${props.groupname}/${0}`,
                headers: {'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + token},
                data : JSON.stringify(request_data)
                });
            alert("변경되었습니다");
            window.location.reload();
        
            }catch(err){
            setError(err.message);
            }finally{
            setIsSubmitting(false);
            }
            } else {
            alert("취소되었습니다.");
            };

        };

    };
  
    return(
        <>
    
    <div className="dam-halt-or-over-lay">
        <div className="dam-halt-or-content">
            <label className="dam-halt-or-label">Select Option;</label>
            <div className="dam-halt-or-select-and-option">
                <select className="dam-halt-or-select" value={selectedOption} onChange={handleChange}>
                    <option value="dam-halt-or-option">Select an option</option>
                        {options.map(option => (
                        <option key={option.value} value={option.value}>
                                {option.label}
                        </option>
                    ))}
                </select>
            </div>
                <button className="dam-halt-or-close-button" onClick={props.onClose}>
                    닫기
                </button>
        </div>
    </div>
        </>

    )

};
export default HaltOrClosingModal;
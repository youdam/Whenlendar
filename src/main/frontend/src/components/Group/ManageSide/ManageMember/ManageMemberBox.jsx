import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../../../store/authContext";
import "../../../../DamCss/Component/Component.css"

const ManageMemberBox = (props) => {

    const { userid, usernickname, grade, groupname, time} = props;
    const [ TheGrade, setTheGrade ] = useState("");
    const [ IsSubmitting, setIsSubmitting] = useState(false);
    const [ Error, setError ] = useState(null);

    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const sessecion = userid;

    const navigate = useNavigate();

    console.log('props체크함 : ', props);

    console.log('받아온거 모지 i.props.updateBoardList 는 어케되는거지 ? ' , props);

    const kickout = async (event) => {

        //보낼곳 : /api/manage/kick-out/{userid}/{groupname}

        event.preventDefault();
        setIsSubmitting(true);
        setError(null);
    
    
        try {
            const response = await axios.delete(`/api/manage/kick-out/${groupname}/${sessecion}`, {
                headers: {
                'Authorization': 'Bearer ' + token
                }
                });
            await props.updateBoardList();
            if (response.status >= 200 && response.status < 300) {
                alert("successfully deleted");
                    
        }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    }



    

    const authoriz = async (event) => {
        // 주소 : /api/change-leader/{userid}/{groupname}
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);
    
    
        try {
            const response = await axios.put(`/api/change-leader/${userid}/${groupname}`, {
                headers: {
                'Authorization': 'Bearer ' + token
                }
                });
            await props.updateBoardList();
            if (response.status >= 200 && response.status < 300) {
                alert("you are not a groupleader anymore.");
                navigate("/");
                    
        }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }


    };

    useEffect( () => {
        grade === 1
        ? setTheGrade("운영자")
        : setTheGrade("일반")
    }, [grade])
  

    return (



        <div className="dam-manage-member-parent">
             {groupname} (그룹이름)  | {TheGrade} | 
             {usernickname} (닉네임) | {userid} (아이디) | {time} | 
             {grade === 1 
             ? null 
             : <div className="dam-manage-member-buttons"><button className="dam-manage-member-buttonone" onClick={kickout}>강퇴</button> 
                <button  className="dam-manage-member-buttontwo" onClick={authoriz}> 위임 </button>
                </div>}
        </div>

        
    );
};

export default ManageMemberBox;
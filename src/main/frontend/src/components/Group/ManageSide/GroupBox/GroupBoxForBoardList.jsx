import React, { useEffect, useState, useContext } from "react";
//import BoardList from 
import BoardList from "../../Board/BoardList/BoardList";
import axios from "axios";
import AuthContext from "../../../../store/authContext";
import "../../../../DamCss/Component/Component.css";


const GroupBoxForBoardList = (props) => {
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const [data, setData] = useState('');
    const only4 = true;

    useEffect(() => {

        const getBoardList = async () => {
              
        if(props.accessiblelevel === 0){

              let response = await axios.get(`/api/board-list/${props.groupname}`, {
                headers: {
                'Authorization': 'Bearer ' + token
                }
                });
              setData(response.data.data);

            }else if(props.accessiblelevel === 2){
                console.log('접근금지')
            };
        };

          getBoardList();
        }, [props.groupname])

    return(
        <>            
            <div className="dam-group-box-board-list-new-board">
                <h5> {props.groupname} 최신글 바로 보기  </h5>
            </div>
            <div className="dam-group-box-board-list-cannot-enter">
                {props.accessiblelevel === 0 && <BoardList data = {data} only4={only4} />}
                {props.accessiblelevel === 2 && <h5> 해당 소모임의 접근 권한이 없습니다. </h5>}
            </div>
        </>
    )
}

export default GroupBoxForBoardList;
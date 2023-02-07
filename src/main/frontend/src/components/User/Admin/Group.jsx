import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../store/authContext';
import GroupList from '../../Group/ManageSide/GroupList/GroupList';
import "../../../DamCss/Page/page.css"


const Group = () => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const [groupListAll, setGroupListAll] = useState([]);
  const [fig, setFig] = useState(0);
  const Admin = true;

  useEffect( () => {

    const getGroupListAll = async() => {
      let response = await axios.get("/direct/get-grouplist",  {
        headers: {
        'Authorization': 'Bearer ' + token
        }
      });
      setGroupListAll(response.data.data);

    };

    getGroupListAll();

  }, [fig]);

  const updateGroupList = () => {
    setFig( fig + 1 );
  }
  console.log('리랜더링 fig :' , fig);


  return (
    <div className="page">
      <GroupList data = {groupListAll} Admin={Admin}  updateGroupList = {updateGroupList}/>

    </div>
  );
}

export default  Group;
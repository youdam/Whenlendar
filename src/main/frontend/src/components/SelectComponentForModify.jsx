import { EditableSelect } from 'react-editable-select';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../../store/authContext';

//npm i react-select 설치
// 

function SelectList(props) {
  const { groupname, groupleader, userid } = props.data;
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOptionA, setIsOptionA] = useState(false);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  useEffect(() => {
    const getTagList = async () => {
      let response = await axios.get(`/api/tag-list/${groupname}/${groupleader}`, {
        headers: {
        'Authorization': 'Bearer ' + token
        }
        });
      setOptions(response.data.data.filter(option => option.tag !== '공지'));
      console.log('option:' , response.data.data);
    };
    getTagList();
  }, []);

  // 2. option = value, lavel로 들어가야함. value = {tag} , lavel = {tag}로 바꾸기

  useEffect( () => {
    if (selectedOption) {
      setIsOptionA(selectedOption.tag === 'A');
    }
  }, [selectedOption]);

  const handleUpdate = async (option) => {
    fetch(`/api/updateTag/${option.no}`, {
      method: 'PUT',
      body: JSON.stringify({ tag: option.tag }),
      headers: {'Authorization': 'Bearer ' + token}
        
    });
    setOptions(options.map((o) => (o.no === option.no ? option : o)));
  };


const handleAdd = (text) => {
    const newOption = { no: Date.now() , groupnametag: groupname, tag: text };
    setOptions([...options, newOption]);
    fetch('/api/addTag', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(newOption),
    });
    
}

  
return (
    <div>
      <EditableSelect
        options={options}
        value={selectedOption}
        getOptionValue={(option) => option ? option.no : null}
        getOptionLabel={(option) => option ? option.tag : null}
        onChange={(ev, option) => setSelectedOption(option)}
        onOptionUpdate={handleUpdate}
        createOption={isOptionA ? null : async (text, event) => handleAdd(text, event)}

      />
    </div>
  );
}

export default SelectList;
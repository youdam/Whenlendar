import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Select from "react-select";
import AuthContext from "../store/authContext";
import CreatableSelect from "react-select/creatable";
import "../DamCss/Page/page.css";



const DDD = (props) => {
    const { groupname, groupleader } = props.data;
    const [options, setOptions] = useState([]);
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const [fig, setFig] = useState(0);


    useEffect( () => {


        const getTagList = async() => {
            let response = await axios.get(`/api/tag-list/${groupname}/${groupleader}`, {
                headers: {
                'Authorization': 'Bearer ' + token
                }
                });
            let newOptions = []
                for (let i=0; i < response.data.data.length; i++ ){
                    let newOption = {value : response.data.data[i].tag, label : response.data.data[i].tag, __isNew__ : false }
                    newOptions.push(newOption)
                    
                }
           // setOptions([...options, newOptions]);  이거를 for문 내부에 넣엇을떄는 마지막 data만 추가됏는데 왜지
           setOptions(newOptions);
           
        };

        getTagList();
    console.log('6뭐라나옴?9898', options);
      


    }, [fig]);


  
/*                                
    const options = [
        { value : "son", label : "Son"},
        { value : "dam", label : "Dam"},
        { value : "you", label : "You"},
    ];
*/
    console.log('##fig : ' , fig)
    console.log('option종결 현재 : ', options);


    const handleChange = (selectedOption) => {
       if ( selectedOption.__isNew__ === true){
        const newOption = { no: Date.now(), groupnametag : groupname, tag : selectedOption.value};
        fetch('/api/addTag', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(newOption),
        }).then(()=>{
            setFig(fig+ 1);
        });

       } else {
        const newOption = { no: Date.now(), groupnametag : groupname, tag : selectedOption.value};
        fetch('/api/updateTag', {
            method : 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(newOption),
        }).then(()=>{
            setFig(fig+ 1);
        });

        console.log('deletemapping이 좋겟지? ', selectedOption);
        };
       };
        
    return( 
      <div className="dam-ddddddddd">
        <h6>클릭시 삭제, 새로운 말머리 입력시 생성</h6>
          <CreatableSelect options={options} onChange={handleChange} />
        </div>
    );
};

export default DDD;
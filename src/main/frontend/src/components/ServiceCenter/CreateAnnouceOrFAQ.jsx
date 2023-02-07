import React, {useContext, useState, useEffect} from "react";
import axios from "axios";
import AuthContext from "../../store/authContext";
import { useNavigate, useLocation } from "react-router-dom";
import "../../DamCss/Component/Component.css";
import "../../DamCss/newCss.css";

const CreateAnnounceOrFAQ = () => {
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const userid = authCtx.userObj.userid;
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedTag, setSelectedTag] = useState("공지사항");
    const [role, setRole] = useState(0);

    const location = useLocation();
    const parents = location.state.parents;
    const tagList = location.state.tagList;
    //const { parents, tagList } = state;



    console.log('create/FAG/TAGLIST/PROP', tagList);
    console.log('create/FAG/state', location.state);
    console.log('create/FAG/state/parents', parents);
    

    const navigate = useNavigate();

    useEffect(() => {
        if(parents === "announce"){
            setRole(1);
        }else if(parents === "FAQ"){
            setRole(2);
        }
    }, []) 
  


    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try{
            const data = {
                title: title,
                userid : userid,
                content : content,
                readcount : null,
                groupname : "ADMIN",
                tag : selectedTag,
                role : role

            };
            let res = await axios({
                method : 'POST',
                url : "/api/create-board",
                headers: {'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token},
                data : data
            });

            if (res.status >= 200 && res.status < 300 ){
                alert("created successfully");
                navigate("/service-center")
            } 
        }catch (err){
            console.log(err);
        }finally{
            setIsSubmitting(false);
        }
    };



return (
        <>
        

    

    <div className="dam-create-announce-or-faq-select">
        {parents === "FAQ" && 
            <select value={selectedTag} onChange={(event) => setSelectedTag(event.target.value)}>
            {tagList.map(tag => (
                <option key = {tag.value} 
                        value={tag.value}>
                          {tag.label}
                </option> 
            ))}
    </select>
    }
    </div>


<form onSubmit={handleSubmit}>

    <div className="dam-create-announce-or-faq-form">
            <label  className="damtitle-create-announce-or-faq">
          Title:
          <input
            type="text"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <br />
        <br />
        <label className="damcontent-create-announce-or-faq">
          Content:
          <textarea className="damtextarea-create-announce-or-faq"
            placeholder="Enter content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </label>
    </div>
        <button className="dambutton" type="submit" disabled={isSubmitting}>
          공지생성
        </button>
        </form>
        </>
    );

};

export default CreateAnnounceOrFAQ;
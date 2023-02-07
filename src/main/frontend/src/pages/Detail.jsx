import React,{ useEffect, useState, useContext }  from "react";
import AuthContext from "../store/authContext";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../DamCss/Page/page.css";


const Detail = (props) => {
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const[title, setTitle] = useState("");
    const[content, setContent] = useState("");
    const[groupname, setGroupname] = useState("");
    const[readcount, setReadcount] = useState(0);
    const[files, setFiles] = useState([]);
    const[writer, setWriter] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const no = location.state.no;
    const userid = authCtx.userObj.userid;
    const {Admin} = props;

    console.log("Detail/no: " , no );
    console.log("Detail/Admin: " , Admin );


//{no : no}  앞에거는 entity에 맞춘거고 뒤에거는 이 페이지의 no값
    const handleDeleteBtnClick = async (e) => {
        e.preventDefault();
        const request_data = {no : no}; 
        let response = await axios({
            method : 'DELETE',
            url: '/api/delete-board',
            headers: {'Content-type': 'application/json',
                       'Authorization': 'Bearer ' + token},
            data : JSON.stringify(request_data)
        });

        console.log('머가 삭제되러 갓는지 보자 ', response);
        navigate("/bulletin", { state  :  { groupname : groupname }});

    };

    useEffect( ()=> {
        const fetchData = async () => {
            const result = await axios(`/api/board-detail/${no}`, {
                headers: {
                'Authorization': 'Bearer ' + token
                }
                });
            setTitle(result.data.data.title);
            setGroupname(result.data.data.groupname);
            setContent(result.data.data.content);
            setFiles(result.data.data.files);
            setReadcount(result.data.data.readcount);
            setWriter(result.data.data.userid);
            console.log('타이틀 내용 사진 보자 ->', result);
        };
        fetchData();
    }, [no]);

    return (
        <>
            <h1>{title}</h1>
            <h3>{content}</h3>
            <h5> {readcount } </h5>
            {files.map((file, index) => (
                <img key={index} src={file.filedata} alt={file.name} width={400} height={300} />
            ))}
            {userid === writer && < Link 
                to={"/update-board"}
                state={{
                    no: no,
                    title: title,
                    content: content
                }}>
                    {" "}
                    수정하기 | {" "}
                </Link>}
            {userid === writer &&
            <input className="dambutton" type="button" onClick={handleDeleteBtnClick} value="삭제" />}
            {Admin ? 
             <Link
             to = {"/bulletin"}
                 state = {{
                 groupname : groupname,
                 Admin : Admin
             }}
            >
            {" "}
            |목록보기  {" "}
            </Link> 
            :
            <Link to ={"/bulletin"} state={{ groupname : groupname }}>
            {" "}
            |목록보기  {" "}
            </Link>}
            
        </>
    );

};

export default Detail;
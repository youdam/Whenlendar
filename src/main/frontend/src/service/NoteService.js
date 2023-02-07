import axios from 'axios';

    const header = (token) => {
        return {headers: {
            'Authorization': 'Bearer ' + token
        }}
    }

    export const getNoteList = (num, option, search, token)=>{
    //axios 데이터 res에 담기
        const res = axios.get("/api/note?num="+num+'&option='+option+'&search='+search, header(token));
        return res;
    }
    export const noteSentList = (num, option, search, token) =>{
        const res = axios.get("/api/noteSentList?num="+num+'&option='+option+'&search='+search, header(token))
        return res;
    }

    export const noteWrite = (note, token)=>{
        const result = axios.post("/api/noteWrite/", note, header(token));
        return result;
    }

    export const noteRead = (no, token) =>{
        const res = axios.get("/api/noteRead/"+no, header(token) );
        return res;
    }

    export const noteDelete = (no, token)=>{
        const res = axios.post("/api/noteDelete", {
            nos: no
        }, header(token));
        return res;
    }

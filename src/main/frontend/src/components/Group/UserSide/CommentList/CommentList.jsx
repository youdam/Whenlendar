
import React from "react";
import CommentBox from "../CommentBox/CommentBox";

const CommentList = (props) => {
        console.log('props: ' , props);

      
    return (

        <>
        {Array.isArray(props.data) ?
        props.data.map((i) => (
            <CommentBox
                key = {i.no}
                no={i.no}
                contentNo={i.contentNo}
                userid = {i.userid}
                content = {i.content}
                time = {i.time}
                updateCommentList = {props.updateCommentList}
                
                />
        ))
        : null}
        </>

    );
};


export default CommentList;
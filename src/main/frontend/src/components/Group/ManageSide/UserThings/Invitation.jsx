import React, { useEffect, useState } from "react";
import InvitationBox from "./InvitationBox";


const Invitation = (props) => {
    
    console.log('invitation/ props :' , props);

    return(
        <>
        {Array.isArray(props.data)?
        props.data.map( (i) => (
            <InvitationBox 
                key = {i.no}
                recept = {i.recept}
                title = {i.title}
                content = {i.content}
                onAccept = {props.onAccept}
            />
        ))
        : null }
        </>
    );
};


export default Invitation;
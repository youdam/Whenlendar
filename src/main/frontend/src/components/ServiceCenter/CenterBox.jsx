import React, {useContext, useState} from "react";
import AuthContext from "../../store/authContext";
import "../../DamCss/Component/Component.css"


const CenterBox = (props) => {
    const [procontent, setProcontent] = useState(false);
    const { content } = props;

    if( props.parents === "announce" ){

    console.log('parents : ' , props.parents);
    
    

   return (
    <>
    <div className="DamCol">
        <div className="parent-damfigurs">
            <div className="damone">공지사항</div> 
            <div className="damtwo"> 
                <button onClick={() => setProcontent(!procontent)}>{props.title} </button> 
            </div> 
            <div className="damone"> 관리자 </div>
        </div>
        <div className={`damthree ${procontent ? '' : 'hidden'}`}>
            {content}
        </div>
    </div>
    </>
); }

    else if ( props.parents === "FAQ" ) {

    console.log('parents : ' , props.parents);

        return(
        
            <div className="DamCol">
                <div className="parent-damfigurs">
                    <div className="damone"> {props.tag} </div>
                    <div className="damtwo"> 
                        <button onClick={() => setProcontent(!procontent)}>{props.title} </button> 
                    </div>
                    <div className="damone"> 관리자 </div> 
                </div>
                <div className={`damthree ${procontent ? '' : 'hidden'}`}>
                                    {content}
                </div>
            </div>
        );
    }
};

export default CenterBox;
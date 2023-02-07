import React, {useContext, useState}  from "react";
import Announcement from "../components/ServiceCenter/Announcement";
import FAQ from "../components/ServiceCenter/FAQ";
import AuthContext from "../store/authContext";
import InquiryList from "../components/Inquiry/InquiryListComponent";
import "../DamCss/Page/page.css";



const ServiceCenter =() => {
    const [which, setWhich] = useState(0);


    return(


        <>
        <div className="page">
            <div className="dam-parents" >
        <button className="dambutton" onClick={() => setWhich(0)}>공지사항</button>
        <button className="dambutton" onClick={() => setWhich(1)}>FAQ</button>
        <button className="dambutton" onClick={() => setWhich(2)}>1:1문의</button>
            </div>

        <div>
        {which === 0 && <Announcement /> }
        </div>
        <div>
        {which === 1 && <FAQ /> }
        </div>
        <div>
        {which === 2 && <InquiryList />}
        </div>
        </div>
        </>
    )
}

export default ServiceCenter;
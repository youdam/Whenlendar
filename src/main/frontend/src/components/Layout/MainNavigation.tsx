import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';

import AuthContext from '../../store/authContext';
import SignUpModal from '../User/UserModals/SignUpModal'
import SignInModal from '../User/UserModals/SignInModal';

import '../../css/mainNavigation.css'


const MainNavigation = () => {

  const authCtx = useContext(AuthContext);
  const [usernickname, setUserNickname] = useState('');
  const token = authCtx.token;
  let isLogin = authCtx.isLoggedIn;
  let isGet = authCtx.isGetSuccess;
  const role = authCtx.userObj.role;


  const [SignUpModalOn, setSignUpModalOn] = useState(false);
  const [SignInModalOn, setSignInModalOn] = useState(false);

  const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")  

  const callback = (str: string) => {
    setUserNickname(str);
  }

  useEffect(() => {
    if (isLogin) {
      console.log('start');
      authCtx.getUser();
      setSignInModalOn(false);      

      axios.get('/member/callProfile', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
        .then((res) => {          
          const data = res.data;
          const URL = data.filepath
          console.log('프로필이미지',URL)
          if (!URL.isempty ){
            setImage(URL)
            console.log("주소", URL)
            console.log("주소!!!", Image)
          } 
        });
    }
  }, [isLogin]);

  
  useEffect(() => {
    if (isGet) {
      console.log('get start');
      callback(authCtx.userObj.usernickname);
    }
    
  }, [isGet]);


  const toggleLogoutHandler = () => {
    authCtx.logout();
    window.location.reload();
  }

  return (
    <>
      <SignUpModal
        show={SignUpModalOn}
        onHide={() => setSignUpModalOn(false)} />
      <SignInModal
        show={SignInModalOn}
        onHide={() => setSignInModalOn(false)} /> 
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand><Nav.Link href='/'>언제갈래?</Nav.Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse  className='navBar-right' id="basic-navbar-nav">
              <Nav className="ml-auto">
                {isLogin && role ==='ROLE_ADMIN' &&  <Navbar><Link to='/admin' className='link-to'> <Button variant="outline-primary">관리자 페이지</Button></Link>&nbsp;</Navbar>}
                <Navbar><Link to='/calendar'><Button variant="outline-primary">달력</Button></Link></Navbar>&nbsp;
                <Navbar><Link to='/main'><Button variant="outline-primary">소모임</Button></Link></Navbar>&nbsp;
                <Navbar><Link to='/service-center'><Button variant="outline-primary">고객센터</Button></Link></Navbar>&nbsp;
                {isLogin && <Navbar><Link to='/note'><Button variant="outline-primary">쪽지함</Button></Link></Navbar> }&nbsp;
              </Nav>
            </Navbar.Collapse>
                {!isLogin && <Navbar><Button variant="outline-primary" onClick={() => setSignInModalOn(true)}>로그인</Button>&nbsp;</Navbar>}
                {!isLogin && <Navbar><Button variant="outline-primary" onClick={() => setSignUpModalOn(true)}>회원가입</Button>&nbsp;</Navbar>}
                {isLogin && <Link to='/profile'><img src={Image} className="navImage" alt="" /></Link>} &nbsp; 
                {isLogin && <Navbar> &nbsp; {usernickname}님 환영합니다! &nbsp; </Navbar>}
                {isLogin && <Navbar> <Button variant="outline-primary" onClick={toggleLogoutHandler}>Logout</Button>&nbsp;</Navbar>}
          </Container>
        </Navbar>
    </>
  );
};

export default MainNavigation;
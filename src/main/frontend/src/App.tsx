import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import AuthContext from './store/authContext';
import AdminPage from './pages/AdminPage'
import CalendarPage from './pages/CalendarPage';
import Main from './pages/Main';
import Page from './pages/Page';
import CreateBoard from './pages/CreateBoard';
import UpdateBoard from './pages/UpdateBoard';
import Bulletin from './pages/Bulletin';
import NoteListComponent from './components/Note/NoteListComponent';
import NoteReadComponent from './components/Note/NoteReadComponent';
import NoteWriteComponent from './components/Note/NoteWriteComponent';
import NoteSentListComponent from './components/Note/NoteSentListComponent';
import ManageGroup from './pages/ManageGroup';
import SearchingFunction from './components/Group/Board/SearchingThings/SearchingFunction';
import InquiryListComponent from './components/Inquiry/InquiryListComponent';
import InquiryReadComponent from './components/Inquiry/InquiryReadComponent';
import InquiryWriteComponent from './components/Inquiry/InquiryWriteComponent';
import ServiceCenter from './pages/ServiceCenter';
import CreateAnnounceOrFAQ from './components/ServiceCenter/CreateAnnouceOrFAQ';
import TodayWeatherComponent from './components/WeatherAPI/TodayWeatherComponent';


function App() {

  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        {/*로그인 여부, 유저권한에 따라서 조건에 부합하지 않을경우 홈으로 이동 */}
        {/*홈페이지 */}
        <Route path="/" element={<HomePage />} />
        {/*개인정보 변경 */}
        <Route path="/profile/" element={!authCtx.isLoggedIn ? <Navigate to='/' /> : <ProfilePage />} />
        {/*관리자 페이지 */}
        <Route path="/admin/" element={!authCtx.isLoggedIn || authCtx.userObj.role !== 'ROLE_ADMIN' ? <Navigate to='/admin' /> : <AdminPage />} />
        {/*달력 페이지 */}
        <Route path="/calendar/" element= {<CalendarPage />}/>
        {/*소모임 메인 */}
        <Route path="/main" element={!authCtx.isLoggedIn ? <Navigate to='/' /> : <Main />} />
        {/*게시글 보이는 페이지*/}
        <Route path="/page" element={!authCtx.isLoggedIn ? <Navigate to='/' /> : <Page />} />
        {/*글쓰기 */}
        <Route path="/create-board" element={!authCtx.isLoggedIn ? <Navigate to='/' /> : <CreateBoard />} />
        {/*글 수정 */}
        <Route path="/update-board" element={!authCtx.isLoggedIn ? <Navigate to='/' /> : <UpdateBoard />} />
        {/*소모임 페이지(게시판, 달력 있는곳) */}
        <Route path="/bulletin" element={!authCtx.isLoggedIn ? <Navigate to='/' /> : <Bulletin />} />         
        {/*쪽지메인 페이지 (받은쪽지 보임) */}
        <Route path="/note" element = {!authCtx.isLoggedIn ? <Navigate to='/' /> : <NoteListComponent/>}></Route>
        {/*쪽지 보내기*/}
        <Route path="/noteWrite" element = {!authCtx.isLoggedIn ? <Navigate to='/' /> : <NoteWriteComponent/>}></Route>
        {/*쪽지 읽기*/}
        <Route path="/noteRead/:no" element = {!authCtx.isLoggedIn ? <Navigate to='/' /> : <NoteReadComponent/>}> </Route>
        {/*보낸 쪽지함 */}
        <Route path="/noteSentList" element = {!authCtx.isLoggedIn ? <Navigate to='/' /> : <NoteSentListComponent/>}></Route>                
        {/*그룹 관리 */}
        <Route path="/manage-group" element={<ManageGroup/>} />       
        {/*검색 결과값 */}
        <Route path="/searching-function" element={<SearchingFunction />} />
        {/*1:1 문의 리스트 */}
        <Route path="/inquiryList" element = {!authCtx.isLoggedIn ? <Navigate to='/' /> : <InquiryListComponent/>}></Route>
        {/*1:1 문의 읽기 */}
        <Route path="/inquiryRead" element = {!authCtx.isLoggedIn ? <Navigate to='/' /> : <InquiryReadComponent/>}></Route>
        {/* 1:1 문의 쓰기 */}
        <Route path="/inquiryWrite" element = {!authCtx.isLoggedIn ? <Navigate to='/' /> : <InquiryWriteComponent/>}></Route>
        {/*고객 센터 */}
        <Route path="/service-center" element={<ServiceCenter/>} />
        {/*고객센터 글 쓰기 */}
        <Route path="/create-annouce-or-faq" element={<CreateAnnounceOrFAQ/>} />
        {/* 날씨 테스트 페이지 */}
        <Route path="/weather" element = {!authCtx.isLoggedIn ? <Navigate to='/' /> : <TodayWeatherComponent/>}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
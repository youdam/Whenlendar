import axios from 'axios'
import React, { useRef, useState, useContext, useCallback, useEffect, componentDidMount } from 'react'
import '../../../css/mainNavigation.css'
import AuthContext from '../../../store/authContext';

const ProfileImage = () => {

  const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
  const fileInput = useRef(null)
  const [file, setFile] = useState('');
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  useEffect(() => {
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
        console.log("주소", Image)
      } 
      });
  }, []);



  const handleSubmit = useCallback(async () => {
    if (!file) return;
    authCtx.profileImg(file);
    if (authCtx.isSuccess) {
      alert("변경 되었습니다.");      
    }
  }, [file]);

  const handleChange = useCallback((e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else { //업로드 취소할 시
      setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }, []);

  return (
    < div >
      <img src={Image} className="image" alt="" onClick={() => { fileInput.current.click() }} />
      <form onSubmit={handleSubmit}>
        <input type="file" style={{ display: 'none' }} accept='image/jpg,impge/png,image/jpeg' onChange={handleChange} ref={fileInput} name="file" />
        <button type="submit">등록</button>
      </form>
    </div>
  )


}

export { ProfileImage }
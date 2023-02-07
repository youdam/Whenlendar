import { GET, POST }  from "./fetchAuthAction";

const createTokenHeader = (token:string) => {
  return {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
}

const calculateRemainingTime = (expirationTime:number) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

export const loginTokenHandler = (token:string, expirationTime:number) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('expirationTime', String(expirationTime));

  const remainingTime = calculateRemainingTime(expirationTime);
  return remainingTime;
}

export const retrieveStoredToken = () => {
  const storedToken = sessionStorage.getItem('token');
  const storedExpirationDate = sessionStorage.getItem('expirationTime') || '0';

  const remaingTime = calculateRemainingTime(+ storedExpirationDate);

  if(remaingTime <= 1000) {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('expirationTime');
    return null
  }

  return {
    token: storedToken,
    duration: remaingTime
  }
}

export const signupActionHandler = (userid: string, userpw: string, usernickname: string, useremail: string) => {
  const URL = '/auth/signup'
  const signupObject = { userid, userpw, usernickname, useremail };
  
  const response = POST(URL, signupObject, {});
  return response;
};

export const loginActionHandler = (userid:string, userpw: string) => {
  const URL = '/auth/login';
  const loginObject = { userid, userpw };
  const response = POST(URL, loginObject, {});

  return response;
};

export const findIdActionHandler = (useremail:string) => {
  const URL = '/auth/findid';  
  const response = GET(URL, useremail);

  return response;
};

export const logoutActionHandler = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('expirationTime');
};

export const getUserActionHandler = (token:string) => {
  const URL = '/member/me';
  const response = GET(URL, createTokenHeader(token));
  return response;
}

export const changeNicknameActionHandler = ( usernickname:string, token: string) => {
  const URL = '/member/nickname';
  const changeNicknameObj = { usernickname };
  const response = POST(URL, changeNicknameObj, createTokenHeader(token));

  return response;
}

export const changePasswordActionHandler = (
  exPassword: string,
  newPassword: string,
  token: string
) => {
  const URL = '/member/password';
  const changePasswordObj = { exPassword, newPassword }
  const response = POST(URL, changePasswordObj, createTokenHeader(token));
  return response;
}

export const profileImgActionHandler = ( file:string, token: string) => {
  const URL = '/member/profileImg';
  const formData = new FormData();
  formData.append('file', file);
  const response = POST(URL, formData, createTokenHeader(token));
  return response;
}

export const userDeleteActionHandler = ( userid:string, useremail:string, usernickname:string, token: string ) => {
  const URL = '/admin/userDelete';
  const userDeleteObj = { userid, useremail, usernickname }  
  const response = POST(URL, userDeleteObj, createTokenHeader(token));
  return response;
}

export const roleChangeActionHandler = ( role:string, userid:string, token: string ) => {
  const URL = '/admin/roleChange';
  const roleChangeObj = { role, userid }  
  const response = POST(URL, roleChangeObj, createTokenHeader(token));
  return response;
}
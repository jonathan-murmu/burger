 import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
};
export const authSuccess = ( token, userId ) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  }
};
export const authFail = ( error ) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}; 
export const logout = () => {
  // localStorage.removeItem('token');
  // localStorage.removeItem('expirationDate');
  // localStorage.removeItem('userId');
  return {
    // type: actionTypes.AUTH_LOGOUT,
    type: actionTypes.AUTH_INITIATE_LOGOUT,
  }
}
export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}
export const checkAuthTimeOut = ( expirationTime ) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime
  }
  //  return dispatch => {
  //     setTimeout(() => {
  //       dispatch(logout());
  //     }, expirationTime * 1000 );
  //  }
}
export const auth = ( email, password, isSignUp ) => {
    return {
      type: actionTypes.AUTH_USER,
      email: email,
      password: password,
      isSignUp: isSignUp
    }
  // return dispatch => {
  //   dispatch(authStart());
  //   const authData = {
  //     email: email,  
  //     password: password,
  //     returnSecureToken: true
  //   };
  //   let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCXqD830QRJCO5MY4wxxKtsmGFBat-Jph4';
  //   if ( !isSignUp ) {
  //     url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCXqD830QRJCO5MY4wxxKtsmGFBat-Jph4';
  //   }

  //   axios.post(url, authData) 
  //     .then(response => {
  //       const expirationDate = new Date( new Date() + response.data.expiresIn * 1000 );
  //       localStorage.setItem('token', response.data.idToken);
  //       localStorage.setItem('expirationDate', expirationDate);
  //       localStorage.setItem('userId', response.data.localId);
  //       dispatch(authSuccess(response.data.idToken, response.data.localId));
  //       dispatch(checkAuthTimeOut(response.data.expiresIn));
  //     })
  //     .catch( err => {
  //       console.log(err);
  //       dispatch(authFail(err.response.data.error));
  //     });
  // }
};
export const setAuthRedirectPath = ( path ) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}
export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  }
  // return dispatch => {
  //   const token = localStorage.getItem('token');
  //   if ( !token ) {
  //     dispatch(logout());
  //   } else {
  //     const expirationDate = new Date(localStorage.getItem('expirationDate'));
  //     if ( expirationDate <= new Date() ) {
  //       dispatch(logout());
  //     } else {
  //       const userId = localStorage.getItem('userId')
  //       dispatch(authSuccess(token, userId));
  //       dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000))
  //     }
  //   }      
  // }
}
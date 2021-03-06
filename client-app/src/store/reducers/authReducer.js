const initState = {
  authError: null,
  authWait: false
}

const authReducer = (state = initState, action) => {
  switch(action.type){
    case 'LOGIN_ERROR':
      console.log('login error');
      return {
        ...state,
        authError: 'Login Failed',
      }

    case 'LOGIN_SUCCESS':
      console.log('login success');
      return {
        ...state,
        authError: null,
      }

    case 'SIGNOUT_SUCCESS':
      console.log('signout success');
      return state;
    
    case 'SIGNUP_SUCCESS':
      console.log('signup success')
      return {
        ...state,
        authError: null
      }

    case 'SIGNUP_ERROR':
      console.log('signup error')
      return {
        ...state,
        authError: action.err.message
      }
    case 'PWD_RST':
      console.log("Reset Email Sent!");
      return state;
    case 'PWD_RST_ERR':
      console.log("Error Send Password Reset Password Email",action.err);
      return state;
    case 'WAIT_AUTH':
      console.log("Waiting for Auth",action.newState);
      return {
        ...state,
        authWait:action.newState
      }
    default:
      return state
  }
};

export default authReducer;
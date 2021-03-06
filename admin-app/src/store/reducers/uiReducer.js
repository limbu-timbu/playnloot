const initState = {
    backDropOpen: false,
    SnackbarVariant: 'info',
    DialogOpen: false
}

const uiReducer = (state=initState,action)=>{
    switch(action.type){
        case "DIALOG":
            return {
              ...state,
              DialogOpen: true,
              DialogTitleParam: action.title,
              DialogContentParam: action.content,
              DialogActionsParam: action.actions
            };
        case "DIALOG_CLEAR":
            return {
              ...state,
              DialogOpen: false
            };
        case "SNACKBAR":
          return {
            ...state,
            SnackbarOpen: true,
            SnackbarVariant: action.variant,
            SnackbarMessage: action.message
          };
        case "SNACKBAR_CLEAR":
            return {
              ...state,
              SnackbarOpen: false,
              /*
              successSnackbarOpen: false,
              errorSnackbarOpen: false,
              infoSnackbarOpen: false
              */
            };
        case "BACKDROP":
            return {
              ...state,
              backDropOpen: true,
            };
        case "BACKDROP_CLEAR":
            return {
              ...state,
              backDropOpen: false,
            };
      default:
            return state;
    }
}

export default uiReducer
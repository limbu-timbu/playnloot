export const showSnackbar = (param) => {
    return dispatch => {
        dispatch({type: "SNACKBAR", variant: param.variant, message: param.message});
    };
};

export const clearSnackbar = () => {
    return dispatch => {
        dispatch({type: "SNACKBAR_CLEAR"})
    }
}

export const showDialog = (param) => {
    return dispatch => {
        dispatch({type: "DIALOG", title: param.title, content: param.content, actions: param.actions});
    };
}

export const clearDialog = (param) => {
    return dispatch => {
        dispatch({type: "DIALOG_CLEAR"});
    };
}

export const backDrop = () => {
    return dispatch => {
        dispatch({type: "BACKDROP"});
    };
}
export const clearBackDrop = () => {
    return dispatch => {
        dispatch({type: "BACKDROP_CLEAR"});
    };
}

export const openInstallApp = ()=>{
    return dispatch => {
        dispatch({type:'INSTALLAPP_OPEN'});
    }
}

export const setInstallApp = (defferedIP)=>{
    return dispatch => {
        dispatch({type:'INSTALLAPP_SETATHS',ATHSOpen:defferedIP})
    }
}

export const setAppInstalled = (val) => {
    return dispatch=>{
        dispatch({type:'APP_INSTALLED',val})
    }
}

export const setWebShare = (param) => {
    return dispatch => {
        dispatch({type: 'WEB_SHARE', shareTitle: param.shareTitle, shareText: param.shareText, shareUrl: param.shareUrl})
    }
}
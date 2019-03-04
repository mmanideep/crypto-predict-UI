import axios from 'axios';
import { LOGIN_API } from '../constants';


export function checkSession(){
    let is_user_logged_in =  Boolean(localStorage['token']);
    return Boolean(is_user_logged_in);
}

export function loginUser(user_name, pswd, callBack){

    let loginData = JSON.stringify({
        password: pswd,
        username: user_name
    });

    axios.post(
        LOGIN_API, loginData, {
            headers: {
                'content-type': 'application/json',
            }
        }).then(
        response => {
            localStorage['token'] = response.data['access_token'];
            if (typeof(callBack) === "function"){
                callBack();
            }
        }
    )
}

export function logoutUser(){
    localStorage.removeItem('token');
}

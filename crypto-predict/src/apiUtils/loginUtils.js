import axios from 'axios';
import { LOGIN_API } from './../routes';


export function checkSession(){
    return localStorage['token'] | false;
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
            console.log(JSON.stringify(response.data));
            localStorage['token'] = response.data['access_token'];
            if (typeof(callBack) === "function"){
                callBack();
            }
        }
    )


}

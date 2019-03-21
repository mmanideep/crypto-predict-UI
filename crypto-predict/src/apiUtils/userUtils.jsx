import axios from 'axios';
import { USER_API } from '../constants';


export function getUserDetails(){
    return axios.get(
    	USER_API,{
    		headers: {
	    		'content-type': 'application/json',
	    		'authorization': 'JWT '+  localStorage['token']
        	}
        }
    )
}

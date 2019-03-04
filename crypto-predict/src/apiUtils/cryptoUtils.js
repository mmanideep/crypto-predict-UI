import axios from 'axios';
import { CURRENCY_INFO_API } from '../constants';

export function getLastThirtyDaysStats(currency, to_date, callBack){
    let getUrl = CURRENCY_INFO_API + "?currency=" + currency + "&to_date=" + to_date; 
    return axios.get(
            getUrl, {
            headers: {
                'content-type': 'application/json',
                'authorization': 'JWT '+localStorage['token']
            }
        });

}
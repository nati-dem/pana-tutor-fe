
import { Config } from '../enum/config.enum';

export function tokenGetter() {
    return localStorage.getItem(Config.USER_TOKEN);
}

export function randomString(length) {
    let mask = 'abcdefghijklmnopqrstuvwxyz';
    //msak += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ;
    //mask += '0123456789';
    //mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    let result = '';
    for (var i = length; i > 0; --i) 
        result += mask[Math.round(Math.random() * (mask.length - 1))];
    console.log('randomString:', result)
    return result;
}

export const sleep = (ms=500) => new Promise(resolve => setTimeout(resolve, ms))


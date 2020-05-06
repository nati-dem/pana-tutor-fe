
import { config } from '../enum/config.enum';

export function tokenGetter() {
    //let currentUser = JSON.parse(localStorage.getItem('user'));
    return localStorage.getItem(config.USER_TOKEN);
}

import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Config} from '../enum/config.enum';

export class BaseHttpService {

  protected httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': '*/*'
      })
    }
    };

    protected httpOptionsWithAuth() {
      return {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer '+localStorage.getItem(Config.USER_TOKEN),
          'Accept': '*/*'
        })
      }
    };

    protected handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
          'Something bad happened; please try again later.');
      };

}

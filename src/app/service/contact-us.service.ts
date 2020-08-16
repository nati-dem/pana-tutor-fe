import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BaseHttpService } from "./base.http.service";
import { Contactus } from "../../../../pana-tutor-lib/model/contact-us.interface";
import { environment as env } from "./../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class ContactUsService extends BaseHttpService {
  constructor(private http: HttpClient) {
    super();
  }

  saveMessage(contactusReq: Contactus) {
    let url = `${env.userApiBaseUrl}/${env.addContactusMessage}`;
    return this.http.post<any>(url, contactusReq, super.httpOptions());
  }
}

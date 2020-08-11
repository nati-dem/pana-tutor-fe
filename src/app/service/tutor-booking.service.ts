import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment as env } from "./../../environments/environment";
import { BaseHttpService } from "./base.http.service";
import { TutorBookingRequest, PaymentInfoRequest, PricingPackages} from '../../../../pana-tutor-lib/model/tutor/tutor-booking.interface';

@Injectable({
  providedIn: 'root',
})
export class TutorBookingService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  validateCourseBookingRequest(courseId){
    let url = env.validateCourseBookingRequest.replace("<courseId>", courseId)
    return this.http.get<any>(env.userApiBaseUrl + url, super.httpOptionsWithAuth());
  }

  putTutorBookingRequest(courseId, req: TutorBookingRequest ){
    let url = env.putTutorBookingRequest.replace("<courseId>", courseId)
    return this.http.put<any>(env.userApiBaseUrl + url, req, super.httpOptionsWithAuth());
  }

  getPaymentLinks(req: PaymentInfoRequest){
    let url = env.generatePaymentInfo
    return this.http.post<any>(env.userApiBaseUrl + url, req, super.httpOptionsWithAuth());
  }

  findPackages(){
    // TODO - read packages from API
    return PricingPackages;
  }

  verifyPaymentAndFinalizeBooking(req){
    let url = env.verifyPayment
    return this.http.post<any>(env.userApiBaseUrl + url, req, super.httpOptionsWithAuth());
  }

}

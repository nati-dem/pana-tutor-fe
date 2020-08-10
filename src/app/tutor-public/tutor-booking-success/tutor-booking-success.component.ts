import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TutorBookingService } from "../../service/tutor-booking.service";

@Component({
  selector: 'app-tutor-booking-success',
  templateUrl: './tutor-booking-success.component.html',
  styleUrls: ['./tutor-booking-success.component.css']
})
export class TutorBookingSuccessComponent implements OnInit {

  params;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private tutorBookingService: TutorBookingService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log('booking success params:', params);
      this.params = params;
      if(!params.MerchantOrderId) {
        this.router.navigate(["/tutoring/booking"]);
      }
      this.verifyPaymentAndFinalizeBooking();
    });
  }

  verifyPaymentAndFinalizeBooking(){
    const req = {
      TotalAmount: this.params.TotalAmount,
      BuyerId: this.params.BuyerId,
      MerchantOrderId: this.params.MerchantOrderId,
      MerchantCode: this.params.MerchantCode,
      MerchantId: this.params.MerchantId,
      TransactionCode: this.params.TransactionCode,
      TransactionId: this.params.TransactionId,
      Status: this.params.Status,
      Currency: this.params.Currency,
      Signature: this.params.Signature
    }
    this.tutorBookingService.verifyPaymentAndFinalizeBooking(req)
    .subscribe(res => {
        console.log("verifyPaymentAndFinalizeBooking res", res)
      }, err => {
        console.log("verifyPaymentAndFinalizeBooking err", err)
      })
  }

  /*
http://localhost:4200/tutoring/booking/success?TotalAmount=800.00
&BuyerId=8c88a6d5-588a-4144-aa89-6ac899751d30
&MerchantOrderId=ee8669ba-936d-4681-b4e5-aa100f4e4ca7
&MerchantCode=0619
&MerchantId=c87f1a65-6326-4f5d-bac9-c20d97ef4b7b
&TransactionCode=UFKUMRWL
&TransactionId=6452cc0f-4f33-422f-b96a-6f62c707a1b2
&Status=Paid&Currency=ETB
&Signature=O%20RRZ0tNFloecmuxYA6E0HzCgELOyq2hqwZ3IL4Htcl0VR4a0%2FP2jk6oWUk0T0GCeiVm35w3XixDd%2F2P5jup%2FnSnfXyftyCAohxUD7Q07emPIZ%200xQA6JyIrtLPuCMRYoeUl7nGi3LRuvCMRAxJxPRYsa2QjWme9rXNIBL0cLJHPmIlKuWvCNwDpagvacsZtd%2FWi5xZBjnBYtbG0SV3YkAcCQ2PA5A22h5J1AnpeFOCMOAdndlpUE8wPFes5vKh7XuprcaCJJ8Vt2YTUf1PkykfPhsuFvMTq87HAW4pyrrGn30V8KyxI4%2F%20ookcHclROzQfRrFpv0seJXIN%20kcXE2g%3D%3D
*/


}

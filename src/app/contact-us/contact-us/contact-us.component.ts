import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BaseFormGroup } from "../../shared/base-form-group";
import { ContactUsService } from "../../service/contact-us.service";
import { Contactus } from "../../../../../pana-tutor-lib/model/contact-us.interface";
@Component({
  selector: "app-contact-us",
  templateUrl: "./contact-us.component.html",
  styleUrls: ["./contact-us.component.css"],
})
export class ContactUsComponent extends BaseFormGroup implements OnInit {
  contactusForm = new FormGroup({
    full_name: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
    ]),
    email: new FormControl("", [Validators.required, Validators.minLength(4)]),
    phone: new FormControl("", [Validators.required, Validators.minLength(4)]),

    message: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  constructor(private contactusService: ContactUsService) {
    super();
    super.setForm(this.contactusForm);
  }

  ngOnInit(): void {}

  onSubmit() {
    console.warn(this.contactusForm.value);
    let contactusReq: Contactus = this.mapFormData();

    this.contactusService.saveMessage(contactusReq).subscribe(
      (res) => {
        this.contactusForm.reset();
        console.log("response", res);
      },
      (err) => {
        console.log("Error", err);
        this.formErrors.push(err.error.message);
        this.enableForm();
      },
      () => {
        this.enableForm();
      }
    );
  }

  mapFormData(): Contactus {
    return {
      full_name: this.contactusForm.value.full_name.trim(),
      email: this.contactusForm.value.email.trim(),
      phone: this.contactusForm.value.phone.trim(),
      message: this.contactusForm.value.message.trim(),
    } as Contactus;
  }
}

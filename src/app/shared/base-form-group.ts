import { FormControl, FormGroup, Validators } from '@angular/forms';

export class BaseFormGroup {

  form: FormGroup;
  isFormProcessing = false;
  formErrors = [];

  constructor() {
  }
  setForm(f){
    this.form = f;
  }

  get formControls() {
    return this.form.controls;
  }

  disableForm(){
    this.isFormProcessing = true;
    this.form.disable;
    this.formErrors = [];
  }

  enableForm(){
    this.isFormProcessing = false;
    this.form.enable;
  }

  resetForm(){
    this.isFormProcessing = false;
    this.form.enable;
    this.formErrors = [];
  }

}

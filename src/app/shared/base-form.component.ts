import { FormControl, FormGroup, Validators } from '@angular/forms';

export class BaseFormComponent {

  form: FormGroup;
  isFormProcessing = false;

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
  }

  enableForm(){
    this.isFormProcessing = false;
    this.form.enable;
  }

}

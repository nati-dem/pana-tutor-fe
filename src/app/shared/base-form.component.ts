import { FormControl, FormGroup, Validators } from '@angular/forms';

export class BaseFormComponent {

  form: FormGroup;
  isLoading = false;

  constructor() {
  }
  setForm(f){
    this.form = f;
  }

  get formControls() {
    return this.form.controls;
  }

  disableForm(){
    this.isLoading = true;
    this.form.disable;
  }

  enableForm(){
    this.isLoading = false;
    this.form.enable;
  }

}

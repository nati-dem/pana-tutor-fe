import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-validation-template',
  templateUrl: './form-validation-template.component.html',
  styleUrls: ['./form-validation-template.component.css']
})
export class FormValidationTemplateComponent implements OnInit {

  @Input() formControlsInp;

  constructor() { }

  ngOnInit(): void {
  }

}

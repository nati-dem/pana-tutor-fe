import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-api-error-template',
  templateUrl: './api-error-template.component.html',
  styleUrls: ['./api-error-template.component.css']
})
export class APIErrorTemplateComponent implements OnInit {

  @Input() apiErrorInp;

  constructor() { }

  ngOnInit(): void {
  }

}

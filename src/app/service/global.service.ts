import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  private _currentComponent;

  constructor() { }

  get currentComponent(){
    return this._currentComponent;
  }

  set currentComponent(comp){
    this._currentComponent = comp;
  }

}

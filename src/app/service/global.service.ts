import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  private _isLoading: boolean;

  constructor() { }

  get isLoading(){
    return this._isLoading;
  }

  set isLoading(loading){
    this._isLoading = loading;
  }

}

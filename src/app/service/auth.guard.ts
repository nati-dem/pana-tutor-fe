import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private toastr: ToastrService) {}

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot ): | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isTokenValid = this.authService.isTokenValid() 
    if(!isTokenValid){
      this.toastr.error('Login Required for access!');
    }
    return isTokenValid;
  }
}

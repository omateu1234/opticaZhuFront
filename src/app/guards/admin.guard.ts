import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from '../Servicios/login.service';

@Injectable({
  providedIn: 'root'
})

export class adminGuard implements CanActivate  {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {
    let userRol= localStorage.getItem('rolUser');
    if(userRol== 'admin'){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
};

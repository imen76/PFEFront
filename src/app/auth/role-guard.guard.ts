import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {

  
user : User;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

   
      this.user = JSON.parse(localStorage.getItem('token') as string);


   // let Role = localStorage.getItem("token");
    if( this.user.libelleRole == "SuperAdmin" || this.user.libelleRole == "Superviseur"){
      return true;
    }
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "Vous n'avez pas le droit d'accès !",
    })
    return false;
  }

}

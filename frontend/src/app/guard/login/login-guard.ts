import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserServices } from '../../Services/user/user';
import { Observable } from 'rxjs';
import { User } from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
constructor(private router: Router,private userService:UserServices) {}

  canActivate(
    next: ActivatedRouteSnapshot,

    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let user!:User;
     this.userService.userObservable.subscribe((newUser)=>{
    user=newUser;

  })
  // console.log(user)
  // console.log(this.userService.currentUser)
    if (this.userService.currentUser.email) {
       this.router.navigateByUrl("/");
      return false
    } else {
     return true
    }
  }
}

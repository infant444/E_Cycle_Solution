import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserServices } from '../../Services/user/user';
import { Observable } from 'rxjs';
import { User } from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserServices) { }

  canActivate(
    next: ActivatedRouteSnapshot,

    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user!: User;
    const expectedRoles = next.data['roles'];
    this.userService.userObservable.subscribe((newUser) => {
      user = newUser;

    })
    // console.log(user)
    // console.log(this.userService.currentUser)
    if (!this.userService.currentUser.email) {
      this.router.navigateByUrl("/login");
      return false
    }
    if (expectedRoles && !expectedRoles.includes(user.role)) {
      this.router.navigate(['/unauthorized']); // redirect if not allowed
      return false;
    }
    return true
  }
}

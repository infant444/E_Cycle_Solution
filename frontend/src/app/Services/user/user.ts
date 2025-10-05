import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../model/user.model';
import { isPlatformBrowser } from '@angular/common';
import { USER_KEY } from '../../constant/localStorage.key';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { GET_ALL_PROJECT_MEMBER, GET_ALL_STAFF, GET_By_ID_STAFF, LOGIN, LOGOUT, REGISTER } from '../../constant/url';
import { App } from '../../app';

@Injectable({
  providedIn: 'root'
})
export class UserServices {
  private userSubject = new BehaviorSubject<User>(new User);
  public userObservable: Observable<User>;
  constructor(
    private http: HttpClient,
    private toasterService: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.userSubject = new BehaviorSubject<User>(new User());
    this.userObservable = this.userSubject.asObservable();

    // Then load from localStorage only if platform is browser
    if (isPlatformBrowser(this.platformId)) {
      const user = this.getUserLocalStorage();
      this.userSubject.next(user);
    }

  }

  login(x: any): Observable<User> {
    return this.http.post<User>(LOGIN, x).pipe(
      tap({
        next: (user) => {
          console.log(user);
          this.userSubject.next(user);
          this.toasterService.success("Welcome back to E cycle Solution")
          console.log(user.token);
          this.setUserToLocalStorage(user);
          console.log(this.userSubject.value);
        }, error: (errorResponse) => {
          this.toasterService.error(errorResponse.error.message, 'Login Fails')
        }
      })
    );
  }
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(GET_ALL_STAFF);
  }
  getById(id: string): Observable<User> {
    return this.http.get<User>(GET_By_ID_STAFF + id);
  }
  getProjectMemberId(x: string[]): Observable<User[]> {
    return this.http.post<User[]>(GET_ALL_PROJECT_MEMBER, { ids: x })
  }
  register(data: any): Observable<User> {
    return this.http.post<User>(REGISTER, data);
  }

  logout() {
    this.http.get(LOGOUT + this.currentUser.id).subscribe(_ => {
      this.userSubject.next(new User());
      localStorage.removeItem(USER_KEY);
      window.location.reload();
    })

  }
  //  Local storage
  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  private getUserLocalStorage(): User {
    if (isPlatformBrowser(this.platformId)) {
      const x = localStorage.getItem(USER_KEY);
      if (x) {
        return JSON.parse(x);
      }
      else {
        return new User();
      }
    } else {
      return new User();

    }
  }
  public get currentUser(): User {
    return this.userSubject?.value;
  }

}

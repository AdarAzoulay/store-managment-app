import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, ReplaySubject, tap } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' }) //an injectable singleton (does not destroys until we close our app)
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource$ = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource$.asObservable();

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }

  changePassword(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/changePassword', model).pipe(
      tap((res : any) => {
        console.log(res)
        const user = res;
        if (user) {
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }

  // getMember(username: string) {
  //   if(this.member) return of(this.member)
  //   return this.http.get<Member>(`${this.baseUrl}users/${username}`).pipe(tap(res=>{
  //     console.log(res)
  //     this.member = res;
  //   }));
  // }

  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role; 
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);

    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource$.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource$.next();
  }

  getDecodedToken(token: string) {
    const tokenParts = token.split('.');
    const payload = tokenParts[1];
    const decodedPayload = atob(payload); //atob is a built-in function in js that decodes base64
    return JSON.parse(decodedPayload);
  }
}

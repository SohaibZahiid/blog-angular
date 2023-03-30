import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL: string = environment.apiURL;

  private currentUser$ = new BehaviorSubject<User>(
    JSON.parse(localStorage.getItem('user')!) || null
  );

  // private isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  login(formData: any): Observable<any> {
    return this.http.post(`${this.apiURL}/auth/login`, formData, {
      withCredentials: true,
    });
  }

  logout(user: any): Observable<any> {
    return this.http.post(`${this.apiURL}/auth/logout`, user, {
      withCredentials: true,
    });
  }

  register(user: User): Observable<any> {
    return this.http.post<User>(`${this.apiURL}/auth/register`, user);
  }

  getCurrentUser$(): Observable<User> {
    return this.currentUser$.asObservable();
  }

  setCurrentUser$(user: User) {
    this.currentUser$.next(user);
  }

  // isAuthenticated(): Observable<boolean> {
  //   return this.isAuthenticated$.asObservable();
  // }

  // setIsAuthenticated(isAuthenticated: boolean) {
  //   this.isAuthenticated$.next(isAuthenticated);
  // }

  createUserStorage(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  removeUserStorage() {
    localStorage.removeItem('user');
  }
}

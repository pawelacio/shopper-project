import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  isLogedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  login(email: string, password: string) {
    return this.http.post('http://localhost:3000/login', { email: email, password: password })
      .pipe(map(res => {
        if (res) {
          localStorage.setItem('currentUser', JSON.stringify(res));
          this.loggedIn.next(true);
        }
        return res;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
  }
}

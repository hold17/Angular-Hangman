import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';

import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {map} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {
  sessionExpired = false;
  loggedIn = false;

  constructor (private http: HttpClient, private router: Router) {
    // Kald der skal ske når man kommer in på siden, her skal den logge dig ud automatisk, hvis din session er udløbet
    const token = localStorage.getItem('token');
    if ( token !== null) {
      this.validate(token).subscribe(() => {}, (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status === 401) {
          this.loggedIn = false;
          this.logoutRemoveToken();
          this.router.navigate(['/login']);
        }
      });
    }
  }
  isAuthenticated() {
    return new Promise(
      (resolve, reject) => {
        resolve(localStorage.getItem('token') !== null);
        reject(localStorage.getItem('token') === null);
      });
  }
  login(username, password): Observable <any> {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http.post('https://www.localghost.dk/hangman/oauth/authorize',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    ).pipe(
      map((promise: Promise<JSON>) => {
        localStorage.setItem('token', JSON.stringify(promise));
      })
    );
  }
  validate(stringtoken: string): Observable <any> {
    if (stringtoken.length < 1 || stringtoken === null) { return; }
    let token;
    try {
      token = JSON.parse(stringtoken).access_token;
    } catch (e) {
      console.log(e);
    }
    const body = new HttpParams()
      .set('authorization', token);
    return this.http.post('https://www.localghost.dk/hangman/oauth/validate',
      body.toString(),
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
      }
    );
  }
  logoutRemoveToken() {
    localStorage.removeItem('token');
    this.loggedIn = false;
  }
}



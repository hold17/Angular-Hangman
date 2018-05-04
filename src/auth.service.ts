import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Injectable, OnInit} from '@angular/core';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {observable} from 'rxjs/symbol/observable';
import {Router} from '@angular/router';
import 'rxjs/add/observable/interval';
import {TimerObservable} from 'rxjs/observable/TimerObservable';

@Injectable()
export class AuthService {
  sessionExpired = false;
  loggedIn = false;

  constructor (private http: HttpClient, private router: Router) {
    // Kald der skal ske når man kommer in på siden, her skal den logge dig ud automatisk, hvis din session er udløbet
    const token = localStorage.getItem('token');
    if ( token !== null) {
    this.validate(token).subscribe((response) => {}, (error: HttpErrorResponse) => {
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
    const promise = new Promise(
      (resolve, reject) => {
        resolve(localStorage.getItem('token') !== null);
        reject(localStorage.getItem('token') === null);
      });
    return promise;
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
    ).map((promise: Promise<JSON>) => {
      const token = promise;
      // console.log(token);
      localStorage.setItem('token', JSON.stringify(token));

    });
  }
  validate(stringtoken: string): Observable <any> {
    if (stringtoken.length < 1 || stringtoken === null) { return; }
    const token = JSON.parse(stringtoken).access_token;
    const body = new HttpParams()
      .set('authorization', token);
    return this.http.post('https://www.localghost.dk/hangman/oauth/validate',
      body.toString(),
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
      }
    ).map((promise: Promise<JSON>) => {
    });
  }
  logoutRemoveToken() {
    localStorage.removeItem('token');
    this.loggedIn = false;
  }
}



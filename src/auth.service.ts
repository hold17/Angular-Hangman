import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
  loggedIn = false;
  loginSocial = false;
  constructor (private http: HttpClient) {}

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
      console.log(token);
      localStorage.setItem('token', JSON.stringify(token));

    });
  }
  logoutRemoveToken() {
    localStorage.removeItem('token');
    this.loggedIn = false;
  }
}



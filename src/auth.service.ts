import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
  loggedIn = false;
  constructor (private http: HttpClient) {}

  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn);
        });
      }
    );
    return promise;
  }
  login(username, password): Observable <any> {
    console.log(password);
    console.log(username);
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http.post('https://www.localghost.dk/hangman/oauth/authorize',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    ).map((response: Response) => {
      const token = response.json();
      console.log(token);
      this.loggedIn = true;
    });
  }
  logout() {
    this.loggedIn = false;
  }
}



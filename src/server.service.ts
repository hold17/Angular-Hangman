import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

interface UserResponse {
  studynumber: string;
  password: string;
}

@Injectable()
export class ServerService implements OnInit {
  token: string;
  json;
  ngOnInit(): void {
  }
  constructor(private http: HttpClient) {}

  getGame(): Observable<any> {
    this.token = JSON.parse(localStorage.getItem('token')).access_token;
    return this.http.get('https://www.localghost.dk/hangman/api/hangman/game',
      {headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)}
      ).map((promise: Promise<JSON>) => {
        const response = promise;
        console.log(response);
        this.json = promise;
    });
  }
  restartGame(): Observable<any> {
    this.token = JSON.parse(localStorage.getItem('token')).access_token;
    return this.http.post('https://www.localghost.dk/hangman/api/hangman/game', null,
      {headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)}
    ).map((promise: Promise<JSON>) => {
      const response = promise;
      console.log(response);
    });
  }
  startGame(): Observable<any> {
    this.token = JSON.parse(localStorage.getItem('token')).access_token;
    return this.http.put('https://www.localghost.dk/hangman/api/hangman/game', null,
      {headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)}
    ).map((promise: Promise<JSON>) => {
      const response = promise;
      console.log(this.token);
      console.log(response);
    });
  }
  guessLetter(letter: string): Observable<any> {
    this.token = JSON.parse(localStorage.getItem('token')).access_token;
    return this.http.post('https://www.localghost.dk/hangman/api/hangman/guess/' + letter, null,
      {headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)}
    ).map((promise: Promise<JSON>) => {
      const response = promise;
      console.log(response);
    });
  }
  getJson() {
    return this.json;
  }
}

import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

// Overvej at bruge intercepter

@Injectable()
export class ServerService {
  token: string;
  json;

  constructor(private http: HttpClient) {}

  getHighscores() {
    return this.http.get('https://www.localghost.dk/hangman/api/hangman/highscores'
    ).map((res: Response) => {
      // console.log(res);
      return res;
    });

  }
  getGame() {
    this.token = JSON.parse(localStorage.getItem('token')).access_token;
    return this.http.get('https://www.localghost.dk/hangman/api/hangman/game',
      {headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)}
    ).map((res: Response) => {
      // console.log(res);
      return res;
    });

  }

  restartGame() {
    this.token = JSON.parse(localStorage.getItem('token')).access_token;
    return this.http.post('https://www.localghost.dk/hangman/api/hangman/game', null,
      {headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)}
    ).map((res: Response) => {
      // console.log(res);
      return res;
    });
  }

  startGame() {
    this.token = JSON.parse(localStorage.getItem('token')).access_token;
    return this.http.put('https://www.localghost.dk/hangman/api/hangman/game', null,
      {headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)}
    ).map((res: Response) => {
      // console.log(res);
      return res;
    });
  }

  guessLetter(letter: string) {
    this.token = JSON.parse(localStorage.getItem('token')).access_token;
    return this.http.post('https://www.localghost.dk/hangman/api/hangman/guess/' + letter, null,
      {headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)}
    ).map((res: Response) => {
      // console.log(res);
      return res;
    });
  }
}

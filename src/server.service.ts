import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

interface UserResponse {
  studynumber: string;
  password: string;
}

@Injectable()
export class ServerService  {
  token: string;
  json;

  constructor(private http: HttpClient) {}

  getHighscores() {
    this.token = JSON.parse(localStorage.getItem('token')).access_token;
    return this.http.get('https://www.localghost.dk/hangman/api/hangman/highscores',
      {headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)}
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

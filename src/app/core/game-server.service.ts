import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

// Overvej at bruge intercepter

@Injectable()
export class GameServerService {
  constructor(private http: HttpClient) {}

  getHighscores() {
    return this.http.get('https://www.localghost.dk/hangman/api/hangman/highscores'
    ).pipe(
      map((res: Response) => {
        return res;
      })
    );
  }
  getGame() {
    const token = this.parseToken();
    return this.http.get('https://www.localghost.dk/hangman/api/hangman/game',
      {headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)}
    ).pipe(
      map((res: Response) => {
        return res;
      })
    );
  }
  restartGame() {
    const token = this.parseToken();
    return this.http.post('https://www.localghost.dk/hangman/api/hangman/game', null,
      {headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)}
    ).pipe(map((res: Response) => {
        return res;
      })
    );
  }
  startGame() {
    const token = this.parseToken();
    return this.http.put('https://www.localghost.dk/hangman/api/hangman/game', null,
      {headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)}
    ).pipe(
      map((res: Response) => {
        return res;
      })
    );
  }
  guessLetter(letter: string) {
    const token = this.parseToken();
    return this.http.post('https://www.localghost.dk/hangman/api/hangman/guess/' + letter, null,
      {headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)}
    ).pipe(
      map((res: Response) => {
        return res;
      })
    );
  }
  private parseToken() {
    let token;
    try {
      token = JSON.parse(localStorage.getItem('token')).access_token;
    } catch (e) {
      console.log(e);
    }
    return token;
  }
}

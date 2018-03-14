import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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

  getGame() {
    this.token = JSON.parse(localStorage.getItem('token')).access_token;
    return this.http.get('https://www.localghost.dk/hangman/api/hangman/game',
      {headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)}
    ).map((res: Response) => {
      const response = res;
        console.log(response);
      this.json = response;
    });

  }

  restartGame() {
    this.token = JSON.parse(localStorage.getItem('token')).access_token;
    return this.http.post('https://www.localghost.dk/hangman/api/hangman/game', null,
      {headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)}
    ).map((res: Response) => {
      const response = res;
      console.log(response);
      this.json = response;
    });
  }

  startGame() {
    this.token = JSON.parse(localStorage.getItem('token')).access_token;
    return this.http.put('https://www.localghost.dk/hangman/api/hangman/game', null,
      {headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)}
    ).map((res: Response) => {
      const response = res;
      console.log(this.token);
      console.log(response);
      this.json = response;
    });
  }

  guessLetter(letter: string) {
    this.token = JSON.parse(localStorage.getItem('token')).access_token;
    return this.http.post('https://www.localghost.dk/hangman/api/hangman/guess/' + letter, null,
      {headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)}
    ).map((res: Response) => {
      const response = res;
      console.log(response);
      this.json = response;
    });
  }
  getJson() {
    return this.json;
  }
}

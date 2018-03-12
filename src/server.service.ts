import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

interface UserResponse {
  studynumber: string;
  password: string;
}

@Injectable()
export class ServerService implements OnInit {
  results = '';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('https://localghost.dk/')
      .subscribe(data => {
          console.log(data);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Client side error');
          } else {
            console.log('Server side error');
          }
          console.log(err);
        }
      );
  }

}

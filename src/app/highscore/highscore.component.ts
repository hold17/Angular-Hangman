import {AfterViewInit, Component} from '@angular/core';
import {Location} from '@angular/common';
import { ServerService } from '../../server.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html'
})
export class HighscoreComponent {

  rows: any = [{
    playerName: ''
  }];
    constructor(private location: Location, private server: ServerService) {
    console.log(this.rows);
    console.log('Highscores');
    this.server.getHighscores().subscribe(
      (response) => {
        console.log(response);
        this.rows = response;
      }, (error: HttpErrorResponse) => {
        console.log(error);
        console.log(error.status.toString());
        console.log(error.error.error_message);
      }
    );
    console.log('Rows:');
    console.log(this.rows);
  }


  backClicked() {
    this.location.back();
  }

}

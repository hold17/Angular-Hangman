import {Component} from '@angular/core';
import {Location} from '@angular/common';
import { ServerService } from '../../server.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.scss']
})
export class HighscoreComponent {

  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];
  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];

  constructor(private location: Location, private server: ServerService) {
    console.log(this.rows);
    console.log('Highscores');
    this.server.getHighscores().subscribe(
      (response) => {
        console.log(response);
      }, (error: HttpErrorResponse) => {
        console.log(error);
        console.log(error.status.toString());
        console.log(error.error.error_message);
      }
    );
  }


  backClicked() {
    this.location.back();
  }
}

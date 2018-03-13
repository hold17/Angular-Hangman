import {Component} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.css']
})
export class HighscoreComponent {
  constructor(private location: Location) {}
  backClicked() {
    this.location.back();
  }
}

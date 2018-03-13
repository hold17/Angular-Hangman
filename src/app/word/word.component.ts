import {Component, Input, OnInit} from '@angular/core';
import {ServerService} from '../../server.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {
  @Input() index: number;
  gameStatus: string;
  word: 'default' ;
  buttonLetters: string[];
  images: string[] = ['./assets/GRAFIK/galge.png', './assets/GRAFIK/forkert1.png',
    './assets/GRAFIK/forkert2.png', './assets/GRAFIK/forkert3.png', './assets/GRAFIK/forkert4.png'
    , './assets/GRAFIK/forkert5.png', './assets/GRAFIK/forkert6.png'];
  letters: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z'];

  imageIndex = 0;
  buttonEnabled: true;
  game =  <any>{};

  constructor(private serverService: ServerService, private router: Router) {}
  ngOnInit() {
    this.serverService.getGame().subscribe(
      (response: Object) => {
        this.game = response;
        console.log(response);
        this.game = this.serverService.getJson(); // TODO: Find the correct way to do this.
      }, (error: HttpErrorResponse) => {
        console.log(error);
        console.log(error.status.toString());
        console.log(error.error.error_message);
        this.serverService.restartGame().subscribe(
          (restartResponse) => {
            console.log(restartResponse);
            this.game = restartResponse;
          }, (restartError: HttpErrorResponse) => {
            console.log(restartError);
          }
        );
      }
    );

    this.buttonLetters = this.letters;
    this.gameStatus = 'Welcome to hangman, start a game or see the latest highscores!';


  }
  onLetterClick(letter: string) {
    this.serverService.guessLetter(letter).subscribe();
    if (this.game.gameHasBeenLost) {
      this.gameStatus = 'Du har tabt ordet var: ' + this.word;
      this.imageIndex = -1;
    }    else if (this.game.gameHasBeenWon) {
      this.gameStatus = 'Du har vundet ordet var: ' + this.word;
      this.imageIndex = -1;
    }
    if (!this.game.lastGuessedLetterIsCorrect) {
      console.log('Wrong letter ' + letter + ' was pressed');
      this.gameStatus = ('Wrong letter ' + letter + ' was pressed');
      this.imageIndex++;
      return true;
    } else {
      this.gameStatus = ('Correct letter' + letter + ' was pressed');
      return false;
    }
  }

  onHighScoresClicked() {
    this.router.navigate(['/highscores']);
  }
  onStartGameClicked() {
    this.serverService.startGame().subscribe();
  }
}

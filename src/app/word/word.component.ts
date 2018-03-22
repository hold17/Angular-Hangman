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
  index: number;
  gameStatus: string;
  word: 'default' ;
  buttonLetters: string[];
  images: string[] = ['./assets/GRAFIK/galge.png', './assets/GRAFIK/forkert1.png',
    './assets/GRAFIK/forkert2.png', './assets/GRAFIK/forkert3.png', './assets/GRAFIK/forkert4.png'
    , './assets/GRAFIK/forkert5.png', './assets/GRAFIK/forkert6.png'];
  letters: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  game =  <any>{gameHasBeenLost: false,
                gameHasBeenWon: false,
    hasGameBegun: false,
                isGameOver: false,
                lastGuessedLetterIsCorrect: false,
                score: 0,
                time: '',
                usedLetters: [],
                visibleWord: '',
                wrongLettersCount: 0
  };
  imageIndex = 0;
  private previousGameAvailabe = false;
  private reloadedPreviousGame = false;

  constructor(private serverService: ServerService, private router: Router) {}
  ngOnInit() {
    this.newGame();
  }
  onLetterClick(letter: string) {
    this.serverService.guessLetter(letter).subscribe((res: Response) => {
      this.game = res;
      if (this.game.gameHasBeenLost) {
        this.gameStatus = 'You have lost the word was: ' + this.word;
        // this.imageIndex = -1;
      } else if (this.game.gameHasBeenWon) {
        this.gameStatus = 'You have lost the word was : ' + this.word;
        // this.imageIndex = -1;
      } else if (this.game.lastGuessedLetterIsCorrect === false) {
        this.gameStatus = ('Wrong letter ' + letter + ' was pressed ');
        console.log('Wrong letter ' + letter + ' was pressed' + this.game.lastGuessedLetterIsCorrect);
        // this.imageIndex++;
      } else {
        this.gameStatus = ('Correct letter ' + letter + ' was pressed');
        console.log('Wrong letter ' + letter + ' was pressed ' + this.game.lastGuessedLetterIsCorrect);
      }
    });
  }
  onHighScoresClicked() {
    this.router.navigate(['/highscores']);
  }
  onStartGameClicked() {
    this.serverService.startGame().subscribe(
      (response) => {
        this.game = response;
        console.log('This is a put game response:');
        this.previousGameAvailabe = true;
        // this.game = this.serverService.getJson(); // TODO: Find the correct way to do this.
        console.log(this.game);
      }, (error: HttpErrorResponse) => {
        console.log(error);
        console.log(error.status.toString());
        console.log(error.error.error_message);
        this.serverService.restartGame().subscribe(
          (restartResponse) => {
            console.log('This is a restart response:');
            this.game = restartResponse;
            this.reloadedPreviousGame = true;
            console.log(this.game);
          }, (restartError: HttpErrorResponse) => {
            console.log(restartError);
          }
        );
      }
    );
    if (this.previousGameAvailabe && this.reloadedPreviousGame) {
    }
    // if (this.game.isGameOver) {
    //   this.serverService.startGame().subscribe();
    //   this.newGame();
    // }
  }
  newGame() {
    this.serverService.getGame().subscribe(
      (response) => {
        this.game = response;
        console.log('This is a get game response:');
        this.previousGameAvailabe = true;
        console.log(this.game);
      }, (error: HttpErrorResponse) => {
        console.log(error);
        console.log(error.status.toString());
        console.log(error.error.error_message);
        this.serverService.restartGame().subscribe(
          (restartResponse) => {
            console.log('This is a restart response:');
            this.game = restartResponse;
            console.log(restartResponse);
            this.reloadedPreviousGame = true;
          }, (restartError: HttpErrorResponse) => {
            console.log(restartError);
          }
        );
      }
    );
    this.buttonLetters = this.letters;
    this.gameStatus = 'Welcome to hangman, start a game or see the latest highscores!';
  }
}

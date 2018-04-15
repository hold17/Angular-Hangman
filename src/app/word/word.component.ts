import {Component, OnInit} from '@angular/core';
import {ServerService} from '../../server.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {componentRefresh} from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {
  loading = false;
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

  constructor(private serverService: ServerService, private router: Router, private toastr: ToastrService) {
    for (let i = 0; i <= this.game.usedLetters.size; i++) { //TODO: Fix this doesnt work??
      document.getElementById(this.game.usedLetters[i]).hidden = true;
    }
  }
  ngOnInit() {
    this.newGame(); // Initialiserer spillet
  }
  onLetterClick(letter: string) {
    document.getElementById(letter).hidden = true;
    this.loading = true;
    this.serverService.guessLetter(letter).subscribe((res: Response) => {
      this.game = res;
      if (this.game.gameHasBeenLost) {
        this.gameStatus = 'You have lost the word was: ' + this.word;
        // this.imageIndex = -1;
      } else if (this.game.gameHasBeenWon) {
        this.gameStatus = 'You have won the word was : ' + this.word;
        // this.imageIndex = -1;
      } else if (this.game.lastGuessedLetterIsCorrect === false) {
        this.gameStatus = ('Wrong letter ' + letter + ' was pressed ');
        console.log('Wrong letter ' + letter + ' was pressed' + this.game.lastGuessedLetterIsCorrect);
        // this.imageIndex++;
      } else {
        this.gameStatus = ('Correct letter ' + letter + ' was pressed');
        console.log('Correct letter ' + letter + ' was pressed ' + this.game.lastGuessedLetterIsCorrect);
      }
      this.loading = false;
    }, (error: HttpErrorResponse) => {
      this.toastr.error('An error occurred, check the console.');
      if (error.status === 500) {
        this.router.navigate([WordComponent]); // Midlertidig work-around TODO: FIX
      }
      this.loading = false;
      console.log(error);
    });
  }
  onHighScoresClicked() {
    this.router.navigate(['/highscores']);
  }
  onStartGameClicked() {
    this.loading = true;
    this.serverService.startGame().subscribe(
      (response) => {
        this.game = response;
        console.log('This is a put game response:');
        this.previousGameAvailabe = true;
        // this.game = this.serverService.getJson(); // TODO: Find the correct way to do this.
        console.log(this.game);
        this.loading = false;
      }, (error: HttpErrorResponse) => {
        this.loading = true;
        console.log(error);
        console.log(error.status.toString());
        console.log(error.error.error_message);
        this.serverService.restartGame().subscribe(
          (restartResponse) => {
            console.log('This is a restart response:');
            this.game = restartResponse;
            this.reloadedPreviousGame = true;
            this.loading = false;
            console.log(this.game);
          }, (restartError: HttpErrorResponse) => {
            console.log(restartError);
            this.loading = false;
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
        this.toastr.success('Previous game loaded.');
        console.log(this.game);
      }, (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.toastr.warning('Din session er udløbet, log ud og ind igen');
        } else {
          this.toastr.error('An error occurred, check the console');
        }
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

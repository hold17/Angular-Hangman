import {Component, HostListener, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {GameServerService} from '../game-server.service';
import {GameModel} from '../../shared/game.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  loading: boolean;
  redText: string;
  greenText: string;
  sessionExpired: boolean;

  gameStatus: string;
  buttonLetters: string[];
  images: string[];
  letters: string[];
  game: GameModel;
  constructor(private serverService: GameServerService, private router: Router, private toastr: ToastrService) {}
  ngOnInit() {
    this.loading = false;
    this.redText = '';
    this.greenText = '';
    this.sessionExpired = false;
    this.gameStatus = '';
    this.images = ['./assets/GRAFIK/galge.png', './assets/GRAFIK/forkert1.png',
      './assets/GRAFIK/forkert2.png', './assets/GRAFIK/forkert3.png', './assets/GRAFIK/forkert4.png'
      , './assets/GRAFIK/forkert5.png', './assets/GRAFIK/forkert6.png'];
    this.letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
      'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    this.game =  {
      gameHasBeenLost: false,
      gameHasBeenWon: false,
      hasGameBegun: false,
      isGameOver: true,
      lastGuessedLetterIsCorrect: false,
      score: 0,
      time: '',
      usedLetters: [],
      visibleWord: '',
      wrongLettersCount: 0,
      finalGuessWord: '',
      wordExampleBefore: '',
      wordExampleAfter: '',
      wordDefinition: '',
      wordSynonyms: '',
    };
    this.newGame(); // Initialiserer spillet
  }
  newGame() {
    this.loading = true;
    this.serverService.getGame().subscribe(
      (response: GameModel) => {
        this.loading = false;
        this.game = response;
        this.toastr.success('Previous game loaded.');
        if (this.game.gameHasBeenWon || this.game.gameHasBeenLost) {
          this.gameStatus = 'You completed your last game, click to start a new one!';
        } else {
          this.gameStatus = 'Welcome back, continue where you left off!';
        }
      }, (error: HttpErrorResponse) => {
        this.loading = false;
        const txtError = 'Something went wront statuscode: ' + error.status.toString() + ', your session is likely expired';
        if (error.status === 401) {
          this.toastr.info('Your session has expired since you last visited');
          this.redText = txtError;
          this.sessionExpired = true;
        } else if (error.status !== 400) {this.toastr.error('An error occurred, check the console');  console.log(error); } else {
          this.serverService.restartGame().subscribe(
            (restartResponse: GameModel) => {
              console.log('This is a restart response:');
              this.game = restartResponse;
              console.log(restartResponse);
            }, (restartError: HttpErrorResponse) => {
              console.log(restartError);
            }
          );
        }
      }, () => {
        this.loading = false;
      }
    );
    this.buttonLetters = this.letters;
    this.gameStatus = 'Welcome to hangman, start a game or see the latest highscores!';
  }
  onStartGameClicked() {
    this.loading = true;
    this.serverService.startGame().subscribe(
      (response: GameModel) => {
        this.game = response;
        this.gameStatus = 'You can start guessing the new game now!';
        this.greenText = '';
        this.redText = '';
      }, (error: HttpErrorResponse) => {
        console.log(error);
        console.log(error.status.toString());
        console.log(error.error.error_message);
        this.serverService.restartGame().subscribe(
          (restartResponse: GameModel) => {
            console.log('This is a restart response:');
            this.game = restartResponse;
            this.loading = false;
          }, (restartError: HttpErrorResponse) => {
            console.log(restartError);
            this.loading = false;
          }
        );
      }, () => {
        this.loading = false;
      }
    );
  }
  onLetterClick(letter: string) {
    this.game.usedLetters.push(letter);
    this.serverService.guessLetter(letter).subscribe((res: GameModel) => {
      this.game.visibleWord = res.visibleWord;
      this.game.gameHasBeenLost = res.gameHasBeenLost;
      this.game.gameHasBeenWon = res.gameHasBeenWon;
      this.game.lastGuessedLetterIsCorrect = res.lastGuessedLetterIsCorrect;
      if (this.game.gameHasBeenLost) {
        this.game = res;
        this.greenText = '';
        this.redText = 'You have lost, ';
        this.gameStatus = 'try again';
      } else if (this.game.gameHasBeenWon) {
        this.game = res;
        this.redText = '';
        this.greenText = 'Great job, ';
        this.gameStatus = 'you won the game!';

      } else if (this.game.lastGuessedLetterIsCorrect === false) {
        this.greenText = '';
        this.redText = 'Wrong letter ';
        this.gameStatus = (letter + ' was pressed ');

      } else {
        this.redText = '';
        this.greenText = 'Correct letter ';
        this.gameStatus = letter + ' was pressed';
      }
    }, (error: HttpErrorResponse) => {
      if (error.status === 500) { // Undersøger for fejl som sker ved Edge-Case.
        console.log('Error 500');
        this.toastr.warning('The server experienced an unusual error');
      }
      if (error.status !== 400) {
        console.log(error); }
    }, () => {
      if (this.game.isGameOver) {
        this.serverService.restartGame().subscribe(
          () => {}, (restartError: HttpErrorResponse) => {
            console.log(restartError);
          }
        );
      }
    });
  }
  onHighScoresClicked() {
    this.router.navigate(['/highscores']);
  }

  keyPressed(bLetter) {
    // Lytter til alle bogstaver
    for (let i = 0; i < this.buttonLetters.length; i++) {
      if (this.buttonLetters[i] === bLetter) { return true; }
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.keyPressed(event.key)) {
      this.onLetterClick(event.key);
    } else if (event.keyCode === 13 && !this.game.hasGameBegun && !this.loading) {
      this.onStartGameClicked();
    }
  }
}

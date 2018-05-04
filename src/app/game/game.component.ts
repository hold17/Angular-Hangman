import {Component, HostListener, OnInit} from '@angular/core';
import {ServerService} from '../../server.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'app-word',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  loading: boolean;
  redText: string;
  greenText: string;
  sessionExpired = false;
  modalRef: BsModalRef;

  gameStatus: string;
  buttonLetters: string[];
  images: string[];
  letters: string[];
  game: any;
  imageIndex: number;
  private previousGameAvailabe: boolean;
  private reloadedPreviousGame: boolean;

  constructor(private serverService: ServerService, private router: Router, private toastr: ToastrService) {}
  ngOnInit() {
    this.loading = false;
    this.imageIndex = 0;
    this.previousGameAvailabe = false;
    this.reloadedPreviousGame = false;
    this.images = ['./assets/GRAFIK/galge.png', './assets/GRAFIK/forkert1.png',
      './assets/GRAFIK/forkert2.png', './assets/GRAFIK/forkert3.png', './assets/GRAFIK/forkert4.png'
      , './assets/GRAFIK/forkert5.png', './assets/GRAFIK/forkert6.png'];
    this.letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
      'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    this.game =  <any>{gameHasBeenLost: false,
      gameHasBeenWon: false,
      hasGameBegun: false,
      isGameOver: true,
      lastGuessedLetterIsCorrect: false,
      score: 0,
      time: '',
      usedLetters: [],
      visibleWord: '',
      wrongLettersCount: 0,
      finalGuessWord: ''
    };

    this.newGame(); // Initialiserer spillet

  }

  onLetterClick(letter: string) {
    this.game.usedLetters.push(letter);
    this.serverService.guessLetter(letter).subscribe((res: Response) => {
      this.game = res;
      if (this.game.gameHasBeenLost) {
        this.greenText = '';
        this.redText = 'You have lost, ';
        this.gameStatus = 'try again';
        // this.imageIndex = -1;
      } else if (this.game.gameHasBeenWon) {
        this.redText = '';
        this.greenText = 'Great job, ';
        this.gameStatus = 'you won the game!';
        this.game.visibleWord = this.game.finalGuessWord;
        // this.imageIndex = -1;
      } else if (this.game.lastGuessedLetterIsCorrect === false) {
        this.greenText = '';
        this.redText = 'Wrong letter ';
        this.gameStatus = (letter + ' was pressed ');
        // console.log('Wrong letter ' + letter + ' was pressed' + this.game.lastGuessedLetterIsCorrect);
        // this.imageIndex++;
      } else {
        this.redText = '';
        this.greenText = 'Correct letter ';
        this.gameStatus = letter + ' was pressed';
        // console.log('Correct letter ' + letter + ' was pressed ' + this.game.lastGuessedLetterIsCorrect);
      }
    }, (error: HttpErrorResponse) => {
      if (error.status === 500) {
        this.router.navigate([GameComponent]); // Denne fejl kan stoppe hjemmesiden med at virke indtil refresh, derfor reloades
      }
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
        // console.log('This is a put game response:');
        this.previousGameAvailabe = true;
        console.log(this.game);
        this.loading = false;
        this.gameStatus = 'You can start guessing the new game now!';
        this.greenText = '';
        this.redText = '';
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
  }

  newGame() {
    this.serverService.getGame().subscribe(
      (response) => {
        this.game = response;
        // console.log('This is a get game response:');
        this.previousGameAvailabe = true;
        this.toastr.success('Previous game loaded.');
        if (this.game.gameHasBeenWon || this.game.gameHasBeenLost) {
          this.gameStatus = 'You completed your last game, click to start a new one!';
        } else {
          this.gameStatus = 'Welcome back, continue where you left off!';
        }
        // console.log(this.game);
      }, (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.toastr.warning('Your session has expired, please log out, then log in ');
          this.gameStatus = '';
          this.redText = 'Your session has expired, please click log out, then log in';
          this.sessionExpired = true;
          // this.openModal(template);
        } else {
          this.toastr.error('An error occurred, check the console');
        }
        const txtError = 'Something went wront statuscode: ' + error.status.toString() + ', your session is likely expired';
        if (error.status === 401) { console.log(txtError); } else {console.log(error); }
        this.serverService.restartGame().subscribe(
          (restartResponse) => {
            console.log('This is a restart response:');
            this.game = restartResponse;
            console.log(restartResponse);
            this.reloadedPreviousGame = true;
          }, (restartError: HttpErrorResponse) => {
            // console.log(restartError);
          }
        );
      }
    );
    this.buttonLetters = this.letters;
    this.gameStatus = 'Welcome to hangman, start a game or see the latest highscores!';
  }

  keyPressed(bLetter) {
    for (let i = 0; i < this.buttonLetters.length; i++) {
      if (this.buttonLetters[i] === bLetter) { return true; }
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.keyPressed(event.key)) {
      this.onLetterClick(event.key);
    }
  }
}

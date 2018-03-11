import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {
  @Input() index: number;
  gameStatus: string;
  word: string;
  buttonLetters: string[];
  hiddenWord: string;
  symbol = '_';
  images: string[] = ['./assets/GRAFIK/galge.png', './assets/GRAFIK/forkert1.png', './assets/GRAFIK/forkert2.png', './assets/GRAFIK/forkert3.png', './assets/GRAFIK/forkert4.png'
    , './assets/GRAFIK/forkert5.png', './assets/GRAFIK/forkert6.png'];
  letters: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z'];
  imageIndex = 0;



  constructor() { }

  ngOnInit() {
    this.buttonLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
      'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z'];
    this.word = 'default';
    this.gameStatus = 'Welcome to hangman press a button to begin!';
    this.hiddenWord = this.word;
  }

  onLetterClick(letter: string) {
    if (this.imageIndex >= 6) {
      this.gameStatus = 'Du har tabt ordet var: ' + this.word + ', et nyt spil vil starte';
      console.log(this.imageIndex);
      this.imageIndex = -1;
    }
    console.log(letter);
      const clickedLetter = this.word.match(letter);

      if (clickedLetter === null) {
        this.imageIndex++;
        console.log(clickedLetter);
        return true;
      }

      return false;

    }
}
export interface GameModel {
  gameHasBeenLost: boolean;
  gameHasBeenWon: boolean;
  hasGameBegun: boolean;
  isGameOver: boolean;
  lastGuessedLetterIsCorrect: boolean;
  score: number;
  time: string;
  usedLetters: string[];
  visibleWord: string;
  wrongLettersCount: number;
  finalGuessWord: string;
  wordExampleBefore: string;
  wordExampleAfter: string;
  wordDefinition: string;
  wordSynonyms: string;

}

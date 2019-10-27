/**
 * Sudoku is a 9x9 number game where each 3x3 box contains numbers 1-9,
 * each row across contains numbers 1-9,
 * and each column down contains numbers 1-9.
 *
 * --- Data ---
 *
 * `data.board` contains the current state of the game board.
 *  - Will only contain numbers 1-9, or null
 * `data.timeSpent contains the current time in milliseconds
 * the player has been playing.
 *
 *
 * --- Functions ---
 *
 * `getMinutesSpent` returns the minutes spent playing.
 * `getSecondsSpent` returns the seconds spent playing.
 * `getValueAt` returns the value of a board cell at a
 * given index.
 */
const EasyBoard = [
  [1, 3, 7, 8, 2, 6, 5, 9, 4],
  [2, null, null, null, null, 1, null, 7, null],
  [null, 8, null, 5, null, null, null, null, 3],
  [null, null, null, null, 1, null, null, null, null],
  [null, null, null, null, null, null, 4, null, null],
  [null, null, null, 7, null, null, null, null, null],
  [null, 8, null, null, null, null, null, null, null],
  [4, null, 1, null, null, null, 5, null, null],
  [null, null, 9, null, null, null, null, null, null]
];

const MediumBoard = [
  [1, 3, null, 8, null, 6, 5, 9, 4],
  [2, null, null, null, null, 1, null, 7, null],
  [null, 8, null, null, null, null, null, null, 3],
  [null, null, null, null, 1, null, null, null, null],
  [null, null, null, null, null, null, 4, null, null],
  [null, null, null, 7, null, null, null, null, null],
  [null, 8, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, 5, null, null],
  [null, null, null, null, null, null, null, null, null]
];

const HardBoard = [
  [null, null, null, null, null, null, null, null, null],
  [2, null, null, null, null, 1, null, 7, null],
  [null, 8, null, null, null, null, null, null, 3],
  [null, null, null, null, 1, null, null, null, null],
  [null, null, null, null, null, null, 4, null, null],
  [null, null, null, 7, null, null, null, null, null],
  [null, 8, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, 5, null, null],
  [null, null, null, null, null, null, null, null, null]
];

const DEFAULT_DATA = {
  board: EasyBoard,
  timeSpent: 82005,
  difficulty: "easy"
};

const SudokuModel = {
  data: { ...DEFAULT_DATA },
  reset() {
    this.data = { ...DEFAULT_DATA };
  },
  setDifficulty(difficulty) {
    switch (difficulty) {
      case "easy":
        this.data.board = EasyBoard;
        this.data.difficulty = difficulty;
        break;
      case "medium":
        this.data.board = MediumBoard;
        this.data.difficulty = difficulty;
        break;
      case "hard":
        this.data.board = HardBoard;
        this.data.difficulty = difficulty;
        break;
    }
  },
  getDifficulty() {
    return this.data.difficulty;
  },
  getMinutesSpent() {
    return Math.floor((this.data.timeSpent / 1000 / 60) << 0);
  },
  getSecondsSpent() {
    return Math.floor((this.data.timeSpent / 1000) % 60);
  },
  setValueAt(square, spot, value) {
    this.data.board[square][spot] = value;
  },
  getValueAt(square, spot) {
    return this.data.board[square][spot];
  }
};

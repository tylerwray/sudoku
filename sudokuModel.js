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
const EmptyBoard = [
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null]
];

const DEFAULT_DATA = {
  board: EmptyBoard,
  timeSpent: 0,
  difficulty: "easy",
  boards: {},
  invalidSpots: {}
};

const SudokuModel = {
  timerKey: "cs2250webprogramming-timer",
  data: { ...DEFAULT_DATA },
  reset() {
    this.data = {
      ...this.data,
      board: EmptyBoard,
      timeSpent: 0,
      difficulty: "easy",
      invalidSpots: {}
    };
    localStorage.removeItem(this.timerKey);
  },
  setDifficulty(difficulty) {
    this.data.board = JSON.parse(JSON.stringify(this.data.boards[difficulty]));
    this.data.difficulty = difficulty;
  },
  getDifficulty() {
    return this.data.difficulty;
  },
  getBoards() {
    return this.data.boards;
  },
  getMinutesSpent() {
    return Math.floor((this.data.timeSpent / 1000 / 60) << 0);
  },
  getSecondsSpent() {
    return Math.floor((this.data.timeSpent / 1000) % 60);
  },
  getValueAt(square, spot) {
    return this.data.board[square][spot];
  },
  setValueAt(square, spot, value) {
    this.data.board[square][spot] = value;
  },
  isValid(square, spot, value) {
    // It's okay if number is nothing
    if (value === null) return true;

    // Don't err if its
    if (this.isLocked(square, spot)) return true;

    // Check if 9x9 square contains the same number twice
    if (this.countItems(this.data.board[square], value) >= 2) return false;

    // Check if vertical column is okay
    if (this.inVerticalColumn(square, spot, value)) return false;

    // Check if horizontal row is okay
    if (this.inHorizontalRow(square, spot, value)) return false;

    // Prob okay if it passed these checks
    return true;
  },
  inVerticalColumn(square, spot, value) {
    const offsets = [-6, -3, 0, 3, 6];

    for (const squareOffset of offsets) {
      for (const spotOffset of offsets) {
        const nineByNine = this.data.board[square + squareOffset];
        if (
          nineByNine &&
          nineByNine[spot + spotOffset] === value &&
          // Don't check the same square the value is in
          squareOffset !== 0
        ) {
          return true;
        }
      }
    }

    return false;
  },
  inHorizontalRow(square, spot, value) {
    const offsets = [-2, -1, 0, 1, 2];

    for (const squareOffset of offsets) {
      for (const spotOffset of offsets) {
        const nineByNine = this.data.board[square + squareOffset];
        if (
          nineByNine &&
          nineByNine[spot + spotOffset] === value &&
          // Don't check the same square the value is in
          squareOffset !== 0
        ) {
          return true;
        }
      }
    }

    return false;
  },
  isInvalid(square, spot) {
    return !!this.data.invalidSpots[[square, spot]];
  },
  markInvalid(square, spot) {
    this.data.invalidSpots = {
      ...this.data.invalidSpots,
      [[square, spot]]: true
    };
  },
  unMarkInvalid(square, spot) {
    this.data.invalidSpots = {
      ...this.data.invalidSpots,
      [[square, spot]]: false
    };
  },
  countItems(array, value) {
    return array.filter(i => i === value).length;
  },
  isLocked(square, spot) {
    return !!this.data.boards[this.data.difficulty][square][spot];
  },
  tick() {
    this.data.timeSpent += 1000;
  },
  saveTimer() {
    localStorage.setItem(this.timerKey, this.data.timeSpent);
  },
  loadTimer() {
    const timer = localStorage.getItem(this.timerKey);

    if (timer !== null) {
      this.data.timeSpent = parseInt(timer, 10);
    }
  },
  async loadBoards() {
    this.data.boards = await fetch("boards.json").then(res => res.json());
    this.data.board = JSON.parse(JSON.stringify(this.data.boards.easy));
  }
};

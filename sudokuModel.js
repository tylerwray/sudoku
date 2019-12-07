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
  boards: {}
};

const SudokuModel = {
  data: { ...DEFAULT_DATA },
  reset() {
    this.data = {
      ...this.data,
      board: EmptyBoard,
      timeSpent: 0,
      difficulty: "easy"
    };
  },
  setDifficulty(difficulty) {
    switch (difficulty) {
      case "easy":
        this.data.board = this.data.boards.easy;
        this.data.difficulty = difficulty;
        break;
      case "medium":
        this.data.board = this.data.boards.medium;
        this.data.difficulty = difficulty;
        break;
      case "hard":
        this.data.board = this.data.boards.hard;
        this.data.difficulty = difficulty;
        break;
    }
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
  setValueAt(square, spot, value) {
    this.data.board[square][spot] = value;
  },
  getValueAt(square, spot) {
    return this.data.board[square][spot];
  },
  tick() {
    this.data.timeSpent += 1000;
  },
  async loadBoards() {
    this.data.boards = await fetch("boards.json").then(res => res.json());
    this.data.board = this.data.boards.easy;
  }
};

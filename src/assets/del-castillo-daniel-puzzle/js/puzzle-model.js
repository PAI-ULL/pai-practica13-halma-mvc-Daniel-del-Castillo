/**
 * Programación de Aplicaciones Interactivas
 * Universidad de La Laguna 2020-2021
 * Thirteenth assignment
 * Grado en Ingeniería Informática
 * @author Daniel del Castillo de la Rosa
 * @date 18/05/2021
 * @file This file imports the class and uses it to draw the board
 * @module PuzzleModel
 */

'use strict';

/**
 * The class PuzzleModel which is responsible for the logic of the puzzle
 */
export class PuzzleModel {
  /**
   * @property {number} gridSize The size of the puzzle grid
   * @private
  */
  #gridSize;
  /**
   * @property {number} numberOfMoves The number of moves already performed
   * @private
  */
  #numberOfMoves;
  /**
   * @property {Array} grid The grid that represents the positions of the pieces
   *     in the board
   * @private
  */
  #grid;
  /**
   * @property {boolean} win Whether the player has won
   * @private
  */
  #win;

  /**
   * The constructor
   * @param {number} gridSize The size of the Puzzle board
   */
  constructor(gridSize) {
    this.#gridSize = gridSize;
    this.#grid = [];
    this.startGame();
  }

  /**
   * Starts a new game
   */
  startGame() {
    this.#numberOfMoves = 0;
    const possibleValues = [];
    while (possibleValues.length !== this.#gridSize * this.#gridSize) {
      const number = Math.floor(Math.random() * Math.pow(this.#gridSize, 2));
      if (!possibleValues.includes(number)) {
        possibleValues.push(number);
      }
    }
    this.#grid = [];
    for (let i = 0; i < this.#gridSize; i++) {
      this.#grid.push([]);
      for (let j = 0; j < this.#gridSize; j++) {
        this.#grid[i].push(possibleValues.pop());
      }
    }
    this.#checkWin();
  }

  /**
   * @return {Array} Returns the grid with a boolean in each position
   *     that indicates whether there is a piece there or not
   */
  getPiecePositions() {
    return this.#grid;
  }

  /**
   * @return {number} The number of moves performed
   */
  getMoves() {
    return this.#numberOfMoves;
  }

  /**
   * @return {boolean} Whether the player has won
   */
  getWinState() {
    return this.#win;
  }

  /**
   * The function that updates the game state after a click
   * @param {Array} position The position of the click
   */
  handleClick(position) {
    if (this.#win) {
      return;
    }
    if (this.#grid[position[1]][position[0]] === 0) {
      return;
    }
    const movement = this.#getPossibleMovement(position);
    if (movement == undefined) {
      return;
    }
    const newVal = this.#grid[movement[1]][movement[0]];
    this.#grid[movement[1]][movement[0]] = this.#grid[position[1]][position[0]];
    this.#grid[position[1]][position[0]] = newVal;
    this.#numberOfMoves += 1;
    this.#checkWin();
  }

  /**
   * A function that checks if there is a possible movement
   *     for a certain position
   * @param {Array} position The position of the click
   * @return {Array} The position where it is possible to move
   */
  #getPossibleMovement(position) {
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    for (const direction of directions) {
      const x = position[0] + direction[0];
      const y = position[1] + direction[1];
      if (this.#grid[y] != undefined && this.#grid[y][x] === 0) {
        return [x, y];
      }
    }
    return undefined;
  }


  /**
   * Updates the win property
   * @private
   * @memberof PuzzleModel
   * @method #checkWin
   */
  #checkWin() {
    let counter = 1;
    for (let i = 0; i < this.#gridSize; i++) {
      for (let j = 0; j < this.#gridSize; j++) {
        if (this.#grid[i][j] !== counter) {
          break;
        }
        counter += 1;
      }
    }
    if (counter === Math.pow(this.#gridSize, 2)) {
      this.#win = true;
    } else {
      this.#win = false;
    }
  }
};

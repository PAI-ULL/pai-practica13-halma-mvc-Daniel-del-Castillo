/**
 * Programación de Aplicaciones Interactivas
 * Universidad de La Laguna 2020-2021
 * Thirteenth assignment
 * Grado en Ingeniería Informática
 * @author Daniel del Castillo de la Rosa
 * @date 14/05/2021
 * @file This file imports the class  and uses it to draw the board
 * @module HalmaModel
 */

'use strict';

/**
 * The class HalmaView which is responsible for the visualization
 *     of the halma board
 */
export class HalmaModel {
  /**
   * @const {number} gridSize The size of the halma grid
   * @private
  */
  #gridSize;
  /**
   * @const {number} numberOfMoves The number of moves already performed
   * @private
  */
  #numberOfMoves;
  /**
   * @const {Array} grid The grid that represents the positions of the pieces
   *     in the board
   * @private
  */
  #grid;
  /**
   * @const {Array} focused The position of the focused piece
   * @private
  */
  #focused;
  /**
   * @const {boolean} win Whether the player has won
   * @private
  */
  #win;
  /**
   * @const {Array} startingPositions The positions in which the pieces are
   *     placed at the start of the game.
   * @private
  */
  #startingPositions;
  /**
   * @const {Array} finalPositions The positions that need to be covered to win
   * @private
  */
  #finalPositions;
  /**
   * @const {Array} lastJump The position for the last jump if the last move
   *     was a jump
   * @private
  */
  #lastJump;
  /**
   * @const {number} numberOfPieces The number of pieces. They will be placed
   *     in a square, so this number should have a exact square
   * @private
  */
  static #numberOfPieces = 9;

  /**
   * The constructor
   * @param {number} gridSize The size of the Halma board
   */
  constructor(gridSize) {
    this.#gridSize = gridSize;
    this.#grid = [];
    this.#startingPositions = [];
    this.#finalPositions = [];
    for (let i = 0; i < gridSize; i++) {
      this.#grid.push([]);
      for (let j = 0; j < gridSize; j++) {
        this.#grid[i].push(false);
        if (i >= this.#gridSize - Math.sqrt(HalmaModel.#numberOfPieces) &&
            j < Math.sqrt(HalmaModel.#numberOfPieces)) {
          this.#startingPositions.push([j, i]);
        // eslint-disable-next-line max-len
        } else if (j >= this.#gridSize - Math.sqrt(HalmaModel.#numberOfPieces) &&
            i < Math.sqrt(HalmaModel.#numberOfPieces)) {
          this.#finalPositions.push([j, i]);
        }
      }
    }
    this.#focused = undefined;
    this.#lastJump = undefined;
    this.#numberOfMoves = 0;
    this.#win = false;
  }

  /**
   * Starts a new game
   */
  startGame() {
    this.#numberOfMoves = 0;
    this.#win = false;
    for (let i = 0; i < this.#grid.length; i++) {
      for (let j = 0; j < this.#grid[0].length; j++) {
        this.#grid[i][j] = false;
      }
    }
    this.#startingPositions.forEach((position) => {
      this.#grid[position[1]][position[0]] = true;
    });
    this.#focused = undefined;
    this.#lastJump = undefined;
  }

  /**
   * @return {Array} Returns the grid with a boolean in each position
   *     that indicates whether there is a piece there or not
   */
  getPiecePositions() {
    return this.#grid;
  }

  /**
   * @return {Array} Returns the position of the focused piece or undefined
   */
  getFocused() {
    return this.#focused;
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
    if (this.#grid[position[1]][position[0]]) {
      this.#focused = position;
      return;
    }
    if (this.#focused == undefined) {
      return;
    }
    if (this.#getDistance(position, this.#focused) === 1) {
      this.#handleStep(position);
      this.#checkWin();
      return;
    }
    if (this.#getDistance(position, this.#focused) === 2) {
      this.#handleJump(position);
      this.#checkWin();
      return;
    }
    this.#focused = undefined;
  }

  /**
   * The function that updates the game state after a step
   * @param {Array} position The position of the click
   * @method #handleStep
   * @private
   */
  #handleStep(position) {
    this.#grid[this.#focused[1]][this.#focused[0]] = false;
    this.#focused = position;
    this.#grid[this.#focused[1]][this.#focused[0]] = true;
    this.#numberOfMoves += 1;
    this.#lastJump = undefined;
  }

  /**
   * The function that updates the game state after a jump
   * @param {Array} position The position of the click
   * @method #handleJump
   * @private
   */
  #handleJump(position) {
    const middlePosition = this.#getMiddlePosition(position, this.#focused);
    if (middlePosition != undefined &&
        this.#grid[middlePosition[1]][middlePosition[0]]) {
      if (this.#lastJump == undefined ||
          this.#lastJump[0] !== this.#focused[0] ||
          this.#lastJump[1] !== this.#focused[1]) {
        this.#numberOfMoves += 1;
      }
      this.#grid[this.#focused[1]][this.#focused[0]] = false;
      this.#focused = position;
      this.#grid[this.#focused[1]][this.#focused[0]] = true;
      this.#lastJump = this.#focused;
      return;
    }
  }

  /**
   * @param {Array} position1
   * @param {Array} position2
   * @return {number} The chebyshev distance between the positions
   * @method #getDistance
   * @private
   */
  #getDistance(position1, position2) {
    return Math.max(
        Math.abs(position1[0] - position2[0]),
        Math.abs(position1[1] - position2[1]),
    );
  }

  /**
   * Calculates the middle position between two positions that
   *     have a Chebyshev distance between them of 2. It returns
   *     undefined if the positions don't form an straight line
   * @param {Array} position1
   * @param {Array} position2
   * @return {Array} The position in the middle
   * @method #getMiddlePosition
   * @private
   */
  #getMiddlePosition(position1, position2) {
    const x = (position1[0] + position2[0]) / 2;
    const y = (position1[1] + position2[1]) / 2;
    if (Number.isInteger(x) && Number.isInteger(y)) {
      return [x, y];
    }
  }

  /**
   * Updates the win property
   * @method #checkWin
   * @private
   */
  #checkWin() {
    this.#win = this.#finalPositions.every((position) => {
      return this.#grid[position[1]][position[0]];
    });
  }
};

/**
 * Programación de Aplicaciones Interactivas
 * Universidad de La Laguna 2020-2021
 * Thirteenth assignment
 * Grado en Ingeniería Informática
 * @author Daniel del Castillo de la Rosa
 * @date 18/05/2021
 * @file This file imports the class  and uses it to draw the board
 * @module PuzzleView
 */

'use strict';

/**
 * The class PuzzleView which is responsible for the visualization
 *     of the puzzle board
 */
export class PuzzleView {
  /**
   * @property {number} gridSize The size of the puzzle grid
   * @private
  */
  #gridSize;
  /**
   * @property {number} canvasSize The size of the canvas in pixels
   * @private
  */
  #canvasSize;
  /**
   * @property {CanvasRenderingContext2D} canvasContext The context of the
   *     canvas that makes it possible to draw
   * @private
  */
  #canvasContext;
  /**
   * @property {HTMLElement} moveslabel A label in which to put the
   *     number of moves
   * @private
  */
  #movesLabel;
  /**
   * @property {HTMLElement} winLabel A place in which to tell
   *     the player he has won
   * @private
  */
  #winLabel;
  /**
   * @property {string} squareColor The color of each square in the board
   * @private
  @ts-ignore */
  static #SQUARE_COLOR = 'rgba(255, 255, 255, 255)';
  /**
   * @property {string} lineColor The color of each line in the board
   * @private
  @ts-ignore */
  static #LINE_COLOR = 'rgba(128, 128, 128, 255)';
  /**
   * @property {string} pieceColor The color of each piece in the board
   * @private
  @ts-ignore */
  static #NUMBER_COLOR = 'rgba(0, 0, 0, 255)';
  /**
   * @property {number} numberMargin The margin for the numbers
   * @private
  @ts-ignore */
  static #NUMBER_MARGIN = 0.4;
  /**
   * @property {number} numberSize The size of the number in percentage of the
   *     square size
   * @private
  @ts-ignore */
  static #NUMBER_SIZE = 0.5;
  /**
   * @property {number} numberFront The font of the numbers to be drawn. It
   *     doesn't contain the size, because the size will be decided at runtime
   * @private
  @ts-ignore */
  static #NUMBER_FONT = 'px serif';
  /**
   * The constructor
   * @param {HTMLCanvasElement} canvas The canvas in which the
   *     representation will be drawn
   * @param {number} gridSize The size of the grid
   * @param {HTMLElement} movesLabel A place in which to put the number of moves
   * @param {HTMLElement} winLabel A place in which to tell
   *     the player he has won
   */
  constructor(canvas, gridSize, movesLabel, winLabel) {
    this.#gridSize = gridSize;
    this.#canvasSize = Math.min(canvas.width, canvas.height);
    this.#canvasContext = canvas.getContext('2d');
    this.#drawGrid();
    this.#movesLabel = movesLabel;
    this.#winLabel = winLabel;
  }

  /**
   * Draws the Puzzle grid
   * @method #drawGrid
   * @private
  */
  #drawGrid() {
    const squareSize = this.getSquareSize();
    this.#canvasContext.fillStyle = PuzzleView.#SQUARE_COLOR;
    this.#canvasContext.fillRect(0, 0, this.#canvasSize, this.#canvasSize);
    this.#canvasContext.strokeStyle = PuzzleView.#LINE_COLOR;
    this.#canvasContext.beginPath();
    // eslint-disable-next-line max-len
    for (let xStart = squareSize; xStart < this.#canvasSize; xStart += squareSize) {
      this.#canvasContext.moveTo(xStart, 0);
      this.#canvasContext.lineTo(xStart, this.#canvasSize);
    }
    // eslint-disable-next-line max-len
    for (let yStart = squareSize; yStart < this.#canvasSize; yStart += squareSize) {
      this.#canvasContext.moveTo(0, yStart);
      this.#canvasContext.lineTo(this.#canvasSize, yStart);
    }
    this.#canvasContext.stroke();
  }

  /**
   * Draws the numbers
   * @param {Array} grid A grid of booleans with the value for each position
   */
  draw(grid) {
    this.#drawGrid();
    const squareSize = this.getSquareSize();
    this.#canvasContext.fillStyle = PuzzleView.#NUMBER_COLOR;
    // eslint-disable-next-line max-len
    this.#canvasContext.font = Math.floor(squareSize * PuzzleView.#NUMBER_SIZE) + PuzzleView.#NUMBER_FONT;
    for (let yCoordinate = 0; yCoordinate < grid[0].length; yCoordinate++) {
      for (let xCoordinate = 0; xCoordinate < grid.length; xCoordinate++) {
        if (grid[yCoordinate][xCoordinate] === 0) {
          continue;
        }
        this.#canvasContext.fillText(
            grid[yCoordinate][xCoordinate],
            xCoordinate * squareSize + squareSize *
              (PuzzleView.#NUMBER_MARGIN - PuzzleView.#NUMBER_SIZE / 10),
            yCoordinate * squareSize + squareSize *
              (PuzzleView.#NUMBER_MARGIN + PuzzleView.#NUMBER_SIZE / 2),
        );
      }
    }
  }

  /**
   * Updates the number of moves in the label
   * @param {number} numberOfMoves The actual number of moves
   */
  updateMoves(numberOfMoves) {
    this.#movesLabel.textContent = `Moves: ${numberOfMoves}`;
  }

  /**
   * Updates game status
   * @param {boolean} win Wheter the player has won
   */
  updateWinState(win) {
    if (win) {
      this.#winLabel.textContent = 'You won!';
    } else {
      this.#winLabel.textContent = '';
    }
  }

  /**
   * Allows getting the size of a square
   * @return {number} The size of a square in the board
   */
  getSquareSize() {
    return this.#canvasSize / this.#gridSize;
  }
};

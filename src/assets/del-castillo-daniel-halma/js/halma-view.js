/**
 * Programación de Aplicaciones Interactivas
 * Universidad de La Laguna 2020-2021
 * Thirteenth assignment
 * Grado en Ingeniería Informática
 * @author Daniel del Castillo de la Rosa
 * @date 14/05/2021
 * @file This file imports the class  and uses it to draw the board
 * @module HalmaView
 */

'use strict';

/**
 * The class HalmaView which is responsible for the visualization
 *     of the halma board
 */
export class HalmaView {
  /**
   * @const {number} gridSize The size of the halma grid
   * @private
  */
  #gridSize;
  /**
   * @const {number} canvasSize The size of the canvas in pixels
   * @private
  */
  #canvasSize;
  /**
   * @const {CanvasRenderingContext2D} canvasContext The context of the canvas
   *     that makes it possible to draw
   * @private
  */
  #canvasContext;
  /**
   * @const {HTMLElement} moveslabel A label in which to put the number of moves
   * @private
  */
  #movesLabel;
  /**
   * @param {HTMLElement} winLabel A place in which to tell
   *     the player he has won
   * @private
  */
  #winLabel;
  /**
   * @const {string} squareColor The color of each square in the board
   * @private
  @ts-ignore */
  static #SQUARE_COLOR = 'rgba(255, 255, 255, 255)';
  /**
   * @const {string} lineColor The color of each line in the board
   * @private
  @ts-ignore */
  static #LINE_COLOR = 'rgba(128, 128, 128, 255)';
  /**
   * @const {string} pieceColor The color of each piece in the board
   * @private
  @ts-ignore */
  static #PIECE_COLOR = 'rgba(0, 0, 0, 255)';
  /**
   * @const {number} pieceMargin The margin between each piece and the
   *     lines in pixels
   * @private
  @ts-ignore */
  static #PIECE_MARGIN = 10;
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
   * Draws the Halma grid
   * @method #drawGrid
   * @private
  */
  #drawGrid() {
    const squareSize = this.getSquareSize();
    this.#canvasContext.fillStyle = HalmaView.#SQUARE_COLOR;
    this.#canvasContext.fillRect(0, 0, this.#canvasSize, this.#canvasSize);
    this.#canvasContext.strokeStyle = HalmaView.#LINE_COLOR;
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
   * Draws the pieces
   * @param {Array} grid A grid of booleans with the positions in which there
   *     are pieces containing the true
   */
  draw(grid) {
    this.#drawGrid();
    const squareSize = this.getSquareSize();
    this.#canvasContext.strokeStyle = HalmaView.#PIECE_COLOR;
    for (let yCoordinate = 0; yCoordinate < grid[0].length; yCoordinate++) {
      for (let xCoordinate = 0; xCoordinate < grid.length; xCoordinate++) {
        if (!grid[yCoordinate][xCoordinate]) {
          continue;
        }
        this.#canvasContext.beginPath();
        this.#canvasContext.arc(
            squareSize * (xCoordinate + 0.5),
            squareSize * (yCoordinate + 0.5),
            squareSize / 2 - HalmaView.#PIECE_MARGIN,
            0,
            2 * Math.PI,
        );
        this.#canvasContext.stroke();
      }
    }
  }

  /**
   * Draws the the focused piece
   * @param {Array} position The position of the focused piece
   */
  drawFocused(position) {
    const squareSize = this.getSquareSize();
    this.#canvasContext.fillStyle = HalmaView.#PIECE_COLOR;
    this.#canvasContext.beginPath();
    this.#canvasContext.arc(
        squareSize * (position[0] + 0.5),
        squareSize * (position[1] + 0.5),
        squareSize / 2 - HalmaView.#PIECE_MARGIN,
        0,
        2 * Math.PI,
    );
    this.#canvasContext.fill();
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

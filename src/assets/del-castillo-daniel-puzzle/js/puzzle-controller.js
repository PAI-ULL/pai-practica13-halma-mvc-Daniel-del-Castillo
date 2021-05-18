/**
 * Programación de Aplicaciones Interactivas
 * Universidad de La Laguna 2020-2021
 * Thirteenth assignment
 * Grado en Ingeniería Informática
 * @author Daniel del Castillo de la Rosa
 * @date 18/05/2021
 * @file This file exports the class PuzzleController
 * @module PuzzleController
 */

'use strict';

import {PuzzleModel} from './puzzle-model.js';
import {PuzzleView} from './puzzle-view.js';

/**
 * The controller for the Puzzle which takes care that the model and the view
 *     interact correctly and handles events
 */
export class PuzzleController {
  /**
   * @property {number} GRID_SIZE The size of the halma grid
   * @private
  @ts-ignore */
  static #GRID_SIZE = 3;
  /**
   * @property {PuzzleView} view An instance of the PuzzleView class that will
   *     manage the visualization of the halma board
   * @private
  */
  #view;
  /**
   * @property {PuzzleModel} model An instance of the PuzzleModel class that
   *     will manage the logic of the game
   * @private
  */
  #model;
  /**
   * The constructor
   * @param {HTMLCanvasElement} canvas The canvas in which to represent
   *     the Puzzle board
   * @param {HTMLElement} movesLabel A place in which to put the number of moves
   * @param {HTMLElement} winLabel A place in which to tell
   *     the player he has won
   */
  constructor(canvas, movesLabel, winLabel) {
    this.#view = new PuzzleView(
        canvas,
        PuzzleController.#GRID_SIZE,
        movesLabel,
        winLabel,
    );
    this.#model = new PuzzleModel(PuzzleController.#GRID_SIZE);
  }

  /**
   * Starts a new game
   */
  startGame() {
    this.#model.startGame();
    this.#updateView();
  }

  /**
   * Updates the view
   * @method #updateView
   * @private
   */
  #updateView() {
    this.#view.draw(this.#model.getPiecePositions());
    this.#view.updateMoves(this.#model.getMoves());
    this.#view.updateWinState(this.#model.getWinState());
  }

  /**
   * Handles a click
   * @param {MouseEvent} event The click event
   */
  handleClick(event) {
    const position = this.#getCursorPositionFromEvent(event);
    this.#model.handleClick(position);
    this.#updateView();
  }

  /**
   * Gets the position of the cursor from the event
   * @method #getCursorPositionFromEvent
   * @param {MouseEvent} event The click event
   * @return {Array} Returns the position clicked
   * @private
   */
  #getCursorPositionFromEvent(event) {
    const squareSize = this.#view.getSquareSize();
    return [
      Math.floor(event.offsetX / squareSize),
      Math.floor(event.offsetY / squareSize),
    ];
  }
}

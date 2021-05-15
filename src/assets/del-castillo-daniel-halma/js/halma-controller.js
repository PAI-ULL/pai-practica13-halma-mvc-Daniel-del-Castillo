/**
 * Programación de Aplicaciones Interactivas
 * Universidad de La Laguna 2020-2021
 * Thirteenth assignment
 * Grado en Ingeniería Informática
 * @author Daniel del Castillo de la Rosa
 * @date 14/05/2021
 * @file This file exports the class HalmaController
 * @module HalmaController
 */

'use strict';

import {HalmaModel} from './halma-model.js';
import {HalmaView} from './halma-view.js';

/**
 * The controller for the Halma
 */
export class HalmaController {
  /**
   * @const {number} GRID_SIZE The size of the halma grid
   * @private
  @ts-ignore */
  static #GRID_SIZE = 9;
  /**
   * @const {HalmaView} view An instance of the HalmaView class that will
   *     manage the visualization of the halma board
   * @private
  */
  #view;
  /**
   * @const {HalmaModel} model An instance of the HalmaModel class that will
   *     manage the logic of the game
   * @private
  */
  #model;
  /**
   * The constructor
   * @param {HTMLCanvasElement} canvas The canvas in which to represent
   *     the Halma board
   * @param {HTMLElement} movesLabel A place in which to put the number of moves
   * @param {HTMLElement} winLabel A place in which to tell
   *     the player he has won
   */
  constructor(canvas, movesLabel, winLabel) {
    this.#view =
        new HalmaView(canvas, HalmaController.#GRID_SIZE, movesLabel, winLabel);
    this.#model = new HalmaModel(HalmaController.#GRID_SIZE);
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
    const focused = this.#model.getFocused();
    if (focused != undefined) {
      this.#view.drawFocused(focused);
    }
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

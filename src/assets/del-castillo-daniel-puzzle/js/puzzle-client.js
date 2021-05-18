/**
 * Programación de Aplicaciones Interactivas
 * Universidad de La Laguna 2020-2021
 * Thirteenth assignment
 * Grado en Ingeniería Informática
 * @author Daniel del Castillo de la Rosa
 * @date 18/05/2021
 * @file This file imports the class PuzzleController and uses it to
 *     draw the board
 * @module PuzzleClient
 */

'use strict';

import {PuzzleController} from './puzzle-controller.js';

/**
 * Spawns the game in the canvas
 */
const main = () => {
  const canvas = document.getElementById('canvas');
  const movesLabel = document.getElementById('moves');
  const winLabel = document.getElementById('win');
  const controller = new PuzzleController(canvas, movesLabel, winLabel);
  canvas.addEventListener('click', (env) => {
    controller.handleClick(env);
  });
  controller.startGame();
  const restart = document.getElementById('restart');
  restart.addEventListener('click', (env) => {
    controller.startGame(env);
  });
};

main();

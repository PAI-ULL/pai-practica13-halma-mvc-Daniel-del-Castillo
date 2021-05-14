// @ts-check
/**
 * Programación de Aplicaciones Interactivas
 * Universidad de La Laguna 2020-2021
 * Thirteenth assignment
 * Grado en Ingeniería Informática
 * @author Daniel del Castillo de la Rosa
 * @date 14/05/2021
 * @file A small express server to show the exercises done in the
 *     thirteenth PAI assignment
 */

import express from 'express';

const PORT = 8080;
import path from 'path';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Entry point for the program
 */
const main = () => {
  const app = express();
  app.use(express.static(path.join(__dirname, 'assets')));
  app.listen(PORT, '0.0.0.0', function() {
    console.log('The server is running on http://<your machine IP addr>:' + PORT);
  });
};

main();

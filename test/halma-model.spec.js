import {HalmaModel} from
  '../src/assets/del-castillo-daniel-halma/js/halma-model.js';
import 'chai/register-should.js';

describe('Application logic', () => {
  it('Can be instanced', () => {
    new HalmaModel(9).should.be.an('object');
  });

  it('A game can be started', () => {
    const model = new HalmaModel(9);
    model.startGame();
    model.should.be.an('object');
  });

  it('It is possible to get the position of the pieces', () => {
    const model = new HalmaModel(9);
    model.startGame();
    model.getPiecePositions().should.be.an('array');
  });

  it('It is possible to get the state of the game', () => {
    const model = new HalmaModel(9);
    model.startGame();
    model.getWinState().should.eql(false);
  });

  it('It is possible to get the number of moves', () => {
    const model = new HalmaModel(9);
    model.startGame();
    model.getMoves().should.eql(0);
  });

  it('It is possible to get the position of the focused piece', () => {
    const model = new HalmaModel(9);
    model.startGame();
    model.handleClick([0, 7]);
    model.getFocused().should.eql([0, 7]);
  });

  it('A piece can perform an step', () => {
    const model = new HalmaModel(9);
    model.startGame();
    model.handleClick([2, 6]);
    model.handleClick([2, 5]);
    model.getPiecePositions()[5][2].should.eql(true);
  });

  it('It isn\'t possible to move after the player has won', () => {
    const model = new HalmaModel(3);
    model.startGame();
    model.handleClick([2, 6]);
    should.not.exist(model.getFocused());
  });

  it('Nothing happens if the player clicks in an empty square', () => {
    const model = new HalmaModel(9);
    model.startGame();
    model.handleClick([7, 6]);
    should.not.exist(model.getFocused());
  });

  it('It is possible to for a piece to jump over other piece', () => {
    const model = new HalmaModel(9);
    model.startGame();
    model.handleClick([1, 7]);
    model.handleClick([3, 7]);
    model.getPiecePositions()[7][3].should.eql(true);
  });

  it('Clicking in an invalid position to step or jump loses the focus', () => {
    const model = new HalmaModel(9);
    model.startGame();
    model.handleClick([1, 7]);
    model.handleClick([7, 7]);
    should.not.exist(model.getFocused());
  });

  it('Performing several jumps in a row only counts as one move', () => {
    const model = new HalmaModel(9);
    model.startGame();
    model.handleClick([2, 7]);
    model.handleClick([3, 7]);
    model.handleClick([0, 7]);
    model.handleClick([2, 7]);
    model.handleClick([4, 7]);
    model.getMoves().should.eql(2);
  });
});

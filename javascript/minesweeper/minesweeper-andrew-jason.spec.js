import {Minesweeper, Pieces} from './minesweeper-andrew-jason';


describe('Minesweeper()', () => {
  let minesweeper;

  beforeEach(() => {
    minesweeper = new Minesweeper();
  });

  test('handles no rows', () => {
    expect(minesweeper.annotate([])).toEqual([]);
  });

  test('getting pieces', () => {
    const input = [
      '   ',
      ' * ',
      '   ',
    ];
    minesweeper.annotate(input);
    expect(minesweeper.getPiece(1, 1)).toEqual(Pieces.Mine);
    expect(minesweeper.getPiece(2, 2)).toEqual(Pieces.Space);
    expect(minesweeper.getPiece(0, 0)).toEqual(Pieces.Space);
    expect(minesweeper.getPiece(-1, 0)).toEqual(Pieces.None);
    expect(minesweeper.getPiece(3, 0)).toEqual(Pieces.None);
    expect(minesweeper.getPiece(0, -1)).toEqual(Pieces.None);
    expect(minesweeper.getPiece(0, 3)).toEqual(Pieces.None);
  });

  test('is piece a mine', () => {
    const input = [
      '   ',
      ' * ',
      '   ',
    ];
    minesweeper.annotate(input);
    expect(minesweeper.isMine(0,0)).toEqual(0);
    expect(minesweeper.isMine(1,1)).toEqual(1);
    expect(minesweeper.isMine(-1,1)).toEqual(0);
    expect(minesweeper.isMine(1,3)).toEqual(0);
  })

  test('handles no columns', () => {
    expect(minesweeper.annotate([''])).toEqual(['']);
  });

  test('handles no mines', () => {
    const input = [
      '   ',
      '   ',
      '   ',
    ];
    const expected = [
      '   ',
      '   ',
      '   ',
    ];
    expect(minesweeper.annotate(input)).toEqual(expected);
  });

  test('handles board with only mines', () => {
    const input = [
      '***',
      '***',
      '***',
    ];
    const expected = [
      '***',
      '***',
      '***',
    ];
    expect(minesweeper.annotate(input)).toEqual(expected);
  });

  test('handles mine surrounded by spaces', () => {
    const input = [
      '   ',
      ' * ',
      '   ',
    ];
    const expected = [
      '111',
      '1*1',
      '111',
    ];
    minesweeper.annotate(input);
    expect(minesweeper.countMines()).toEqual(expected);
  });

  test('handles space surrounded by mines', () => {
    const input = [
      '***',
      '* *',
      '***',
    ];
    const expected = [
      '***',
      '*8*',
      '***',
    ];
    minesweeper.annotate(input);
    expect(minesweeper.countMines()).toEqual(expected);
   });

  test('handles horizontal line', () => {
    const input = [' * * '];
    const expected = ['1*2*1'];
    minesweeper.annotate(input);
    expect(minesweeper.countMines()).toEqual(expected);
  });

  test('handles horizontal line, mines at edges', () => {
    const input = ['*   *'];
    const expected = ['*1 1*'];
    minesweeper.annotate(input);
    expect(minesweeper.countMines()).toEqual(expected);
  });

  test('handles vertical line', () => {
    const input = [
      ' ',
      '*',
      ' ',
      '*',
      ' ',
    ];
    const expected = [
      '1',
      '*',
      '2',
      '*',
      '1',
    ];
    minesweeper.annotate(input);
    expect(minesweeper.countMines()).toEqual(expected);
  
  });

  test('handles vertical line, mines at edges', () => {
    const input = [
      '*',
      ' ',
      ' ',
      ' ',
      '*',
    ];
    const expected = [
      '*',
      '1',
      ' ',
      '1',
      '*',
    ];
    minesweeper.annotate(input);
    expect(minesweeper.countMines()).toEqual(expected);
  
  });

  test('handles cross', () => {
    const input = [
      '  *  ',
      '  *  ',
      '*****',
      '  *  ',
      '  *  ',
    ];
    const expected = [
      ' 2*2 ',
      '25*52',
      '*****',
      '25*52',
      ' 2*2 ',
    ];
    minesweeper.annotate(input);
    expect(minesweeper.countMines()).toEqual(expected);
  
  });

  test('handles large board', () => {
    const input = [
      ' *  * ',
      '  *   ',
      '    * ',
      '   * *',
      ' *  * ',
      '      ',
    ];
    const expected = [
      '1*22*1',
      '12*322',
      ' 123*2',
      '112*4*',
      '1*22*2',
      '111111',
    ];
    minesweeper.annotate(input);
    expect(minesweeper.countMines()).toEqual(expected);
  
  });
});

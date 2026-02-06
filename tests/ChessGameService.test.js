import { describe, expect, it } from 'vitest';
import ChessGameService from '../src/services/ChessGameService.js';

describe('ChessGameService', () => {
  it('creates the standard initial board setup', () => {
    const game = new ChessGameService();

    expect(game.getPiece(0, 0)).toMatchObject({ color: 'black', type: 'rook' });
    expect(game.getPiece(0, 4)).toMatchObject({ color: 'black', type: 'king' });
    expect(game.getPiece(1, 3)).toMatchObject({ color: 'black', type: 'pawn' });

    expect(game.getPiece(7, 0)).toMatchObject({ color: 'white', type: 'rook' });
    expect(game.getPiece(7, 4)).toMatchObject({ color: 'white', type: 'king' });
    expect(game.getPiece(6, 3)).toMatchObject({ color: 'white', type: 'pawn' });

    expect(game.getPiece(4, 4)).toBeNull();
  });

  it('returns null for out-of-bounds positions', () => {
    const game = new ChessGameService();

    expect(game.getPiece(-1, 0)).toBeNull();
    expect(game.getPiece(0, 8)).toBeNull();
    expect(game.getPiece(9, 9)).toBeNull();
  });

  it('moves a piece freely and records history', () => {
    const game = new ChessGameService();

    const moved = game.movePiece({ row: 6, col: 0 }, { row: 4, col: 0 });

    expect(moved).toBe(true);
    expect(game.getPiece(6, 0)).toBeNull();
    expect(game.getPiece(4, 0)).toMatchObject({ color: 'white', type: 'pawn' });
    expect(game.getHistory()).toHaveLength(1);
    expect(game.getHistory()[0]).toBe('white pawn (6,0) -> (4,0)');
  });

  it('replaces a piece when the target square is occupied', () => {
    const game = new ChessGameService();

    const moved = game.movePiece({ row: 7, col: 3 }, { row: 0, col: 3 });

    expect(moved).toBe(true);
    expect(game.getPiece(7, 3)).toBeNull();
    expect(game.getPiece(0, 3)).toMatchObject({ color: 'white', type: 'queen' });
    expect(game.getHistory()[0]).toBe('white queen (7,3) -> (0,3)');
  });

  it('ignores moves from empty squares or to the same square', () => {
    const game = new ChessGameService();

    expect(game.movePiece({ row: 4, col: 4 }, { row: 4, col: 5 })).toBe(false);
    expect(game.movePiece({ row: 7, col: 0 }, { row: 7, col: 0 })).toBe(false);
    expect(game.getHistory()).toHaveLength(0);
  });
});

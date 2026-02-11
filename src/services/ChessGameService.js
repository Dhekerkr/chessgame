import { reactive } from 'vue';
import { Chess } from 'chess.js';

const PIECE_SYMBOLS = {
  w: {
    k: '\u2654',
    q: '\u2655',
    r: '\u2656',
    b: '\u2657',
    n: '\u2658',
    p: '\u2659',
  },
  b: {
    k: '\u265A',
    q: '\u265B',
    r: '\u265C',
    b: '\u265D',
    n: '\u265E',
    p: '\u265F',
  },
};

const PIECE_TYPES = {
  k: 'king',
  q: 'queen',
  r: 'rook',
  b: 'bishop',
  n: 'knight',
  p: 'pawn',
};

const FILES = 'abcdefgh';

function createEmptyBoard() {
  return Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => null));
}

function toSquare(row, col) {
  return `${FILES[col]}${8 - row}`;
}

function fromSquare(square) {
  const col = FILES.indexOf(square[0]);
  const row = 8 - Number(square[1]);
  return { row, col };
}

function toColorName(colorCode) {
  return colorCode === 'w' ? 'white' : 'black';
}

function toPieceView(piece) {
  return {
    color: toColorName(piece.color),
    type: PIECE_TYPES[piece.type],
    symbol: PIECE_SYMBOLS[piece.color][piece.type],
  };
}

class ChessGameService {
  constructor() {
    this.chess = new Chess();
    this.board = reactive(createEmptyBoard());
    this.history = reactive([]);
    this.syncBoard();
  }

  syncBoard() {
    for (let row = 0; row < 8; row += 1) {
      for (let col = 0; col < 8; col += 1) {
        const square = toSquare(row, col);
        const piece = this.chess.get(square);
        this.board[row][col] = piece ? toPieceView(piece) : null;
      }
    }
  }

  getPiece(row, col) {
    if (row < 0 || row > 7 || col < 0 || col > 7) {
      return null;
    }

    return this.board[row][col];
  }

  getLegalMoves(from) {
    const piece = this.getPiece(from.row, from.col);

    if (!piece) {
      return [];
    }

    const fromSquareName = toSquare(from.row, from.col);
    const moves = this.chess.moves({ square: fromSquareName, verbose: true });

    return moves.map((move) => fromSquare(move.to));
  }

  movePiece(from, to) {
    if (from.row === to.row && from.col === to.col) {
      return false;
    }

    const fromSquareName = toSquare(from.row, from.col);
    const toSquareName = toSquare(to.row, to.col);
    let result;
    try {
      result = this.chess.move({
        from: fromSquareName,
        to: toSquareName,
        promotion: 'q',
      });
    } catch {
      return false;
    }

    if (!result) {
      return false;
    }

    this.syncBoard();

    const pieceType = PIECE_TYPES[result.piece];
    const color = toColorName(result.color);
    const entry = `${color} ${pieceType} (${from.row},${from.col}) -> (${to.row},${to.col})`;
    this.history.push(entry);

    return true;
  }

  getHistory() {
    return this.history;
  }
}

export default ChessGameService;

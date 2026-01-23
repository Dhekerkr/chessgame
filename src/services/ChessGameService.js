import { reactive } from 'vue';

const PIECE_DEFS = {
  white: {
    king: '♔',
    queen: '♕',
    rook: '♖',
    bishop: '♗',
    knight: '♘',
    pawn: '♙',
  },
  black: {
    king: '♚',
    queen: '♛',
    rook: '♜',
    bishop: '♝',
    knight: '♞',
    pawn: '♟',
  },
};

const BACK_RANK = [
  'rook',
  'knight',
  'bishop',
  'queen',
  'king',
  'bishop',
  'knight',
  'rook',
];

function makePiece(color, type) {
  return { color, type, symbol: PIECE_DEFS[color][type] };
}

function createEmptyBoard() {
  return Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => null));
}

function createInitialBoard() {
  const board = createEmptyBoard();

  for (let col = 0; col < 8; col += 1) {
    board[0][col] = makePiece('black', BACK_RANK[col]);
    board[1][col] = makePiece('black', 'pawn');
    board[6][col] = makePiece('white', 'pawn');
    board[7][col] = makePiece('white', BACK_RANK[col]);
  }

  return board;
}

class ChessGameService {
  constructor() {
    this.board = reactive(createInitialBoard());
    this.history = reactive([]);
  }

  getPiece(row, col) {
    if (row < 0 || row > 7 || col < 0 || col > 7) {
      return null;
    }

    return this.board[row][col];
  }

  movePiece(from, to) {
    const piece = this.getPiece(from.row, from.col);

    if (!piece) {
      return false;
    }

    if (from.row === to.row && from.col === to.col) {
      return false;
    }

    this.board[to.row][to.col] = piece;
    this.board[from.row][from.col] = null;

    const entry = `${piece.color} ${piece.type} (${from.row},${from.col}) -> (${to.row},${to.col})`;
    this.history.push(entry);

    return true;
  }

  getHistory() {
    return this.history;
  }
}

export default ChessGameService;

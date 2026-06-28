export enum GamePhase {
  IDLE = 'idle',
  SHOWING = 'showing',
  PLAYER = 'player',
  CORRECT = 'correct',
  WRONG = 'wrong',
  SELECT = 'select',
  PLAYING = 'playing',
  FINISHED = 'finished'
}

export interface Question {
  id: string | number;
  text: string;
  answer: any;
  options?: any[];
}

export interface GameContract {
  level: number;
  score: number;
  gamePhase: GamePhase;
  startDate: Date;
  start: () => void;
  handleInput: (input: any) => void;
  finish: () => void;
  saveSession: () => Promise<void>;
}

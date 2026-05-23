export interface Conjugation {
  yo: string;
  tu: string;
  el: string;
  nosotros: string;
  vosotros: string;
  ellos: string;
}

export interface Verb {
  infinitive: string;
  meaning: string;
  type: 'ar' | 'er' | 'ir';
  regular: boolean;
  conjugations: Conjugation;
}

// Data models for the 6 Games
export interface QuizQuestion {
  id: number;
  verb: string;
  subject: string;
  translation: string;
  options: string[];
  correct: string;
  explanation: string;
}

export interface SentencePuzzle {
  id: number;
  translation: string;
  spanishWords: string[]; // e.g. ["Ayer", "fui", "al", "cine"]
  correctOrder: string[]; // e.g. ["Ayer", "fui", "al", "cine"]
  hint: string;
}

export interface OddOneQuestion {
  id: number;
  options: {
    word: string;
    isOdd: boolean;
    reasonArm: string; // Explanation in Armenian
  }[];
  instructionArm: string;
}

export interface TimeMarker {
  id: string;
  word: string;
  isIndefinido: boolean;
  translationArm: string;
}

export interface MatchCard {
  id: string;
  text: string;
  type: 'spanish' | 'armenian';
  matchId: string;
}

export interface StorySlide {
  id: number;
  textBefore: string;
  verbInfinitive: string;
  textAfter: string;
  options: string[];
  correct: string;
  translationArm: string;
  rewardTextArm: string;
}

export interface UserStats {
  gamesCompleted: Record<string, number>; // gameId -> high score
  xp: number;
  streak: number;
  lastPlayed: string;
}

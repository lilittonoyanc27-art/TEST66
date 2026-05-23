import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gamepad2, Check, X, HelpCircle, RefreshCw, Trophy, ArrowRight, BookOpen,
  Sparkles, Award, Star, Hourglass, Calendar, Compass, MessageSquare
} from 'lucide-react';
import {
  GAME_1_QUESTIONS,
  GAME_2_CLEAN_PUZZLES,
  GAME_3_QUESTIONS,
  GAME_4_MARKERS,
  GAME_5_WORD_PAIRS,
  GAME_6_STORY
} from './gamesData';
import { MatchCard } from './types';

interface AllGamesProps {
  onEarnXP: (xp: number) => void;
  gameHighScores: Record<string, number>;
  onUpdateHighScore: (gameId: string, score: number) => void;
}

export default function AllGames({ onEarnXP, gameHighScores, onUpdateHighScore }: AllGamesProps) {
  const [activeGame, setActiveGame] = useState<number | null>(null);

  const GAMES_LIST = [
    {
      id: 1,
      title: "Բայի Խոնարհիչ (Verb Conjugator)",
      descArm: "Ընտրեք ճիշտ վերջավորությունը տրված բայի և դերանվան համար:",
      difficulty: "Հեշտ",
      icon: <Gamepad2 className="w-5 h-5" />,
      tag: "Conjugation"
    },
    {
      id: 2,
      title: "Նախադասության կառուցում (Word Puzzle)",
      descArm: "Դասավորեք իսպաներեն բառերը ճիշտ հերթականությամբ՝ ըստ հայերեն թարգմանության:",
      difficulty: "Միջին",
      icon: <Compass className="w-5 h-5" />,
      tag: "Syntax"
    },
    {
      id: 3,
      title: "Ավելորդի որոնում (Odd One Out)",
      descArm: "Գտեք այն բայաձևը, որն ունի սխալ կամ առանձնանում է իր կանոնով:",
      difficulty: "Հեշտ",
      icon: <HelpCircle className="w-5 h-5" />,
      tag: "Irregulars"
    },
    {
      id: 4,
      title: "Ժամանակի ցուցիչներ (Time Machine)",
      descArm: "Առանձնացրեք անցյալ կատարյալ ժամանակի մարկերները այլ ժամանակներից:",
      difficulty: "Միջին",
      icon: <Calendar className="w-5 h-5" />,
      tag: "Vocabulary"
    },
    {
      id: 5,
      title: "Հիշողության քարտեր (Memory Match)",
      descArm: "Համապատասխանեցրեք իսպաներեն անցյալ ձևը իր հայերեն թարգմանության հետ:",
      difficulty: "Միջին",
      icon: <Hourglass className="w-5 h-5" />,
      tag: "Memory"
    },
    {
      id: 6,
      title: "Պատմության արկած (Story Quest)",
      descArm: "Օգնեք Ալեքսին իր ճանապարհորդության մեջ՝ ընտրելով ճիշտ անցյալ ձևերը:",
      difficulty: "Բարդ",
      icon: <MessageSquare className="w-5 h-5" />,
      tag: "Reading"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Game Dashboard Header */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 mb-2">
            <Trophy className="w-5 h-5" />
            <span className="text-xs uppercase font-mono tracking-wider font-semibold">Ինտերակտիվ Գոտի</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-sans tracking-tight">Ինտերակտիվ 6 Խաղեր</h2>
          <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-xl">
            Յուրաքանչյուր խաղ ստեղծված է Pretérito Indefinido-ն հեշտությամբ յուրացնելու համար։ Խաղացեք, ստացեք XP միավորներ և բարելավեք ձեր արդյունքը։
          </p>
        </div>
        {activeGame !== null && (
          <button
            onClick={() => setActiveGame(null)}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-750 font-medium text-xs rounded-xl transition cursor-pointer"
          >
            ← Վերադառնալ ցանկին
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {activeGame === null ? (
          /* Selection Menu */
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {GAMES_LIST.map((game) => {
              const highScore = gameHighScores[`game_${game.id}`] || 0;
              return (
                <div
                  key={game.id}
                  className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-indigo-300 hover:shadow-md transition duration-200 group"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition duration-200">
                        {game.icon}
                      </div>
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                        game.difficulty === 'Հեշտ' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                        game.difficulty === 'Միջին' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                        'bg-rose-50 text-rose-700 border border-rose-100'
                      }`}>
                        {game.difficulty}
                      </span>
                    </div>

                    <h3 className="font-sans font-extrabold text-slate-800 text-lg group-hover:text-indigo-600 transition">
                      {game.title}
                    </h3>
                    <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                      {game.descArm}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="text-[11px] text-slate-400 font-mono">
                      Բարձրագույն միավոր: <span className="font-bold text-slate-700">{highScore} XP</span>
                    </div>
                    <button
                      onClick={() => setActiveGame(game.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 group-hover:text-indigo-800 transition cursor-pointer"
                    >
                      Խաղալ <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                    </button>
                  </div>
                </div>
              );
            })}
          </motion.div>
        ) : (
          /* Active Game Render */
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm min-h-[400px]"
          >
            {activeGame === 1 && <Game1Conjugator onEarnXP={onEarnXP} onSaveHighScore={(score) => onUpdateHighScore('game_1', score)} />}
            {activeGame === 2 && <Game2WordPuzzle onEarnXP={onEarnXP} onSaveHighScore={(score) => onUpdateHighScore('game_2', score)} />}
            {activeGame === 3 && <Game3OddOneOut onEarnXP={onEarnXP} onSaveHighScore={(score) => onUpdateHighScore('game_3', score)} />}
            {activeGame === 4 && <Game4TimeMachine onEarnXP={onEarnXP} onSaveHighScore={(score) => onUpdateHighScore('game_4', score)} />}
            {activeGame === 5 && <Game5MemoryMatch onEarnXP={onEarnXP} onSaveHighScore={(score) => onUpdateHighScore('game_5', score)} />}
            {activeGame === 6 && <Game6StoryQuest onEarnXP={onEarnXP} onSaveHighScore={(score) => onUpdateHighScore('game_6', score)} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==========================================
// GAME 1: VERB CONJUGATOR (Բայի Խոնարհիչ)
// ==========================================
function Game1Conjugator({ onEarnXP, onSaveHighScore }: { onEarnXP: (xp: number) => void; onSaveHighScore: (score: number) => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const question = GAME_1_QUESTIONS[currentIdx];

  const handleOptionSelect = (opt: string) => {
    if (isAnswered) return;
    setSelectedOpt(opt);
    setIsAnswered(true);

    const isCorrect = opt === question.correct;
    if (isCorrect) {
      setScore(s => s + 15);
      onEarnXP(15);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < GAME_1_QUESTIONS.length) {
      setCurrentIdx(c => c + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setGameFinished(true);
      onSaveHighScore(score);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setGameFinished(false);
  };

  if (gameFinished) {
    return (
      <div className="text-center py-10 max-w-md mx-auto space-y-6">
        <div className="inline-flex p-4 bg-indigo-50 rounded-full text-indigo-600 mb-2">
          <Award className="w-12 h-12" />
        </div>
        <h3 className="text-2xl font-bold text-slate-850 font-sans">Խաղն ավարտվեց:</h3>
        <p className="text-slate-500 text-sm">
          Դուք հաջողությամբ անցաք բոլոր հարցերը և վաստակեցիք ընդհանուր <span className="font-bold text-slate-800">{score} XP</span>!
        </p>
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl font-mono text-xs">
          Անցյալ կատարյալի բայաձևերը հիշելը լավագույն հիմքն է իսպաներեն թեմայում։
        </div>
        <button
          onClick={handleRestart}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition cursor-pointer flex justify-center items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Նորից խաղալ
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">
        <span className="text-xs text-slate-500 font-mono">Հարց {currentIdx + 1} / {GAME_1_QUESTIONS.length}</span>
        <span className="text-xs font-mono bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg font-bold">Միավոր՝ {score} XP</span>
      </div>

      <div className="space-y-3">
        <span className="text-xs font-mono uppercase bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-100 inline-block">
          Խոնարհում
        </span>
        <h4 className="text-xl font-bold text-slate-900 font-sans">
          Ինչպե՞ս կլինի <span className="text-indigo-600">{question.verb}</span> բայը <span className="text-indigo-600">'{question.subject}'</span> դերանվան համար։
        </h4>
        <p className="text-slate-500 text-xs font-mono italic">
          (Թարգմանություն. {question.translation})
        </p>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        {question.options.map((opt, oIdx) => {
          let btnStyle = "border-slate-100 bg-white hover:border-slate-300";
          if (isAnswered) {
            if (opt === question.correct) {
              btnStyle = "bg-emerald-50 text-emerald-800 border-emerald-300 font-bold";
            } else if (opt === selectedOpt) {
              btnStyle = "bg-rose-50 text-rose-800 border-rose-300";
            } else {
              btnStyle = "opacity-50 border-slate-100";
            }
          }

          return (
            <button
              key={oIdx}
              onClick={() => handleOptionSelect(opt)}
              disabled={isAnswered}
              className={`p-4 rounded-xl border text-sm text-left transition font-mono flex justify-between items-center ${btnStyle} cursor-pointer`}
            >
              <span>{opt}</span>
              {isAnswered && opt === question.correct && <Check className="w-4 h-4 text-emerald-600" />}
              {isAnswered && opt === selectedOpt && opt !== question.correct && <X className="w-4 h-4 text-rose-600" />}
            </button>
          );
        })}
      </div>

      {/* Feedback Section */}
      {isAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl border ${
            selectedOpt === question.correct ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          <div className="flex items-start gap-2 text-xs">
            {selectedOpt === question.correct ? (
              <Check className="w-4 h-4 shrink-0 mt-0.5" />
            ) : (
              <X className="w-4 h-4 shrink-0 mt-0.5" />
            )}
            <div>
              <span className="font-bold">{selectedOpt === question.correct ? 'Ճիշտ է՛!' : 'Մոտ էր:'}</span> {question.explanation}
            </div>
          </div>
          <button
            onClick={handleNext}
            className="mt-3 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition ml-auto flex items-center gap-1.5 cursor-pointer"
          >
            Հաջորդը <ArrowRight className="w-3" />
          </button>
        </motion.div>
      )}
    </div>
  );
}

// ==========================================
// GAME 2: WORD PUZZLE (Նախադասության կառուցում)
// ==========================================
function Game2WordPuzzle({ onEarnXP, onSaveHighScore }: { onEarnXP: (xp: number) => void; onSaveHighScore: (score: number) => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [puzzlesSolved, setPuzzlesSolved] = useState<number[]>([]);
  const [isDone, setIsDone] = useState(false);
  const [isCorrectAlert, setIsCorrectAlert] = useState<boolean | null>(null);

  const puzzle = GAME_2_CLEAN_PUZZLES[currentIdx];

  const handleWordSelect = (word: string) => {
    // Word instance count check for words with same spelling
    setSelectedWords([...selectedWords, word]);
  };

  const handleWordRemove = (idxToRemove: number) => {
    setSelectedWords(selectedWords.filter((_, idx) => idx !== idxToRemove));
  };

  // Determine which words are remaining (not highlighted yet)
  const remainingWords = [...puzzle.spanishWords];
  selectedWords.forEach((word) => {
    const i = remainingWords.indexOf(word);
    if (i > -1) remainingWords.splice(i, 1);
  });

  const checkSentence = () => {
    const combinedSentence = selectedWords.join(' ').toLowerCase().replace(/[.,?/!¿]/g, '');
    const correctSentence = puzzle.correctOrder.join(' ').toLowerCase().replace(/[.,?/!¿]/g, '');

    if (combinedSentence === correctSentence) {
      setIsCorrectAlert(true);
      if (!puzzlesSolved.includes(puzzle.id)) {
        setPuzzlesSolved([...puzzlesSolved, puzzle.id]);
        setScore(curr => curr + 25);
        onEarnXP(25);
      }
    } else {
      setIsCorrectAlert(false);
    }
  };

  const nextPuzzle = () => {
    setIsCorrectAlert(null);
    setSelectedWords([]);
    setShowHint(false);
    if (currentIdx + 1 < GAME_2_CLEAN_PUZZLES.length) {
      setCurrentIdx(curr => curr + 1);
    } else {
      setIsDone(true);
      onSaveHighScore(score);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedWords([]);
    setShowHint(false);
    setPuzzlesSolved([]);
    setIsDone(false);
    setIsCorrectAlert(null);
  };

  if (isDone) {
    return (
      <div className="text-center py-10 max-w-md mx-auto space-y-6">
        <div className="inline-flex p-4 bg-amber-50 rounded-full text-amber-600 mb-2">
          <Award className="w-12 h-12" />
        </div>
        <h3 className="text-2xl font-bold text-slate-850 font-sans">Դուք կառուցեցիք բոլոր նախադասությունները։</h3>
        <p className="text-slate-500 text-sm">
          Նախադասության շարահյուսությունը իսպաներեն թեմայում անցյալի դեպքում կարևոր է: Դուք վաստակեցիք <span className="font-bold text-slate-800">{score} XP</span>!
        </p>
        <button
          onClick={handleRestart}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition cursor-pointer flex justify-center items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Նորից սկսել
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">
        <span className="text-xs text-slate-500 font-mono">Մակարդակ՝ {currentIdx + 1} / {GAME_2_CLEAN_PUZZLES.length}</span>
        <span className="text-xs font-mono bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg font-bold">Միավոր՝ {score} XP</span>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded border border-indigo-100 inline-block">
          Նախադասության Ստեղծում
        </span>
        <h4 className="text-base text-slate-500 font-mono italic">
          Կազմեք իսպաներեն նախադասությունը հետևյալ հայերեն թարգմանության համար.
        </h4>
        <div className="bg-slate-50 border-l-4 border-amber-500 p-4 rounded-r-xl font-sans font-extrabold text-[#d97706] text-lg">
          "{puzzle.translation}"
        </div>
      </div>

      {/* Selected word tray */}
      <div className="min-h-[64px] bg-slate-100 border border-dashed border-slate-200 rounded-xl p-3 flex flex-wrap gap-2 items-center">
        {selectedWords.length === 0 ? (
          <span className="text-slate-400 text-xs italic font-mono pl-2">Կտտացրեք ներքևի բառերի վրա՝ նախադասություն կազմելու համար...</span>
        ) : (
          selectedWords.map((word, idx) => (
            <button
              key={idx}
              onClick={() => handleWordRemove(idx)}
              className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm font-mono font-medium hover:bg-indigo-700 transition flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <span>{word}</span>
              <X className="w-3 h-3 text-indigo-200" />
            </button>
          ))
        )}
      </div>

      {/* Available word bin */}
      <div className="space-y-2">
        <span className="text-xs text-slate-400 font-mono">Հասանելի բառերը:</span>
        <div className="flex flex-wrap gap-2">
          {remainingWords.map((word, idx) => (
            <button
              key={idx}
              onClick={() => handleWordSelect(word)}
              className="bg-white border border-slate-200 text-slate-700 hover:border-indigo-400 px-3 py-1.5 rounded-lg text-sm font-mono transition cursor-pointer font-medium hover:bg-slate-50 active:scale-95 shadow-xs"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {/* Controls & Hints */}
      <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-xs text-amber-600 hover:text-amber-800 font-bold border-b border-dashed border-amber-400 pb-0.5 cursor-pointer"
        >
          {showHint ? "Թաքցնել հուշումը" : "Ցուցադրել հուշումը (Hint)"}
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => setSelectedWords([])}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition cursor-pointer"
          >
            Մաքրել
          </button>
          <button
            onClick={checkSentence}
            disabled={selectedWords.length === 0}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-bold rounded-xl transition cursor-pointer"
          >
            Ստուգել
          </button>
        </div>
      </div>

      {showHint && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-3 bg-amber-50 border border-amber-150 text-amber-900 rounded-xl text-xs font-sans"
        >
          💡 <strong>Հուշում.</strong> {puzzle.hint}
        </motion.div>
      )}

      {/* Feedback Banner */}
      {isCorrectAlert === true && (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 space-y-2"
        >
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-bold text-sm">Կատարյալ է! Դուք ճիշտ դասավորեցիք այն (+25 XP)</span>
          </div>
          <p className="text-xs font-mono text-emerald-800">
            {puzzle.correctOrder.join(' ')}
          </p>
          <button
            onClick={nextPuzzle}
            className="mt-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white px-4 py-1.5 rounded-lg transition ml-auto flex items-center gap-1 cursor-pointer"
          >
            Հաջորդը <ArrowRight className="w-3" />
          </button>
        </motion.div>
      )}

      {isCorrectAlert === false && (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 text-xs flex justify-between items-center"
        >
          <div className="flex items-center gap-2">
            <X className="w-5 h-5 text-rose-600 shrink-0" />
            <span><strong>Սխալ դասավորություն:</strong> Մտածեք վերջավորությունների հերթականության մասին: Փորձեք նորից:</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ==========================================
// GAME 3: ODD ONE OUT (Ավելորդի որոնում)
// ==========================================
function Game3OddOneOut({ onEarnXP, onSaveHighScore }: { onEarnXP: (xp: number) => void; onSaveHighScore: (score: number) => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption, setClickedOption] = useState<number | null>(null);
  const [answeredState, setAnsweredState] = useState<'correct' | 'incorrect' | null>(null);
  const [isDone, setIsDone] = useState(false);

  const level = GAME_3_QUESTIONS[currentIdx];

  const handleOptionClick = (idx: number, isOdd: boolean) => {
    if (clickedOption !== null) return; // Prevent double select
    setClickedOption(idx);

    if (isOdd) {
      setAnsweredState('correct');
      setScore(curr => curr + 20);
      onEarnXP(20);
    } else {
      setAnsweredState('incorrect');
    }
  };

  const handleNext = () => {
    setClickedOption(null);
    setAnsweredState(null);
    if (currentIdx + 1 < GAME_3_QUESTIONS.length) {
      setCurrentIdx(curr => curr + 1);
    } else {
      setIsDone(true);
      onSaveHighScore(score);
    }
  };

  const resetGame = () => {
    setCurrentIdx(0);
    setScore(0);
    setClickedOption(null);
    setAnsweredState(null);
    setIsDone(false);
  };

  if (isDone) {
    return (
      <div className="text-center py-10 max-w-md mx-auto space-y-6">
        <div className="inline-flex p-4 bg-emerald-50 rounded-full text-emerald-600 mb-2">
          <Award className="w-12 h-12" />
        </div>
        <h3 className="text-2xl font-bold text-slate-850 font-sans">Հրաշալի է! Դուք գտաք բոլոր ավելորդները։</h3>
        <p className="text-slate-500 text-sm">
          Անկանոն ձևերի և ժամանակների ճանաչումը օգնում է խուսափել սխալներից իսպաներենում։ Դուք վաստակեցիք <span className="font-bold text-slate-800">{score} XP</span>!
        </p>
        <button
          onClick={resetGame}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition cursor-pointer flex justify-center items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Նորից սկսել
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">
        <span className="text-xs text-slate-500 font-mono">Հարց՝ {currentIdx + 1} / {GAME_3_QUESTIONS.length}</span>
        <span className="text-xs font-mono bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg font-bold">Միավոր՝ {score} XP</span>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded border border-indigo-100 inline-block font-semibold">
          Ավելորդի փնտրում
        </span>
        <h4 className="text-lg font-sans font-bold text-slate-900 leading-snug">
          {level.instructionArm}
        </h4>
        <p className="text-slate-500 text-xs font-mono italic">
          (Կտտացրեք այն բառի վրա, որը ըստ Ձեզ ճիշտ պատասխանն է)
        </p>
      </div>

      {/* Layout Grid of 4 words */}
      <div className="grid grid-cols-2 gap-4">
        {level.options.map((opt, oIdx) => {
          let btnStyle = "border-slate-200 bg-white hover:border-indigo-400";
          if (clickedOption !== null) {
            if (opt.isOdd) {
              btnStyle = "bg-emerald-50 text-emerald-800 border-emerald-400 font-bold scale-[1.01]";
            } else if (oIdx === clickedOption) {
              btnStyle = "bg-rose-50 text-rose-800 border-rose-400";
            } else {
              btnStyle = "opacity-40 border-slate-100";
            }
          }

          return (
            <button
              key={oIdx}
              onClick={() => handleOptionClick(oIdx, opt.isOdd)}
              disabled={clickedOption !== null}
              className={`p-5 rounded-2xl border transition font-mono text-center flex flex-col justify-center items-center gap-2 cursor-pointer shadow-xs ${btnStyle}`}
            >
              <span className="text-base font-extrabold">{opt.word}</span>
            </button>
          );
        })}
      </div>

      {/* Explanatory notes */}
      {clickedOption !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-4 rounded-xl border ${
            answeredState === 'correct' ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}
        >
          <div className="space-y-2">
            <h5 className="font-bold text-sm">
              {answeredState === 'correct' ? "🎉 Ճիշտ է՛!" : "❌ Սխալ ընտրություն:"}
            </h5>
            <p className="text-xs leading-relaxed font-mono">
              <strong>Բացատրություն.</strong> {level.options[clickedOption].reasonArm}
            </p>
            {answeredState === 'incorrect' && (
              <p className="text-[11px] text-slate-500">
                Մյուս ճիշտ տարբերակը կանոնավոր ձև է կամ ճիշտ անցյալ: Ուսումնասիրեք տարբերությունը:
              </p>
            )}
            <button
              onClick={handleNext}
              className="mt-3 text-xs bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-1.5 rounded-lg transition ml-auto flex items-center gap-1 cursor-pointer"
            >
              Հաջորդը <ArrowRight className="w-3" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ==========================================
// GAME 4: TIME MACHINE (Ժամանակի ցուցիչներ)
// ==========================================
function Game4TimeMachine({ onEarnXP, onSaveHighScore }: { onEarnXP: (xp: number) => void; onSaveHighScore: (score: number) => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<{ word: string; result: 'correct' | 'wrong' }[]>([]);
  const [isDone, setIsDone] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  const marker = GAME_4_MARKERS[currentIdx];

  const handleDecision = (isPastTarget: boolean) => {
    const isCorrect = marker.isIndefinido === isPastTarget;

    if (isCorrect) {
      setScore(s => s + 15);
      onEarnXP(15);
      setHistory([...history, { word: marker.word, result: 'correct' }]);
    } else {
      setHistory([...history, { word: marker.word, result: 'wrong' }]);
    }

    setAnimationClass('scale-95 opacity-0');
    setTimeout(() => {
      if (currentIdx + 1 < GAME_4_MARKERS.length) {
        setCurrentIdx(c => c + 1);
        setAnimationClass('');
      } else {
        setIsDone(true);
        onSaveHighScore(score);
      }
    }, 150);
  };

  const restart = () => {
    setCurrentIdx(0);
    setScore(0);
    setHistory([]);
    setIsDone(false);
    setAnimationClass('');
  };

  if (isDone) {
    const totalCorrect = history.filter(h => h.result === 'correct').length;
    return (
      <div className="text-center py-8 max-w-md mx-auto space-y-6">
        <div className="inline-flex p-4 bg-indigo-50 rounded-full text-indigo-600 mb-2">
          <Calendar className="w-12 h-12" />
        </div>
        <h3 className="text-2xl font-bold text-slate-850 font-sans">Ժամանակների մարկերների տեսակավորումն ավարտվեց։</h3>
        <p className="text-slate-500 text-sm">
          Դուք ճիշտ տեսակավորեցիք <span className="font-bold text-slate-800">{totalCorrect} / {GAME_4_MARKERS.length}</span> մարկերներ։ Ձեր միավորը: <span className="font-bold text-slate-800">{score} XP</span>!
        </p>

        {/* List of results for learning */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left space-y-2">
          <span className="text-xs font-mono text-slate-400 font-bold">Ձեր պատասխանների ամփոփագիրը:</span>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {GAME_4_MARKERS.map((m, idx) => (
              <div key={idx} className="flex justify-between items-center py-1 border-b border-dashed border-slate-200/60 pb-1">
                <span className="text-slate-700">{m.word}</span>
                <span className={m.isIndefinido ? 'text-amber-700 font-bold' : 'text-slate-400'}>
                  {m.isIndefinido ? 'Indefinido' : 'Otro'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={restart}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition cursor-pointer flex justify-center items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Նորից սկսել
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">
        <span className="text-xs text-slate-500 font-mono">Հարց՝ {currentIdx + 1} / {GAME_4_MARKERS.length}</span>
        <span className="text-xs font-mono bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg font-bold">Միավոր՝ {score} XP</span>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded border border-indigo-100 inline-block">
          Ժամանակային ցուցիչների դասավորում
        </span>
        <h4 className="text-lg font-sans font-bold text-slate-900 leading-snug">
          Արդյո՞ք այս բառը համարվում է <span className="text-amber-600">Pretérito Indefinido (անցյալ կատարյալի)</span> ժամանակային ցուցիչ:
        </h4>
      </div>

      {/* Main card representation */}
      <div className={`transition-all duration-150 transform ${animationClass} bg-gradient-to-br from-indigo-50/50 to-amber-50/50 border border-slate-200/80 rounded-2xl p-8 text-center shadow-xs space-y-4`}>
        <div className="text-3xl font-mono font-extrabold text-slate-800 tracking-wide uppercase">
          {marker.word}
        </div>
        <div className="inline-flex py-1 px-3 bg-white border border-slate-100 rounded-full text-xs font-medium text-slate-500 font-mono">
          Թարգմանություն. {marker.translationArm}
        </div>
      </div>

      {/* Big Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleDecision(true)}
          className="p-5 bg-amber-500 text-slate-950 hover:bg-amber-600 font-bold border-l-4 border-amber-700 rounded-2xl transition duration-150 flex flex-col items-center justify-center gap-1 cursor-pointer"
        >
          <span className="text-base font-sans font-extrabold">✅ ԱՅՈ</span>
          <span className="text-[10px] font-mono opacity-80">(Indefinido մարկեր է)</span>
        </button>
        <button
          onClick={() => handleDecision(false)}
          className="p-5 bg-slate-800 text-white hover:bg-slate-700 font-bold border-l-4 border-slate-950 rounded-2xl transition duration-150 flex flex-col items-center justify-center gap-1 cursor-pointer"
        >
          <span className="text-base font-sans font-extrabold font-bold">❌ ՈՉ</span>
          <span className="text-[10px] font-mono opacity-80">(Այլ ժամանակի է)</span>
        </button>
      </div>

      {/* History indicator dots */}
      <div className="flex justify-center gap-1.5 pt-4">
        {GAME_4_MARKERS.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              i === currentIdx ? 'bg-indigo-600 scale-125' :
              history[i]?.result === 'correct' ? 'bg-emerald-500' :
              history[i]?.result === 'wrong' ? 'bg-rose-500' : 'bg-slate-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ==========================================
// GAME 5: MEMORY MATCH (Հիշողության քարտեր)
// ==========================================
function Game5MemoryMatch({ onEarnXP, onSaveHighScore }: { onEarnXP: (xp: number) => void; onSaveHighScore: (score: number) => void }) {
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]); // holds element ID of cards
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]); // holds matchId
  const [turns, setTurns] = useState(0);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    initializeCards();
  }, []);

  const initializeCards = () => {
    // Generate Spanish and Armenian cards
    const initialCards: MatchCard[] = [];
    GAME_5_WORD_PAIRS.forEach((p) => {
      initialCards.push({
        id: `sp_${p.id}`,
        text: p.spanish,
        type: 'spanish',
        matchId: p.id
      });
      initialCards.push({
        id: `arm_${p.id}`,
        text: p.armenian,
        type: 'armenian',
        matchId: p.id
      });
    });

    // Shuffle cards
    const shuffled = initialCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setSelectedCards([]);
    setMatchedPairs([]);
    setTurns(0);
    setFinished(false);
    setScore(0);
  };

  const handleCardClick = (id: string, matchId: string) => {
    if (selectedCards.length === 2) return;
    if (selectedCards.includes(id)) return;
    if (matchedPairs.includes(matchId)) return;

    const newSelection = [...selectedCards, id];
    setSelectedCards(newSelection);

    if (newSelection.length === 2) {
      setTurns(t => t + 1);
      const cardOneIdx = cards.findIndex(c => c.id === newSelection[0]);
      const cardTwoIdx = cards.findIndex(c => c.id === newSelection[1]);

      const cardOne = cards[cardOneIdx];
      const cardTwo = cards[cardTwoIdx];

      if (cardOne.matchId === cardTwo.matchId && cardOne.type !== cardTwo.type) {
        // Match found!
        setTimeout(() => {
          setMatchedPairs([...matchedPairs, cardOne.matchId]);
          setSelectedCards([]);
          setScore(s => s + 30);
          onEarnXP(30);

          if (matchedPairs.length + 1 === GAME_5_WORD_PAIRS.length) {
            setFinished(true);
            onSaveHighScore(score + 30);
          }
        }, 300);
      } else {
        // No match, flip back
        setTimeout(() => {
          setSelectedCards([]);
        }, 1100);
      }
    }
  };

  if (finished) {
    return (
      <div className="text-center py-10 max-w-md mx-auto space-y-6">
        <div className="inline-flex p-4 bg-emerald-50 rounded-full text-emerald-600 mb-2">
          <Award className="w-12 h-12" />
        </div>
        <h3 className="text-2xl font-bold text-slate-850 font-sans">Փայլուն հիշողություն։</h3>
        <p className="text-slate-500 text-sm">
          Դուք համապատասխանեցրեցիք բոլոր բայաձևերը իրենց հայերեն թարգմանությունների հետ <span className="font-bold text-slate-800">{turns} քայլում</span>։
        </p>
        <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-mono font-bold">
          Ձեր վաստակած միավորը: {score} XP!
        </div>
        <button
          onClick={initializeCards}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition cursor-pointer flex justify-center items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Նորից խաղալ
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">
        <span className="text-xs text-slate-500 font-mono">Քայլեր՝ {turns} | Գտնված զույգեր՝ {matchedPairs.length} / {GAME_5_WORD_PAIRS.length}</span>
        <span className="text-xs font-mono bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg font-bold">Միավոր՝ {score} XP</span>
      </div>

      <div className="space-y-1">
        <span className="text-xs font-mono bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-100 inline-block">
          Հիշողության Մարզում
        </span>
        <h4 className="text-base font-sans font-bold text-slate-900 leading-snug">
          Բացեք և համապատասխանեցրեք իսպաներեն բայաձևերը իրենց հայերեն թարգմանությունների հետ!
        </h4>
      </div>

      {/* Grid structure */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-3">
        {cards.map((card) => {
          const isSelected = selectedCards.includes(card.id);
          const isMatched = matchedPairs.includes(card.matchId);

          let displayState = "border-slate-200 bg-slate-50 text-slate-300"; // Facing down state
          if (isSelected || isMatched) {
            displayState = card.type === 'spanish'
              ? 'bg-amber-500 text-slate-950 border-amber-600 font-extrabold font-mono font-bold'
              : 'bg-indigo-600 text-white border-indigo-700 font-bold';
          }

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id, card.matchId)}
              disabled={isMatched || selectedCards.length === 2 && !isSelected}
              className={`h-24 md:h-28 rounded-2xl border text-center transition-all duration-200 p-2 flex flex-col justify-center items-center cursor-pointer shadow-xs active:scale-95 text-xs md:text-sm ${displayState}`}
            >
              {(isSelected || isMatched) ? (
                <div className="flex flex-col items-center justify-center gap-1">
                  <span>{card.text}</span>
                  {isMatched && <Check className="w-3.5 h-3.5 opacity-80" />}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-1.5 opacity-50 text-slate-500">
                  <Star className="w-4 h-4 text-slate-400" />
                  <span className="text-[9px] font-mono">ԲԱՑԵԼ</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// GAME 6: STORY QUEST (Պատմության արկած)
// ==========================================
function Game6StoryQuest({ onEarnXP, onSaveHighScore }: { onEarnXP: (xp: number) => void; onSaveHighScore: (score: number) => void }) {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const slide = GAME_6_STORY[currentSlideIdx];

  const handleAnswerClick = (option: string) => {
    if (answered) return;
    setSelectedAnswer(option);
    setAnswered(true);

    if (option === slide.correct) {
      setScore(s => s + 20);
      onEarnXP(20);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setAnswered(false);
    if (currentSlideIdx + 1 < GAME_6_STORY.length) {
      setCurrentSlideIdx(c => c + 1);
    } else {
      setFinished(true);
      onSaveHighScore(score);
    }
  };

  const restart = () => {
    setCurrentSlideIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="text-center py-10 max-w-md mx-auto space-y-6">
        <div className="inline-flex p-4 bg-indigo-50 rounded-full text-indigo-600 mb-2">
          <Award className="w-12 h-12" />
        </div>
        <h3 className="text-2xl font-bold text-slate-850 font-sans">🎉 Պատմությունն ավարտվեց:</h3>
        <p className="text-slate-500 text-sm">
          Դուք օգնեցիք Ալեքսին հաջողությամբ անցնել իր մադրիդյան արկածը՝ կառուցելով ճիշտ պատմություն անցյալ կատարյալ ժամանակով:
        </p>
        <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-mono font-bold">
          Ձեր վաստակած ճանապարհորդական միավորը: {score} XP!
        </div>
        <button
          onClick={restart}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition cursor-pointer flex justify-center items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Սկսել նորից
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">
        <span className="text-xs text-slate-500 font-mono">Պատմության փուլ՝ {currentSlideIdx + 1} / {GAME_6_STORY.length}</span>
        <span className="text-xs font-mono bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg font-bold">Միավոր՝ {score} XP</span>
      </div>

      <div className="space-y-1">
        <span className="text-xs font-mono bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-100 inline-block font-bold">
          Ալեքսի Արկածները Մադրիդում
        </span>
        <h4 className="text-base text-slate-400 font-sans italic">
          Լատիներեն տեքստում լրացրեք փակագծերում տրված բայի ճիշտ անցյալ ձևը.
        </h4>
      </div>

      {/* Story Narrative Box */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 text-lg leading-relaxed font-sans font-medium text-center space-y-4">
        <p>
          "{slide.textBefore} <span className="text-amber-400 font-mono font-bold font-extrabold underline border-b-2 border-amber-400 px-1">
            {answered ? (selectedAnswer === slide.correct ? slide.correct : `(${slide.verbInfinitive})`) : `______`}
          </span> {slide.textAfter}"
        </p>
        <div className="pt-3 border-t border-slate-800 text-xs italic text-slate-400">
          📍 Հայերեն թարգմանություն. {slide.translationArm}
        </div>
      </div>

      {/* Answers Panel */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        {slide.options.map((opt, oIdx) => {
          let optionStyle = "border-slate-200 bg-white hover:border-slate-350 hover:bg-slate-50";
          if (answered) {
            if (opt === slide.correct) {
              optionStyle = "bg-emerald-500 text-white border-emerald-600 font-bold";
            } else if (opt === selectedAnswer) {
              optionStyle = "bg-rose-500 text-white border-rose-600";
            } else {
              optionStyle = "opacity-35 border-slate-100";
            }
          }

          return (
            <button
              key={oIdx}
              onClick={() => handleAnswerClick(opt)}
              disabled={answered}
              className={`p-4 rounded-xl border text-sm text-center font-mono font-medium transition cursor-pointer flex justify-center items-center gap-1.5 ${optionStyle}`}
            >
              {opt}
              {answered && opt === slide.correct && <Check className="w-4 h-4" />}
              {answered && opt === selectedAnswer && opt !== slide.correct && <X className="w-4 h-4" />}
            </button>
          );
        })}
      </div>

      {/* Active feedback */}
      {answered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-4 rounded-xl border ${
            selectedAnswer === slide.correct
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          <div className="space-y-1 text-xs">
            <span className="font-bold block text-sm">
              {selectedAnswer === slide.correct ? '🎉 Ճիշտ է՛!' : '❌ Սխալ ձև:'}
            </span>
            <p className="font-sans text-xs">
              {slide.rewardTextArm}
            </p>
          </div>
          <button
            onClick={handleNext}
            className="mt-3 text-xs bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-1.5 rounded-lg transition ml-auto flex items-center gap-1 cursor-pointer"
          >
            Շարունակել <ArrowRight className="w-3" />
          </button>
        </motion.div>
      )}
    </div>
  );
}

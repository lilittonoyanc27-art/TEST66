import React, { useState, useEffect } from 'react';
import TheorySection from './TheorySection';
import AllGames from './AllGames';
import {
  Trophy, BookOpen, Gamepad2, Sparkles, Award, Star, Compass,
  Calendar, RotateCcw, AlertCircle, Info, Flame, ChevronRight, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'theory' | 'games' | 'stats'>('home');
  const [xp, setXp] = useState<number>(0);
  const [streak, setStreak] = useState<number>(1);
  const [completedGames, setCompletedGames] = useState<Record<string, number>>({
    game_1: 0,
    game_2: 0,
    game_3: 0,
    game_4: 0,
    game_5: 0,
    game_6: 0
  });

  // Load from LocalStorage
  useEffect(() => {
    const savedXp = localStorage.getItem('pre_indefinido_xp');
    const savedStreak = localStorage.getItem('pre_indefinido_streak');
    const savedGames = localStorage.getItem('pre_indefinido_completed');

    if (savedXp) setXp(parseInt(savedXp, 10));
    if (savedStreak) setStreak(parseInt(savedStreak, 10));
    if (savedGames) {
      try {
        setCompletedGames(JSON.parse(savedGames));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Save to LocalStorage helper
  const saveStats = (newXp: number, newGames: Record<string, number>) => {
    localStorage.setItem('pre_indefinido_xp', newXp.toString());
    localStorage.setItem('pre_indefinido_completed', JSON.stringify(newGames));
  };

  const handleEarnXP = (amount: number) => {
    const nextXp = xp + amount;
    setXp(nextXp);
    saveStats(nextXp, completedGames);
  };

  const handleUpdateHighScore = (gameId: string, score: number) => {
    const currentHighScore = completedGames[gameId] || 0;
    if (score > currentHighScore) {
      const updated = { ...completedGames, [gameId]: score };
      setCompletedGames(updated);
      saveStats(xp, updated);
    }
  };

  const handleResetProgress = () => {
    if (window.confirm("Ցանկանու՞մ եք զրոյացնել Ձեր ամբողջ առաջադիմությունը:")) {
      setXp(0);
      setStreak(1);
      const cleared = {
        game_1: 0,
        game_2: 0,
        game_3: 0,
        game_4: 0,
        game_5: 0,
        game_6: 0
      };
      setCompletedGames(cleared);
      localStorage.removeItem('pre_indefinido_xp');
      localStorage.removeItem('pre_indefinido_streak');
      localStorage.removeItem('pre_indefinido_completed');
    }
  };

  // Determine user rank based on XP
  const getUserRank = () => {
    if (xp >= 500) return { name: "Իսպաներենի Վարպետ (Maestro)", color: "text-amber-600 bg-amber-50 border-amber-200" };
    if (xp >= 250) return { name: "Անցյալի Փորձագետ (Experto)", color: "text-indigo-600 bg-indigo-50 border-indigo-200" };
    if (xp >= 100) return { name: "Ակտիվ Ուսանող (Estudiante)", color: "text-emerald-600 bg-emerald-50 border-emerald-200" };
    return { name: "Սկսնակ (Principiante)", color: "text-slate-600 bg-slate-50 border-slate-200" };
  };

  const rank = getUserRank();

  // Find percentage of games played
  const playedCount = (Object.values(completedGames) as number[]).filter(score => score > 0).length;
  const progressPercent = Math.min(100, Math.round((xp / 600) * 100));

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 pb-12 antialiased">
      {/* Editorial Header / Navigation Rail Banner */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-amber-500 to-red-500 rounded-xl flex items-center justify-center shadow-xs text-white">
                <span className="font-extrabold text-sm tracking-wider">ES</span>
              </div>
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-slate-400 block font-bold">Հայերենից Իսպաներեն</span>
                <span className="font-sans font-extrabold text-slate-800 tracking-tight text-xs sm:text-sm">Pretérito Indefinido - Guide</span>
              </div>
            </div>

            {/* Quick Stats Widget */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-100 text-xs font-mono font-bold">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>{streak} օր</span>
              </div>
              <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100 text-xs font-mono font-bold">
                <Award className="w-4 h-4 text-indigo-600" />
                <span>{xp} XP</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto pb-1 gap-2 border-b border-slate-100 scrollbar-none mb-8">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold rounded-xl transition cursor-pointer shrink-0 ${
              activeTab === 'home'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-4 h-4" /> Գլխավոր (Home)
          </button>
          <button
            onClick={() => setActiveTab('theory')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold rounded-xl transition cursor-pointer shrink-0 ${
              activeTab === 'theory'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Տեսություն (Theory)
          </button>
          <button
            onClick={() => setActiveTab('games')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold rounded-xl transition cursor-pointer shrink-0 ${
              activeTab === 'games'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Gamepad2 className="w-4 h-4" /> Խաղեր (6 Games)
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold rounded-xl transition cursor-pointer shrink-0 ${
              activeTab === 'stats'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Trophy className="w-4 h-4" /> Առաջադիմություն
          </button>
        </div>

        {/* Tab Routing with Transitions */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                {/* Hero section */}
                <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 rounded-3xl p-6 sm:p-10 text-white shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
                  <div className="relative max-w-2xl space-y-4">
                    <span className="text-xs uppercase font-mono tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full font-bold">
                      Բարի Գալուստ / ¡Bienvenidos!
                    </span>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight">
                      Տիրապետե՛ք Իսպաներենի Անցյալ Կատարյալին
                    </h1>
                    <p className="text-slate-305 text-sm sm:text-base leading-relaxed">
                      Սովորեք իսպաներենի <strong>Pretérito Indefinido</strong> ժամանակաձևը հայերեն բացատրություններով, ինտերակտիվ աղյուսակներով և 6 հատուկ նախագծված խաղերով։
                    </p>
                    <div className="pt-4 flex flex-wrap gap-3">
                      <button
                        onClick={() => setActiveTab('theory')}
                        className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3 rounded-xl transition text-xs shadow-xs cursor-pointer inline-flex items-center gap-2"
                      >
                        Սկսել տեսությունը <ChevronRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setActiveTab('games')}
                        className="bg-white/10 hover:bg-white/15 text-white font-bold px-6 py-3 rounded-xl transition text-xs border border-white/10 cursor-pointer"
                      >
                        Խաղալ 6 խաղերը
                      </button>
                    </div>
                  </div>
                </div>

                {/* Dashboard Stats Overview cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1: Study Streak */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs flex items-center gap-4">
                    <div className="p-4 bg-orange-50 text-orange-600 rounded-xl">
                      <Flame className="w-6 h-6 fill-orange-500 text-orange-500" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 font-mono block">ՈՒՍՈՒՄՆԱԿԱՆ ՍՏՐԵՅՔ</span>
                      <span className="text-2xl font-extrabold text-slate-800">{streak} օր անընդմեջ</span>
                    </div>
                  </div>

                  {/* Card 2: Current Level Rank */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs flex items-center gap-4">
                    <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-405 font-mono block">ՁԵՐ ՄԱԿԱՐԴԱԿԸ</span>
                      <span className="text-md font-extrabold text-[#059669]">{rank.name}</span>
                    </div>
                  </div>

                  {/* Card 3: Completed ratio */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs flex items-center gap-4">
                    <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 font-mono block">ՓՈՐՁԱՐԿՎԱԾ ԽԱՂԵՐ</span>
                      <span className="text-2xl font-extrabold text-slate-800">{playedCount} / 6 խաղերից</span>
                    </div>
                  </div>
                </div>

                {/* Quick learning prompt */}
                <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bold text-amber-900 text-base font-sans">Ինչո՞ւ հենց Pretérito Indefinido:</h4>
                    <p className="text-xs text-amber-850/80 max-w-2xl leading-relaxed">
                      Անցյալ կատարյալը իսպաներենի ամենից շատ օգտագործվող անցյալ ժամանակներից է: Դրա միջոցով մենք կարողանում ենք պատմել մեր երեկվա, նախորդ շաբաթվա գործողությունները կամ կատարված պատմությունները։
                    </p>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <div className="px-3 py-1 bg-amber-500/20 text-amber-900 rounded-lg font-mono">
                      Ayer canté (Երեկ երգեցի)
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'theory' && (
              <motion.div
                key="theory"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                <TheorySection />
              </motion.div>
            )}

            {activeTab === 'games' && (
              <motion.div
                key="games"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                <AllGames
                  onEarnXP={handleEarnXP}
                  gameHighScores={completedGames}
                  onUpdateHighScore={handleUpdateHighScore}
                />
              </motion.div>
            )}

            {activeTab === 'stats' && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
                  <div>
                    <h3 className="text-xl font-bold font-sans text-slate-800">Իմ Առաջադիմությունը և Վիճակագրությունը</h3>
                    <p className="text-xs text-slate-400 font-mono mt-1">Այստեղ կարող եք տեսնել Ձեր ընդհանուր վաստակած XP-ն և յուրաքանչյուր խաղի բարձրագույն արդյունքը:</p>
                  </div>

                  {/* Progress Line */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Ընդհանուր առաջընթաց (Մինչև Վարպետության մակարդակ)</span>
                      <span className="font-bold text-indigo-600">{progressPercent}% ({xp} / 600 XP)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all duration-550"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Grid showing score per game */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    {[
                      { id: 1, name: "Բայի Խոնարհիչ (Conjugator)" },
                      { id: 2, name: "Նախադասության կառուցում (Word Puzzle)" },
                      { id: 3, name: "Ավելորդի որոնում (Odd One Out)" },
                      { id: 4, name: "Ժամանակի ցուցիչներ (Time Machine)" },
                      { id: 5, name: "Հիշողության քարտեր (Memory Match)" },
                      { id: 6, name: "Պատմության արկած (Story Quest)" }
                    ].map((g) => {
                      const score = completedGames[`game_${g.id}`] || 0;
                      return (
                        <div key={g.id} className="border border-slate-100 rounded-xl p-4 flex justify-between items-center bg-slate-50/50">
                          <div>
                            <span className="text-[10px] text-slate-400 font-mono block">ԽԱՂ {g.id}</span>
                            <span className="text-sm font-sans font-bold text-slate-800">{g.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs uppercase font-mono tracking-wider font-semibold text-slate-405 block">
                              ԲԱՐՁՐԱԳՈՒՅՆ ՄԻԱՎՈՐ
                            </span>
                            <span className="text-sm font-mono font-bold text-indigo-700">{score} XP</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex justify-between items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                      <Info className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>Առաջադիմությունը ավտոմատ կերպով պահպանվում է Ձեր բրաուզերում:</span>
                    </div>
                    <button
                      onClick={handleResetProgress}
                      className="px-4 py-2 hover:bg-rose-50 border border-transparent hover:border-rose-200 text-rose-600 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" /> Զրոյացնել առաջադիմությունը
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Styled Footer */}
      <footer className="mt-16 border-t border-slate-100 py-6 text-center text-xs text-slate-400 font-mono">
        <div>Pretérito Indefinido Learner — Իսպաներենի Անցյալ Կատարյալ</div>
        <div className="mt-1 text-slate-400">Նախատեսված է հայախոսների համար | {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
}

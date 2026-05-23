import React, { useState } from 'react';
import { LESSON_THEORY_ARM, REGULAR_VERBS, IRREGULAR_VERBS } from './theoryData';
import { BookOpen, HelpCircle, Star, Sparkles, CheckCircle2, ChevronRight, Activity } from 'lucide-react';

export default function TheorySection() {
  const [selectedVerb, setSelectedVerb] = useState(REGULAR_VERBS[0].infinitive);
  const [selectedPronoun, setSelectedPronoun] = useState<'yo' | 'tu' | 'el' | 'nosotros' | 'vosotros' | 'ellos'>('yo');

  // Find the verb details for playground
  const allVerbs = [...REGULAR_VERBS, ...IRREGULAR_VERBS];
  const currentVerb = allVerbs.find(v => v.infinitive === selectedVerb) || REGULAR_VERBS[0];

  const PRONOUN_LABELS: Record<string, { sp: string; arm: string }> = {
    yo: { sp: "Yo (Ես)", arm: "ես" },
    tu: { sp: "Tú (Դու)", arm: "դու" },
    el: { sp: "Él / Ella (Նա)", arm: "նա" },
    nosotros: { sp: "Nosotros (Մենք)", arm: "մենք" },
    vosotros: { sp: "Vosotros (Դուք)", arm: "դուք" },
    ellos: { sp: "Ellos / Ellas (Նրանք)", arm: "նրանք" }
  };

  return (
    <div id="theory-section" className="space-y-10">
      {/* Editorial Header */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 text-amber-600 mb-3">
          <BookOpen className="w-6 h-6" />
          <span className="text-xs uppercase font-mono tracking-wider font-semibold">Քերականության Դաս</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 tracking-tight">
          {LESSON_THEORY_ARM.title}
        </h1>
        <p className="text-amber-800 font-medium text-lg mt-1">
          {LESSON_THEORY_ARM.subtitle}
        </p>
        <p className="text-slate-600 text-sm md:text-base mt-4 max-w-3xl leading-relaxed">
          {LESSON_THEORY_ARM.overview}
        </p>
      </div>

      {/* Grid: Timing & Usage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {LESSON_THEORY_ARM.keys.map((key, idx) => (
          <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-slate-50 rounded-lg text-amber-600">
                  {idx === 0 ? <Activity className="w-5 h-5" /> : <Star className="w-5 h-5" />}
                </div>
                <h3 className="font-sans font-bold text-slate-800 text-lg">{key.title}</h3>
              </div>
              <ul className="space-y-3">
                {key.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex gap-2 text-slate-600 text-sm leading-relaxed">
                    <ChevronRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
            {idx === 1 && (
              <div className="mt-4 pt-4 border-t border-slate-50 bg-amber-50/40 p-3 rounded-xl text-xs text-amber-900 italic font-mono flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Հուշում. Այս ցուցիչները տեսնելիս անմիջապես օգտագործեք Indefinido!</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Interactive Conjugator Playground */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800">
        <div className="flex items-center gap-2 text-amber-400 mb-4">
          <Sparkles className="w-5 h-5" />
          <span className="text-xs uppercase font-mono tracking-widest">Ինտերակտիվ Փորձարկիչ</span>
        </div>
        <h3 className="text-xl font-bold font-sans tracking-tight mb-2">Բայի կենդանի խոնարհում (Playground)</h3>
        <p className="text-slate-400 text-xs md:text-sm mb-6">
          Ընտրեք իսպաներեն որևէ կանոնավոր կամ անկանոն բայ և դերանուն՝ տեսնելու համար դրա անցյալ կատարյալ ձևը և թարգմանությունը հայերենով։
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Verb Selection */}
          <div className="space-y-2">
            <span className="text-slate-400 text-xs font-mono">1. Ընտրեք Բայը (Verb)</span>
            <div className="grid grid-cols-2 gap-2">
              {allVerbs.map(v => (
                <button
                  key={v.infinitive}
                  onClick={() => setSelectedVerb(v.infinitive)}
                  className={`py-2 px-3 text-left rounded-xl transition text-xs font-mono font-medium border flex justify-between items-center ${
                    selectedVerb === v.infinitive
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  }`}
                >
                  <span>{v.infinitive}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${v.regular ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'}`}>
                    {v.regular ? 'Reg' : 'Irreg'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Pronoun Selection */}
          <div className="space-y-2">
            <span className="text-slate-400 text-xs font-mono">2. Ընտրեք Դերանունը (Pronoun)</span>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(PRONOUN_LABELS) as Array<keyof typeof PRONOUN_LABELS>).map(pron => (
                <button
                  key={pron}
                  onClick={() => setSelectedPronoun(pron)}
                  className={`py-2 px-3 text-left rounded-xl transition text-xs font-medium border ${
                    selectedPronoun === pron
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  }`}
                >
                  <div>{PRONOUN_LABELS[pron].sp}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Golden Result Display */}
          <div className="bg-slate-950 border border-amber-500/35 rounded-xl p-5 flex flex-col justify-center items-center text-center space-y-3">
            <span className="text-amber-400 font-mono text-xs tracking-wider uppercase">Արդյունք / Resultado</span>
            <div className="text-3xl font-sans font-extrabold text-amber-300 tracking-wide">
              {currentVerb.conjugations[selectedPronoun]}
            </div>
            <div className="text-slate-400 text-xs italic">
              ({currentVerb.infinitive} - {currentVerb.meaning})
            </div>
            <div className="text-emerald-400 text-sm font-medium mt-2 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-900/30">
              {PRONOUN_LABELS[selectedPronoun].arm} {currentVerb.meaning.split(' ')[0]}... (անցյալում)
            </div>
          </div>
        </div>
      </div>

      {/* Regular Conjugation Tables */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-800 font-sans tracking-tight">Կանոնավոր բայերի խոնարհումը (-AR, -ER, -IR)</h3>
        <p className="text-slate-500 text-sm -mt-4">
          Կանոնավոր բայերի արմատը չի փոխվում: Մենք պարզապես հեռացնում ենք -ar, -er կամ -ir վերջավորությունները և ավելացնում հետևյալները.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REGULAR_VERBS.map(verb => (
            <div key={verb.infinitive} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-sm transition">
              <div className="bg-slate-800 text-white p-4 flex justify-between items-center">
                <div>
                  <h4 className="font-extrabold text-lg tracking-wide">{verb.infinitive}</h4>
                  <span className="text-xs text-slate-300 font-mono italic">({verb.meaning})</span>
                </div>
                <span className="bg-amber-400 text-slate-950 font-mono font-bold text-xs uppercase px-2 py-1 rounded">
                  -{verb.type.toUpperCase()} խումբ
                </span>
              </div>
              <div className="p-4 space-y-2 font-mono text-sm">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                  <span className="text-slate-400">yo (-é / -í)</span>
                  <span className="font-bold text-slate-800">{verb.conjugations.yo}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                  <span className="text-slate-400">tú (-aste / -iste)</span>
                  <span className="font-bold text-slate-800">{verb.conjugations.tu}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                  <span className="text-slate-400">él/ella (-ó / -ió)</span>
                  <span className="font-bold text-slate-800">{verb.conjugations.el}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                  <span className="text-slate-400">nosotros (-amos / -imos)</span>
                  <span className="font-bold text-slate-800">{verb.conjugations.nosotros}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                  <span className="text-slate-400">vosotros (-asteis / -isteis)</span>
                  <span className="font-bold text-slate-800">{verb.conjugations.vosotros}</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-slate-400">ellos/ellas (-aron / -ieron)</span>
                  <span className="font-bold text-slate-800">{verb.conjugations.ellos}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Irregular Conjugation Tables */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-800 font-sans tracking-tight">Անկանոն բայերի խոնարհումը (Irregular Verbs)</h3>
        <p className="text-slate-500 text-sm -mt-4">
          Անկանոն բայերը փոխում են իրենց արմատը և ունեն հատուկ վերջավորություններ: Դրանցում չկան շեշտադրման նշաններ (tilde-եր, օրինակ՝ -é, -ó չկան)։
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {IRREGULAR_VERBS.map(verb => (
            <div key={verb.infinitive} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-amber-200 transition">
              <div className="bg-amber-500/10 text-amber-900 border-b border-slate-100 p-4 flex justify-between items-center">
                <div>
                  <h4 className="font-extrabold text-lg text-slate-800 tracking-wide">{verb.infinitive}</h4>
                  <span className="text-xs text-slate-500 font-mono italic">({verb.meaning})</span>
                </div>
                <span className="bg-rose-150 text-rose-700 font-mono font-bold text-xs uppercase px-2 py-0.5 border border-rose-200 rounded">
                  ԱՆԿԱՆՈՆ
                </span>
              </div>
              <div className="p-4 space-y-2 font-mono text-sm">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                  <span className="text-slate-400">yo</span>
                  <span className="font-bold text-amber-700">{verb.conjugations.yo}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                  <span className="text-slate-400">tú</span>
                  <span className="font-bold text-amber-700">{verb.conjugations.tu}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                  <span className="text-slate-400">él/ella</span>
                  <span className="font-bold text-amber-700">{verb.conjugations.el}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                  <span className="text-slate-400">nosotros</span>
                  <span className="font-bold text-amber-700">{verb.conjugations.nosotros}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                  <span className="text-slate-400">vosotros</span>
                  <span className="font-bold text-amber-700">{verb.conjugations.vosotros}</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-slate-400">ellos/ellas</span>
                  <span className="font-bold text-amber-700">{verb.conjugations.ellos}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

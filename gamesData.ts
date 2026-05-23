import { QuizQuestion, SentencePuzzle, OddOneQuestion, TimeMarker, MatchCard, StorySlide } from './types';

// Game 1: Verb Conjugator (Բայի Խոնարհում)
export const GAME_1_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    verb: "Hablar (Խոսել)",
    subject: "Yo (Ես)",
    translation: "Ես խոսեցի",
    options: ["hablo", "hablé", "hablaste", "habló"],
    correct: "hablé",
    explanation: "-AR խմբի բայերի համար 'Yo' դերանվան վերջավորությունն է '-é':"
  },
  {
    id: 2,
    verb: "Comer (Ուտել)",
    subject: "Nosotros (Մենք)",
    translation: "Մենք կերանք",
    options: ["comemos", "comimos", "comieron", "comisteis"],
    correct: "comimos",
    explanation: "-ER խմբի բայերի համար 'Nosotros' դերանվան վերջավորությունն է '-imos':"
  },
  {
    id: 3,
    verb: "Vivir (Ապրել)",
    subject: "Tú (Դու)",
    translation: "Դու ապրեցիր",
    options: ["viviste", "vives", "viví", "vivió"],
    correct: "viviste",
    explanation: "-IR խմբի բայերի համար 'Tú' դերանվան վերջավորությունն է '-iste':"
  },
  {
    id: 4,
    verb: "Ir (Գնալ)",
    subject: "Él / Ella (Նա)",
    translation: "Նա գնաց",
    options: ["va", "fui", "fue", "fueron"],
    correct: "fue",
    explanation: "'Ir' (գնալ) անկանոն բայի 'Él/Ella' ձևն է 'fue':"
  },
  {
    id: 5,
    verb: "Hacer (Անել)",
    subject: "Yo (Ես)",
    translation: "Ես արեցի",
    options: ["hago", "hace", "hice", "hizo"],
    correct: "hice",
    explanation: "'Hacer' (անել) անկանոն բայի 'Yo' ձևն է 'hice' (ուշադրություն 'c' տառին):"
  },
  {
    id: 6,
    verb: "Tener (Ունենալ)",
    subject: "Ellos (Նրանք)",
    translation: "Նրանք ունեցան",
    options: ["tuvieron", "tenieron", "tuvimos", "tienen"],
    correct: "tuvieron",
    explanation: "'Tener' բայի անկանոն արմատն է 'tuv-', իսկ 'Ellos' վերջավորությունը՝ '-ieron':"
  },
  {
    id: 7,
    verb: "Escribir (Գրել)",
    subject: "Ellos (Նրանք)",
    translation: "Նրանք գրեցին",
    options: ["escribieron", "escriben", "escribieron", "escribisteis"], // fixed double opt
    correct: "escribieron",
    explanation: "-IR խմբի կանոնավոր բայերի համար 'Ellos' վերջավորությունն է '-ieron':"
  }
];

// Game 2: Sentence Builder - Word Puzzle (Նախադասության կառուցում)
export const GAME_2_PUZZLES: SentencePuzzle[] = [
  {
    id: 1,
    translation: "Երեկ ես իսպաներեն խոսեցի:",
    spanishWords: ["hablé", "español", "Ayer", "yo"],
    correctOrder: ["Ayer", "yo", "hablé", "español"],
    hint: "Սկսեք ժամանակի մարկերից, այնուհետև դերանունը, բայը և լրացումը:"
  },
  {
    id: 2,
    translation: "Մենք գնացինք ափ անցյալ շաբաթ:",
    spanishWords: ["la", "fuimos", "semana", "playa", "pasada", "a", "Nosotros", "la"],
    correctOrder: ["Nosotros", "fuimos", "a", "la", "playa", "la", "semana", "pasada"],
    hint: "Nosotros fuimos-ից հետո գալիս է ուղղությունը 'a la playa'..."
  },
  {
    id: 3,
    translation: "Ի՞նչ արեցիր դու երեկ:",
    spanishWords: ["hiciste", "Ayer", "tú", "¿Qué?", "hiciste"], // simplified
    correctOrder: ["¿Qué", "hiciste", "tú", "ayer?"],
    hint: "Հարցական նախադասությունում ¿Qué-ն գալիս է առաջինը:"
  },
  {
    id: 4,
    translation: "Նրանք երկու տարի առաջ տուն գնեցին:",
    spanishWords: ["compraron", "casa", "una", "hace", "dos", "años"],
    correctOrder: ["Ellos", "compraron", "una", "casa", "hace", "dos", "años"],
    hint: "Ellos-ը կարող է զեղչվել, բայց այստեղ այն սկզբում է (եթե ավելացված է): 'hace dos años' նշանակում է երկու տարի առաջ:"
  }
];

// Custom adjuster: Let's adjust Game 2 puzzles to match exact array setup
export const GAME_2_CLEAN_PUZZLES: SentencePuzzle[] = [
  {
    id: 1,
    translation: "Երեկ ես իսպաներեն խոսեցի:",
    spanishWords: ["hablé", "español", "Ayer", "yo"],
    correctOrder: ["Ayer", "yo", "hablé", "español"],
    hint: "Սկսեք ժամանակի ցուցիչով՝ 'Ayer' (Երեկ)։"
  },
  {
    id: 2,
    translation: "Մենք անցյալ շաբաթ գնացինք լողափ:",
    spanishWords: ["semana", "fuimos", "playa", "a", "la", "pasada", "Nosotros", "la"],
    correctOrder: ["Nosotros", "fuimos", "a", "la", "playa", "la", "semana", "pasada"],
    hint: "Nosotros (Մենք) fuimos (գնացինք) a la playa (լողափ) la semana pasada (անցյալ շաբաթ)։"
  },
  {
    id: 3,
    translation: "Ի՞նչ արեցիր դու երեկ:",
    spanishWords: ["tú", "hiciste", "¿Qué", "ayer?"],
    correctOrder: ["¿Qué", "hiciste", "tú", "ayer?"],
    hint: "Իսպաներենում հարցական նախադասությունը սկսվում է հարցական բառով՝ ¿Qué"
  },
  {
    id: 4,
    translation: "Նրանք մեծ տուն գնեցին անցյալ տարի:",
    spanishWords: ["casa", "compraron", "una", "grande", "el", "año", "pasado"],
    correctOrder: ["Ellos", "compraron", "una", "casa", "grande", "el", "año", "pasado"],
    hint: "Կազմեք նախադասությունը՝ դնելով 'compraron' (գնեցին) բայը տան նկարագրությունից առաջ:"
  }
];

// Game 3: Odd One Out (Ավելորդի որոնում)
export const GAME_3_QUESTIONS: OddOneQuestion[] = [
  {
    id: 1,
    instructionArm: "Գտեք այն բայը, որը ԱՆԿԱՆՈՆ է (Irregular) Pretérito Indefinido-ում",
    options: [
      { word: "Cantaré", isOdd: true, reasonArm: "Սա ապառնի ժամանակ է (Futuro), ոչ թե անցյալ կատարյալ։" },
      { word: "Hablé", isOdd: false, reasonArm: "Կանոնավոր անցյալ կատարյալ է (Yo hablé)։" },
      { word: "Comió", isOdd: false, reasonArm: "Կանոնավոր անցյալ կատարյալ է (Él comió)։" },
      { word: "Viviste", isOdd: false, reasonArm: "Կանոնավոր անցյալ կատարյալ է (Tú viviste)։" }
    ]
  },
  {
    id: 2,
    instructionArm: "Գտեք այն ձևը, որն ԱՆԿԱՆՈՆ (Irregular) է անցյալ կատարյալում",
    options: [
      { word: "Trabajamos", isOdd: false, reasonArm: "Կանոնավոր բայ է (Trabajar)։" },
      { word: "Escribieron", isOdd: false, reasonArm: "Կանոնավոր բայ է (Escribir)։" },
      { word: "Tuviste", isOdd: true, reasonArm: "Անկանոն բայի ձև է (Tener -> tuve, tuviste...)։" },
      { word: "Aprendí", isOdd: false, reasonArm: "Կանոնավոր բայ է (Aprender)։" }
    ]
  },
  {
    id: 3,
    instructionArm: "Գտեք ՍԽԱԼ խոնարհված տարբերակը",
    options: [
      { word: "Hació", isOdd: true, reasonArm: "Սխալ է կազմված։ 'Hacer' բայի անցյալ ձևն է 'hizo', ոչ թե 'hació'։" },
      { word: "Hice", isOdd: false, reasonArm: "Ճիշտ է։ Hacer-ի առաջին դեմքն է (Yo hice)։" },
      { word: "Hicieron", isOdd: false, reasonArm: "Ճիշտ է։ Hacer-ի հոգնակի երրորդ դեմքն է (Ellos hicieron)։" },
      { word: "Hizo", isOdd: false, reasonArm: "Ճիշտ է։ Hacer-ի եզակի երրորդ դեմքն է (Él hizo)։" }
    ]
  },
  {
    id: 4,
    instructionArm: "Ո՞ր բայաձևն է պատկանում 'SER' և 'IR' բայերին միաժամանակ",
    options: [
      { word: "Fui", isOdd: true, reasonArm: "Այո՛, 'Fui'-ն և 'Ser' (լինել), և 'Ir' (գնալ) բայերի անցյալ ձևն է ինձ համար:" },
      { word: "Era", isOdd: false, reasonArm: "Սա Pretérito Imperfecto անցյալ անկատար ձևն է, ոչ թե Indefinido:" },
      { word: "Voy", isOdd: false, reasonArm: "Սա ներկա ժամանակի ձևն է (Yo voy):" },
      { word: "Sufrí", isOdd: false, reasonArm: "Սա Sufrir բայի կանոնավոր անցյալ ձևն է:" }
    ]
  }
];

// Game 4: Time Machine Markers (Ժամանակի ցուցիչների դասավորում)
export const GAME_4_MARKERS: TimeMarker[] = [
  { id: "m1", word: "Ayer", isIndefinido: true, translationArm: "Երեկ (անցյալ)" },
  { id: "m2", word: "Hoy", isIndefinido: false, translationArm: "Այսօր (ներկա)" },
  { id: "m3", word: "La semana pasada", isIndefinido: true, translationArm: "Անցյալ շաբաթ (անցյալ)" },
  { id: "m4", word: "Mañana", isIndefinido: false, translationArm: "Վաղը (ապառնի)" },
  { id: "m5", word: "Hace un año", isIndefinido: true, translationArm: "Մեկ տարի առաջ (անցյալ)" },
  { id: "m6", word: "Normalmente", isIndefinido: false, translationArm: "Սովորաբար (սովորույթ)" },
  { id: "m7", word: "Anteayer", isIndefinido: true, translationArm: "Նախանցյալ օրը (անցյալ)" },
  { id: "m8", word: "Siempre", isIndefinido: false, translationArm: "Միշտ (երկարատև ներկա)" },
  { id: "m9", word: "En 2018", isIndefinido: true, translationArm: "2018 թվականին (անցյալ)" },
  { id: "m10", word: "Ahora mismo", isIndefinido: false, translationArm: "Հենց հիմա (ներկա)" }
];

// Game 5: Memory Match (Հիշողության քարտեր)
export const GAME_5_WORD_PAIRS = [
  { id: "1", spanish: "hablé", armenian: "ես խոսեցի" },
  { id: "2", spanish: "fui", armenian: "ես գնացի" },
  { id: "3", spanish: "comieron", armenian: "նրանք կերան" },
  { id: "4", spanish: "hizo", armenian: "նա արեց" },
  { id: "5", spanish: "tuvimos", armenian: "մենք ունեցանք" },
  { id: "6", spanish: "escribiste", armenian: "դու գրեցիր" }
];

// Game 6: Interactive Story Quest (Պատմության արկած)
// "Ալեքսի ճանապարհորդությունը դեպի Մադրիդ"
export const GAME_6_STORY: StorySlide[] = [
  {
    id: 1,
    textBefore: "El año pasado, Álex (viajar)",
    verbInfinitive: "viajar",
    textAfter: "a Madrid para aprender español.",
    options: ["viajó", "viajé", "viajaron", "viajaste"],
    correct: "viajó",
    translationArm: "Անցյալ տարի Ալեքսը ճանապարհորդեց Մադրիդ՝ իսպաներեն սովորելու համար։",
    rewardTextArm: "Հիանալի է՛! 'Viajar' բայի երրորդ դեմքի անցյալ ձևն է 'viajó':"
  },
  {
    id: 2,
    textBefore: "En la estación, él (conocer)",
    verbInfinitive: "conocer",
    textAfter: "a una chica muy simpática llamada Elena.",
    options: ["conoció", "conocimos", "conocí", "conocieron"],
    correct: "conoció",
    translationArm: "Կայարանում նա ծանոթացավ մի շատ համակրելի աղջկա հետ, ում անունն էր Ելենա։",
    rewardTextArm: "Միանգամայն ճիշտ է! 'Conocer' բայից ստացվում է 'conoció':"
  },
  {
    id: 3,
    textBefore: "Ellos (ir)",
    verbInfinitive: "ir",
    textAfter: "juntos a una cafetería tradicional.",
    options: ["fueron", "fuimos", "fui", "fuesen"],
    correct: "fueron",
    translationArm: "Նրանք միասին գնացին ավանդական սրճարան։",
    rewardTextArm: "Կեցցե՛ք! 'Ir' անկանոն բայի հոգնակի 'তারা' (նրանք) ձևն է 'fueron':"
  },
  {
    id: 4,
    textBefore: "Álex (comer)",
    verbInfinitive: "comer",
    textAfter: "churros deliciosos con chocolate.",
    options: ["comió", "comí", "comiste", "comieron"],
    correct: "comió",
    translationArm: "Ալեքսը կերավ համեղ չուրոսներ շոկոլադով։",
    rewardTextArm: "Ճիշտ է! 'Comer' բայը 'él'-ի համար դառնում է 'comió':"
  },
  {
    id: 5,
    textBefore: "Después, Elena le (decir)",
    verbInfinitive: "decir",
    textAfter: "los mejores lugares para visitar.",
    options: ["dijo", "dije", "dijimos", "decieron"],
    correct: "dijo",
    translationArm: "Հետո Ելենան նրան ասաց այցելելու լավագույն վայրերը։",
    rewardTextArm: "Հրաշալի է! 'Decir' անկանոն բայի երրորդ դեմքի ձևն է 'dijo':"
  },
  {
    id: 6,
    textBefore: "¡Y así (empezar)",
    verbInfinitive: "empezar",
    textAfter: "una gran amistad y aventura!",
    options: ["empezó", "empecé", "empezaron", "empezaste"],
    correct: "empezó",
    translationArm: "Եվ այսպես սկսվեց մի մեծ ընկերություն և արկած!",
    rewardTextArm: "Ապրե՛ս! 'Empezo'-ն եզակի երրորդ դեմքն է (սկսվեց)։ Դուք ավարտեցիք Ալեքսի պատմությունը:"
  }
];

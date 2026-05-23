import { Verb } from './types';

export const LESSON_THEORY_ARM = {
  title: "Pretérito Indefinido (Անցյալ Կատարյալ)",
  subtitle: "Իսպաներենի անցյալ կատարյալ ժամանակաձևը",
  overview: "Pretérito Indefinido-ն օգտագործվում է անցյալում ավարտված, կոնկրետ ժամանակահատվածում կատարված գործողությունները նկարագրելու համար: Այն հայերենի անցյալ կատարյալ ժամանակաձևի համարժեքն է (օրինակ՝ «ես գրեցի», «նրանք եկան»):",
  keys: [
    {
      title: "Ե՞րբ է օգտագործվում",
      points: [
        "Անցյալում մեկ անգամ կատարված և ավարտված գործողությունների համար (օր.՝ Ayer compré un libro - Երեկ ես գիրք գնեցի):",
        "Հստակ ժամանակային սահմաններ ունեցող գործողությունների համար (օր.՝ Viví en Madrid tres años - Ես երեք տարի ապրեցի Մադրիդում):",
        "Անցյալ ժամանակում իրար հաջորդող գործողություններ պատմելիս (օր.՝ Llegué, comí y dormí - Եկա, կերա և քնեցի):"
      ]
    },
    {
      title: "Ժամանակային ցուցիչներ (Marcadores temporales)",
      points: [
        "Ayer — Երեկ",
        "Anteayer — นախանցյալ օրը",
        "Anoche — Երեկ գիշեր",
        "La semana pasada — Անցյալ շաբաթ",
        "El año pasado — Անցյալ տարի",
        "Hace dos días / meses — Երկու օր / ամիս առաջ",
        "En 2015 — 2015 թվականին"
      ]
    }
  ]
};

export const REGULAR_VERBS: Verb[] = [
  {
    infinitive: "Cantar",
    meaning: "երգել",
    type: "ar",
    regular: true,
    conjugations: {
      yo: "canté",
      tu: "cantaste",
      el: "cantó",
      nosotros: "cantamos",
      vosotros: "cantasteis",
      ellos: "cantaron"
    }
  },
  {
    infinitive: "Comer",
    meaning: "ուտել",
    type: "er",
    regular: true,
    conjugations: {
      yo: "comí",
      tu: "comiste",
      el: "comió",
      nosotros: "comimos",
      vosotros: "comisteis",
      ellos: "comieron"
    }
  },
  {
    infinitive: "Vivir",
    meaning: "ապրել",
    type: "ir",
    regular: true,
    conjugations: {
      yo: "viví",
      tu: "viviste",
      el: "vivió",
      nosotros: "vivimos",
      vosotros: "vivisteis",
      ellos: "vivieron"
    }
  }
];

export const IRREGULAR_VERBS: Verb[] = [
  {
    infinitive: "Ser / Ir",
    meaning: "լինել / գնալ",
    type: "er",
    regular: false,
    conjugations: {
      yo: "fui",
      tu: "fuiste",
      el: "fue",
      nosotros: "fuimos",
      vosotros: "fuisteis",
      ellos: "fueron"
    }
  },
  {
    infinitive: "Tener",
    meaning: "ունենալ (ունեցա)",
    type: "er",
    regular: false,
    conjugations: {
      yo: "tuve",
      tu: "tuviste",
      el: "tuvo",
      nosotros: "tuvimos",
      vosotros: "tuvisteis",
      ellos: "tuvieron"
    }
  },
  {
    infinitive: "Hacer",
    meaning: "անել (արեցի)",
    type: "er",
    regular: false,
    conjugations: {
      yo: "hice",
      tu: "hiciste",
      el: "hizo",
      nosotros: "hicimos",
      vosotros: "hicisteis",
      ellos: "hicieron"
    }
  },
  {
    infinitive: "Estar",
    meaning: "լինել/գտնվել",
    type: "ar",
    regular: false,
    conjugations: {
      yo: "estuve",
      tu: "estuviste",
      el: "estuvo",
      nosotros: "estuvimos",
      vosotros: "estuvisteis",
      ellos: "estuvieron"
    }
  },
  {
    infinitive: "Decir",
    meaning: "ասել",
    type: "ir",
    regular: false,
    conjugations: {
      yo: "dije",
      tu: "dijiste",
      el: "dijo",
      nosotros: "dijimos",
      vosotros: "dijisteis",
      ellos: "dijeron"
    }
  },
  {
    infinitive: "Dar",
    meaning: "տալ",
    type: "ar",
    regular: false,
    conjugations: {
      yo: "di",
      tu: "diste",
      el: "dio",
      nosotros: "dimos",
      vosotros: "disteis",
      ellos: "dieron"
    }
  }
];

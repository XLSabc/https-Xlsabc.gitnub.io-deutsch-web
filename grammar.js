/* Original grammar notes for Wortkarte, aligned with A1 / 初级2 topics.
   These are short study cards, not a reproduction of the textbook. */

const GRAMMAR_TOPICS = [
  {
    id: "praesens",
    level: "A1",
    title: "动词现在时",
    de: "Das Präsens",
    summary: "先抓住词干和六个词尾，再记住 sein / haben 与换音动词。",
    sections: [
      {
        heading: "规则变位",
        body: "去掉动词词尾 -en 得到词干，再加人称词尾：ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en。词干以 -t 或 -d 结尾时，du 和 er 前常加 -e-。",
        examples: [
          { de: "ich lerne · du lernst · er lernt", zh: "学习" },
          { de: "ich arbeite · du arbeitest · er arbeitet", zh: "工作（词干以 -t 结尾）" }
        ]
      },
      {
        heading: "sein 与 haben",
        body: "这两个动词最常用，也最不规则，建议整组背下来。",
        examples: [
          { de: "ich bin · du bist · er ist · wir sind · ihr seid · sie sind", zh: "是" },
          { de: "ich habe · du hast · er hat · wir haben · ihr habt · sie haben", zh: "有" }
        ]
      },
      {
        heading: "换音与变音",
        body: "部分强变化动词只改变 du 和 er/sie/es 的词干元音，其余人称仍按规则变位。",
        examples: [
          { de: "fahren: du fährst, er fährt", zh: "a → ä" },
          { de: "sprechen: du sprichst, er spricht", zh: "e → i" },
          { de: "sehen: du siehst, er sieht", zh: "e → ie" }
        ]
      }
    ],
    exercises: [
      { q: "Du ___ gern Deutsch.", options: ["lerne", "lernst", "lernt"], answer: 1, explain: "du 对应词尾 -st：du lernst。" },
      { q: "Er ___ heute keine Zeit.", options: ["habe", "hast", "hat"], answer: 2, explain: "er/sie/es 用 hat，且 haben 在这里表示“有”。" }
    ]
  },
  {
    id: "artikel",
    level: "A1",
    title: "名词性别与冠词",
    de: "Genus und Artikel",
    summary: "der / die / das 不是装饰，它决定后面的冠词、代词和形容词词尾。",
    sections: [
      {
        heading: "三种性别",
        body: "德语名词都有语法性别：阳性 der、阴性 die、中性 das。复数一律用 die。生物性别和语法性别并不总是一致，例如 das Mädchen。",
        examples: [
          { de: "der Tisch · die Lampe · das Fenster", zh: "桌子 · 灯 · 窗户" },
          { de: "die Tische · die Lampen · die Fenster", zh: "复数冠词统一为 die" }
        ]
      },
      {
        heading: "常见线索",
        body: "后缀有帮助，但不是绝对规则：-ung、-heit、-keit、-schaft 多为阴性；-chen、-lein 多为中性；-er 表示职业或工具时多为阳性。最可靠的方法仍是“名词 + 冠词”一起记。",
        examples: [
          { de: "die Wohnung · die Freiheit · die Freundschaft", zh: "阴性后缀" },
          { de: "das Mädchen · das Brötchen", zh: "中性指小词" }
        ]
      }
    ],
    exercises: [
      { q: "___ Wohnung ist klein.", options: ["Der", "Die", "Das"], answer: 1, explain: "Wohnung 是阴性，定冠词用 die。" },
      { q: "___ Buch gehört mir.", options: ["Der", "Die", "Das"], answer: 2, explain: "Buch 是中性，定冠词用 das。" }
    ]
  },
  {
    id: "kasus",
    level: "A1",
    title: "四格与冠词变化",
    de: "Die vier Fälle",
    summary: "谁做什么，决定了名词用第几格；先掌握主格、宾格和与格。",
    sections: [
      {
        heading: "四个格",
        body: "主格（Nominativ）作主语；宾格（Akkusativ）作直接宾语；与格（Dativ）作间接宾语或某些介词/动词的宾语；属格（Genitiv）表示所属。",
        examples: [
          { de: "Der Mann liest den Brief.", zh: "男人读这封信。（主语 / 直接宾语）" },
          { de: "Ich gebe der Frau das Buch.", zh: "我把书给这位女士。（与格 / 宾格）" }
        ]
      },
      {
        heading: "定冠词表",
        body: "阳性在宾格变成 den，阴性和中性在主格/宾格相同；复数在与格词尾加 -n。",
        table: {
          headers: ["", "阳性", "阴性", "中性", "复数"],
          rows: [
            ["Nominativ", "der", "die", "das", "die"],
            ["Akkusativ", "den", "die", "das", "die"],
            ["Dativ", "dem", "der", "dem", "den + -n"]
          ]
        }
      },
      {
        heading: "不定冠词",
        body: "ein 用于阳性和中性，eine 用于阴性；宾格阳性变成 einen，与格阳性/中性变成 einem，阴性变成 einer。",
        examples: [
          { de: "Ich sehe einen Mann.", zh: "我看见一个男人。" },
          { de: "Ich helfe einer Frau.", zh: "我帮助一位女士。" }
        ]
      }
    ],
    exercises: [
      { q: "Ich sehe ___ Mann.", options: ["der", "den", "dem"], answer: 1, explain: "sehen 接宾格，阳性定冠词 der → den。" },
      { q: "Ich helfe ___ Frau.", options: ["die", "der", "das"], answer: 1, explain: "helfen 接与格，阴性定冠词 die → der。" }
    ]
  },
  {
    id: "plural",
    level: "A1",
    title: "名词复数",
    de: "Der Plural",
    summary: "复数没有一条万能规则，但常见词尾和变音能帮你猜个大概。",
    sections: [
      {
        heading: "常见复数词尾",
        body: "常见模式包括 -e、-en、-er、-s 和无词尾；很多词还会变音（a→ä, o→ö, u→ü）。名词的复数最好和单数、冠词一起记。",
        examples: [
          { de: "der Tisch → die Tische", zh: "-e" },
          { de: "die Frau → die Frauen", zh: "-en" },
          { de: "das Buch → die Bücher", zh: "-er + 变音" },
          { de: "das Auto → die Autos", zh: "-s" },
          { de: "das Fenster → die Fenster", zh: "词尾不变" }
        ]
      },
      {
        heading: "不要只记词尾",
        body: "同一个词尾可能出现在不同模式里，例如 die Stadt → die Städte；变音和词尾要一起记。",
        examples: [
          { de: "die Stadt → die Städte", zh: "城市" },
          { de: "der Apfel → die Äpfel", zh: "苹果" }
        ]
      }
    ],
    exercises: [
      { q: "die Stadt → ___", options: ["die Stadte", "die Städte", "die Stadten"], answer: 1, explain: "Stadt 的复数是 Städte，a 变 ä 并加 -e。" },
      { q: "das Buch → ___", options: ["die Bucher", "die Bücher", "die Buchs"], answer: 1, explain: "Buch 的复数是 Bücher，u 变 ü 并加 -er。" }
    ]
  },
  {
    id: "wortstellung",
    level: "A1",
    title: "语序与动词位置",
    de: "Wortstellung",
    summary: "陈述句动词在第二位；是非问句动词在第一位；从句动词在最后。",
    sections: [
      {
        heading: "动词第二位",
        body: "陈述句里，变位动词永远占第二个位置。即使时间、地点或宾语被提到句首，动词仍然在第二位，主语移动到动词后面。",
        examples: [
          { de: "Ich gehe heute ins Kino.", zh: "正常语序。" },
          { de: "Heute gehe ich ins Kino.", zh: "时间状语提前，动词仍在第二位。" }
        ]
      },
      {
        heading: "疑问句",
        body: "是非问句把变位动词放到第一位；特殊疑问句是“疑问词 + 动词 + 主语”。",
        examples: [
          { de: "Kommst du morgen?", zh: "你明天来吗？" },
          { de: "Wann kommst du?", zh: "你什么时候来？" }
        ]
      },
      {
        heading: "从句",
        body: "dass、weil、wenn 等连词引导的从句，变位动词放到句末。",
        examples: [
          { de: "Ich weiß, dass er morgen kommt.", zh: "我知道他明天来。" }
        ]
      }
    ],
    exercises: [
      { q: "Heute ___ ich ins Kino.", options: ["gehe", "ich gehe", "gehen"], answer: 0, explain: "时间状语占第一位，变位动词必须占第二位：Heute gehe ich ..." },
      { q: "Ich weiß, dass er morgen ___.", options: ["kommt", "kommen", "komme"], answer: 0, explain: "dass 从句中变位动词放在句末：... dass er morgen kommt." }
    ]
  },
  {
    id: "modalverben",
    level: "A1",
    title: "情态动词",
    de: "Modalverben",
    summary: "情态动词表达能力、必须、愿望、允许；实义动词的不定式放在句末。",
    sections: [
      {
        heading: "六个核心情态动词",
        body: "können（能）、müssen（必须）、wollen（想要）、sollen（应该）、dürfen（允许）、mögen（喜欢）。情态动词按人称变位，后面的实义动词用不定式并放在句末。",
        examples: [
          { de: "Ich muss heute arbeiten.", zh: "我今天必须工作。" },
          { de: "Kannst du mir helfen?", zh: "你能帮我吗？" },
          { de: "Wir wollen nach Berlin fahren.", zh: "我们想去柏林。" }
        ]
      },
      {
        heading: "注意语气",
        body: "müssen 表示客观必要；sollen 表示别人要求或建议；dürfen 表示许可；mögen 表示喜欢。否定时 nicht müssen 是“不必”，nicht dürfen 是“不允许”。",
        examples: [
          { de: "Du musst nicht kommen.", zh: "你不必来。" },
          { de: "Du darfst nicht rauchen.", zh: "你不可以吸烟。" }
        ]
      }
    ],
    exercises: [
      { q: "Ich ___ heute arbeiten.", options: ["muss", "musst", "müssen"], answer: 0, explain: "ich 对应 muss；实义动词 arbeiten 放句末。" },
      { q: "___ du mir helfen?", options: ["Kann", "Kannst", "Können"], answer: 1, explain: "du 对应 kannst：Kannst du mir helfen?" }
    ]
  },
  {
    id: "trennbar",
    level: "A1",
    title: "可分动词",
    de: "Trennbare Verben",
    summary: "前缀在句末、变位动词在第二位；完成时分词要把 ge- 放在中间。",
    sections: [
      {
        heading: "句子里的分离",
        body: "aufstehen、anrufen、einkaufen、mitkommen 等动词由前缀 + 基础动词组成。现在时和过去时里，前缀被放到句末。",
        examples: [
          { de: "Ich stehe um sieben Uhr auf.", zh: "我七点起床。" },
          { de: "Er ruft seine Mutter an.", zh: "他给母亲打电话。" }
        ]
      },
      {
        heading: "完成时",
        body: "可分动词的第二分词把 ge- 放在前缀和词干之间：aufgestanden、angerufen、eingekauft。",
        examples: [
          { de: "Ich bin früh aufgestanden.", zh: "我起得很早。" },
          { de: "Sie hat ihre Freundin angerufen.", zh: "她给朋友打了电话。" }
        ]
      }
    ],
    exercises: [
      { q: "Ich stehe um sieben Uhr ___.", options: ["auf", "an", "aus"], answer: 0, explain: "aufstehen 的前缀 auf 放在句末。" },
      { q: "Er hat das Licht ___.", options: ["angemacht", "aufgemacht", "gemacht an"], answer: 0, explain: "anmachen 的第二分词是 angemacht。" }
    ]
  },
  {
    id: "perfekt",
    level: "A1",
    title: "现在完成时",
    de: "Das Perfekt",
    summary: "haben / sein + 第二分词，是德语口语里最常用的过去表达。",
    sections: [
      {
        heading: "构成",
        body: "现在完成时 = haben 或 sein 的现在时 + 第二分词（Partizip II）。大多数动词用 haben；表示移动、状态改变或 sein/bleiben/werden 的动词常用 sein。",
        examples: [
          { de: "Ich habe das Buch gelesen.", zh: "我读过这本书。" },
          { de: "Wir sind nach Berlin gefahren.", zh: "我们去了柏林。" },
          { de: "Er ist zu Hause geblieben.", zh: "他留在家里了。" }
        ]
      },
      {
        heading: "第二分词",
        body: "规则动词：ge- + 词干 + -t（lernen → gelernt）。强变化动词需要单独记（lesen → gelesen, fahren → gefahren）。以 be-、ver-、er- 开头的动词通常不加 ge-。",
        examples: [
          { de: "machen → gemacht", zh: "规则" },
          { de: "verstehen → verstanden", zh: "不可分前缀，不加 ge-" }
        ]
      }
    ],
    exercises: [
      { q: "Ich habe das Buch ___.", options: ["gelesen", "lesen", "gelest"], answer: 0, explain: "lesen 的第二分词是 gelesen。" },
      { q: "Wir sind nach Berlin ___.", options: ["gefahren", "gefahrt", "fahren"], answer: 0, explain: "fahren 用 sein，第二分词是 gefahren。" }
    ]
  },
  {
    id: "negation",
    level: "A1",
    title: "否定与疑问",
    de: "Negation und Fragen",
    summary: "nicht 否定动作、形容词或整句；kein 否定带不定冠词或零冠词的名词。",
    sections: [
      {
        heading: "nicht 还是 kein？",
        body: "有定冠词、物主冠词或专有名词时用 nicht；名词前是不定冠词或没有冠词时，通常用 kein。kein 要按性别和格变位：kein / keine / keinen / keinem / keiner。",
        examples: [
          { de: "Ich habe keine Zeit.", zh: "我没有时间。" },
          { de: "Er kommt heute nicht.", zh: "他今天不来。" },
          { de: "Das ist nicht mein Buch.", zh: "这不是我的书。" }
        ]
      },
      {
        heading: "疑问句",
        body: "是非问句把动词放第一位，回答用 Ja / Nein / Doch。否定问句“你不来吗？”如果回答“不，我来”，要用 Doch。",
        examples: [
          { de: "Kommst du nicht? — Doch, ich komme.", zh: "你不来吗？——不，我来。" }
        ]
      }
    ],
    exercises: [
      { q: "Ich habe ___ Zeit.", options: ["nicht", "keine", "kein"], answer: 1, explain: "Zeit 是阴性且无冠词，用 keine。" },
      { q: "Er kommt heute ___.", options: ["nicht", "kein", "keine"], answer: 0, explain: "否定整个动作 kommen，用 nicht。" }
    ]
  },
  {
    id: "reflexiv",
    level: "A2",
    title: "反身动词",
    de: "Reflexive Verben",
    summary: "动作回到主语自身；反身代词要按人称变化，注意第三格和第四格。",
    sections: [
      {
        heading: "反身代词",
        body: "第四格：mich, dich, sich, uns, euch, sich；第三格：mir, dir, sich, uns, euch, sich。很多动词必须带反身代词，例如 sich freuen、sich erinnern、sich beeilen。",
        examples: [
          { de: "Ich freue mich auf den Urlaub.", zh: "我期待假期。" },
          { de: "Er erinnert sich an seine Kindheit.", zh: "他回忆起童年。" },
          { de: "Sie wäscht sich die Hände.", zh: "她洗手。（第三格反身代词 + 第四格宾语）" }
        ]
      },
      {
        heading: "语序",
        body: "反身代词通常紧跟变位动词；但在从句里，反身代词放在主语之后、动词之前。",
        examples: [
          { de: "Ich muss mich beeilen.", zh: "我得快点。" },
          { de: "Er sagt, dass er sich beeilt.", zh: "他说他得快点。" }
        ]
      }
    ],
    exercises: [
      { q: "Ich freue ___ auf den Urlaub.", options: ["mich", "mir", "sich"], answer: 0, explain: "sich freuen 接第四格反身代词；ich → mich。" },
      { q: "Sie wäscht ___ die Hände.", options: ["mich", "sich", "ihr"], answer: 1, explain: "主语 sie，反身代词第三格是 sich。" }
    ]
  },
  {
    id: "praeteritum",
    level: "A2",
    title: "过去时",
    de: "Das Präteritum",
    summary: "书面叙事常用过去时；口语里完成时更常见，但 sein / haben / 情态动词常用过去时。",
    sections: [
      {
        heading: "规则与不规则",
        body: "规则动词：词干 + -te（machen → machte）。强变化动词有独立形式（gehen → ging, lesen → las）。sein、haben、werden 的过去时特别常用：war、hatte、wurde。",
        examples: [
          { de: "Ich war gestern zu Hause.", zh: "我昨天在家。" },
          { de: "Er las ein Buch.", zh: "他在读一本书。" },
          { de: "Wir hatten keine Zeit.", zh: "我们没有时间。" }
        ]
      },
      {
        heading: "怎么选",
        body: "口语和信件中，已完成动作常用完成时；新闻报道、小说和书面叙述常用过去时。不要在同一段里频繁混用两种时态。",
        examples: [
          { de: "Gestern habe ich gearbeitet.", zh: "口语：昨天我工作了。" },
          { de: "Er arbeitete den ganzen Tag.", zh: "书面：他工作了一整天。" }
        ]
      }
    ],
    exercises: [
      { q: "Ich ___ gestern zu Hause.", options: ["war", "bin", "wurde"], answer: 0, explain: "sein 的过去时 ich war。" },
      { q: "Er ___ ein Buch.", options: ["lest", "las", "gelesen"], answer: 1, explain: "lesen 的过去时 er las。" }
    ]
  },
  {
    id: "passiv",
    level: "A2",
    title: "被动语态",
    de: "Das Passiv",
    summary: "当动作本身比“谁做的”更重要时，用 werden + 第二分词。",
    sections: [
      {
        heading: "现在时被动",
        body: "werden 按人称变位 + 第二分词，放在句末。动作执行者用 von + 第三格表示，通常省略。",
        examples: [
          { de: "Das Haus wird gebaut.", zh: "房子正在被建造。" },
          { de: "Die Prüfung wird morgen geschrieben.", zh: "考试明天进行（被写）。" },
          { de: "Das Buch wurde von Goethe geschrieben.", zh: "这本书由歌德写成。" }
        ]
      },
      {
        heading: "过去时被动",
        body: "werden 的过去时 wurde + 第二分词。被动语态常用于规则、流程、新闻和学术表达。",
        examples: [
          { de: "Das Problem wurde schnell gelöst.", zh: "问题很快被解决了。" }
        ]
      }
    ],
    exercises: [
      { q: "Die Prüfung ___ morgen geschrieben.", options: ["wird", "werden", "wurde"], answer: 0, explain: "主语 die Prüfung 是单数，现在时被动用 wird。" },
      { q: "Das Buch ___ von Goethe geschrieben.", options: ["wird", "wurde", "werden"], answer: 1, explain: "已完成的历史事实用过去时被动 wurde。" }
    ]
  },
  {
    id: "relativsatz",
    level: "A2",
    title: "关系从句",
    de: "Relativsätze",
    summary: "关系代词承接前面的名词，格由它在从句中的功能决定，动词放句末。",
    sections: [
      {
        heading: "关系代词",
        body: "关系代词的形式与定冠词相近：der, die, das, die（复数）；宾格 den, die, das, die；与格 dem, der, dem, denen。关系代词的性、数由先行词决定，格由它在从句里的作用决定。",
        examples: [
          { de: "Der Mann, der dort steht, ist mein Lehrer.", zh: "站在那里的男人是我老师。" },
          { de: "Das Buch, das ich lese, ist spannend.", zh: "我正在读的这本书很精彩。" },
          { de: "Die Frau, der ich helfe, ist meine Nachbarin.", zh: "我帮助的那位女士是我邻居。" }
        ]
      },
      {
        heading: "语序",
        body: "关系从句中，变位动词放在最后；关系从句紧跟先行词，用逗号隔开。",
        examples: [
          { de: "Das ist der Freund, den ich gestern getroffen habe.", zh: "这是我昨天遇到的朋友。" }
        ]
      }
    ],
    exercises: [
      { q: "Der Mann, ___ dort steht, ist mein Lehrer.", options: ["der", "den", "dem"], answer: 0, explain: "先行词 der Mann 在从句中作主语，关系代词用 der。" },
      { q: "Das Buch, ___ ich lese, ist spannend.", options: ["der", "das", "dem"], answer: 1, explain: "先行词 das Buch 是中性，在从句中作宾语，关系代词用 das。" }
    ]
  },
  {
    id: "konjunktiv2",
    level: "A2",
    title: "虚拟式 II",
    de: "Konjunktiv II",
    summary: "表达不真实、礼貌请求和委婉建议；常用 würde + 不定式、hätte、wäre。",
    sections: [
      {
        heading: "形式",
        body: "大多数动词用 würde + 不定式；sein、haben 和情态动词有独立形式：wäre、hätte、könnte、müsste、dürfte。",
        examples: [
          { de: "Wenn ich Zeit hätte, würde ich kommen.", zh: "如果我有时间，我就会来。（事实上没有）" },
          { de: "Könnten Sie mir bitte helfen?", zh: "您能帮我一下吗？（礼貌）" },
          { de: "An deiner Stelle wäre ich vorsichtiger.", zh: "如果我是你，我会更小心。" }
        ]
      },
      {
        heading: "礼貌与建议",
        body: "虚拟式 II 让请求更委婉，也让建议不那么强硬。würde gern、hätte gern、könnte 是日常高频表达。",
        examples: [
          { de: "Ich hätte gern einen Kaffee.", zh: "我想要一杯咖啡。" },
          { de: "Du solltest früher schlafen.", zh: "你应该早点睡。" }
        ]
      }
    ],
    exercises: [
      { q: "Wenn ich Zeit ___, würde ich kommen.", options: ["habe", "hätte", "hatte"], answer: 1, explain: "非现实条件用虚拟式 II：hätte。" },
      { q: "___ Sie mir bitte helfen?", options: ["Können", "Könnten", "Konnten"], answer: 1, explain: "礼貌请求用 Könnten。" }
    ]
  },
  {
    id: "adjektiv",
    level: "A2",
    title: "形容词词尾",
    de: "Adjektivdeklination",
    summary: "形容词词尾取决于它前面有没有冠词、冠词类型，以及名词的性、数、格。",
    sections: [
      {
        heading: "定冠词后",
        body: "定冠词后，形容词通常用 -e 或 -en：主格单数 der gute Mann / die gute Frau / das gute Buch；宾格阳性 den guten Mann；与格 dem guten Mann。",
        examples: [
          { de: "der kleine Hund", zh: "那只小狗（主格）" },
          { de: "Ich sehe den kleinen Hund.", zh: "我看见那只小狗（宾格）" }
        ]
      },
      {
        heading: "不定冠词与零冠词",
        body: "不定冠词后，形容词要同时承担一部分冠词信息：ein neues Auto（中性主格）、einen neuen Computer（阳性宾格）。没有冠词时，形容词词尾更强：guter Wein、frische Milch。",
        examples: [
          { de: "Ein neues Auto steht draußen.", zh: "一辆新车停在外面。" },
          { de: "Ich trinke frische Milch.", zh: "我喝新鲜牛奶。" }
        ]
      }
    ],
    exercises: [
      { q: "Ich sehe den klein___ Hund.", options: ["e", "en", "em"], answer: 1, explain: "定冠词 den + 阳性宾格，形容词词尾 -en。" },
      { q: "Ein neu___ Auto steht draußen.", options: ["e", "es", "en"], answer: 1, explain: "ein + 中性主格，形容词词尾 -es。" }
    ]
  },
  {
    id: "praepositionen",
    level: "A2",
    title: "介词与格",
    de: "Präpositionen",
    summary: "介词决定名词用第三格还是第四格；双向介词看“方向”还是“位置”。",
    sections: [
      {
        heading: "固定接第三格",
        body: "aus, bei, mit, nach, seit, von, zu 后面接第三格。常见缩写：zum = zu dem，zur = zu der，im = in dem，am = an dem。",
        examples: [
          { de: "Ich fahre mit dem Bus.", zh: "我坐公交车。" },
          { de: "Nach dem Essen gehen wir spazieren.", zh: "饭后我们去散步。" }
        ]
      },
      {
        heading: "固定接第四格",
        body: "durch, für, gegen, ohne, um 后面接第四格。",
        examples: [
          { de: "Das Geschenk ist für meinen Bruder.", zh: "礼物是给我弟弟的。" },
          { de: "Wir gehen ohne dich.", zh: "我们不带你去。" }
        ]
      },
      {
        heading: "双向介词",
        body: "in, an, auf, über, unter, vor, hinter, neben, zwischen：表示方向（去哪里）用第四格；表示位置（在哪里）用第三格。",
        examples: [
          { de: "Ich gehe in das Kino.", zh: "我去电影院。（方向 → 第四格）" },
          { de: "Ich bin im Kino.", zh: "我在电影院里。（位置 → 第三格）" }
        ]
      }
    ],
    exercises: [
      { q: "Ich fahre mit ___ Bus.", options: ["der", "den", "dem"], answer: 2, explain: "mit 接第三格，der Bus → dem Bus。" },
      { q: "Wir gehen in ___ Kino.", options: ["das", "dem", "der"], answer: 0, explain: "gehen 表方向，in + 第四格；das Kino 保持 das。" }
    ]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { GRAMMAR_TOPICS };
}

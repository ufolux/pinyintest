// 拼音组合验证函数 - 覆盖版本
function isValidCombination(shengmu, yunmu) {
  // 简单检查：确保不在无效组合列表中
  // 这个函数将覆盖文件中后面的复杂版本
  const invalidCombinations = [
    // j, q, x 只能与 i, ü 开头的韵母组合，不能与其他韵母组合
    ["j", "a"],
    ["j", "o"],
    ["j", "u"],
    ["j", "ai"],
    ["j", "ao"],
    ["j", "ou"],
    ["j", "an"],
    ["j", "un"],
    ["j", "ang"],
    ["j", "ong"],
    ["q", "a"],
    ["q", "o"],
    ["q", "u"],
    ["q", "ai"],
    ["q", "ao"],
    ["q", "ou"],
    ["q", "an"],
    ["q", "un"],
    ["q", "ang"],
    ["q", "ong"],
    ["x", "a"],
    ["x", "o"],
    ["x", "u"],
    ["x", "ai"],
    ["x", "ao"],
    ["x", "ou"],
    ["x", "an"],
    ["x", "un"],
    ["x", "ang"],
    ["x", "ong"],

    // zh, ch, sh, r 不能与 i, ü 开头的韵母组合
    ["zh", "i"],
    ["zh", "ü"],
    ["zh", "ie"],
    ["zh", "üe"],
    ["zh", "in"],
    ["zh", "ün"],
    ["ch", "i"],
    ["ch", "ü"],
    ["ch", "ie"],
    ["ch", "üe"],
    ["ch", "in"],
    ["ch", "ün"],
    ["sh", "i"],
    ["sh", "ü"],
    ["sh", "ie"],
    ["sh", "üe"],
    ["sh", "in"],
    ["sh", "ün"],
    ["r", "i"],
    ["r", "ü"],
    ["r", "ie"],
    ["r", "üe"],
    ["r", "in"],
    ["r", "ün"],

    // z, c, s 不能与 ü 开头的韵母组合
    ["z", "ü"],
    ["z", "üe"],
    ["z", "ün"],
    ["c", "ü"],
    ["c", "üe"],
    ["c", "ün"],
    ["s", "ü"],
    ["s", "üe"],
    ["s", "ün"],
  ];

  // 检查是否在无效组合列表中
  if (invalidCombinations.some(([s, y]) => s === shengmu && y === yunmu)) {
    return false;
  }

  return true;
}

// 拼音数据
const pinyinData = {
  // 声母 (不包括零声母)
  shengmu: [
    "b",
    "p",
    "m",
    "f",
    "d",
    "t",
    "n",
    "l",
    "g",
    "k",
    "h",
    "j",
    "q",
    "x",
    "zh",
    "ch",
    "sh",
    "r",
    "z",
    "c",
    "s",
  ],

  // 韵母
  yunmu: [
    // 单韵母
    "a",
    "o",
    "e",
    "i",
    "u",
    "ü",
    // 复韵母
    "ai",
    "ei",
    "ui",
    "ao",
    "ou",
    "iu",
    "ie",
    "üe",
    // 鼻韵母
    "an",
    "en",
    "in",
    "un",
    "ün",
    "ang",
    "eng",
    "ing",
    "ong",
  ],

  // 声调
  shengdiao: [
    { tone: 1, name: "一声", symbol: "ˉ" },
    { tone: 2, name: "二声", symbol: "ˊ" },
    { tone: 3, name: "三声", symbol: "ˇ" },
    { tone: 4, name: "四声", symbol: "ˋ" },
    { tone: 0, name: "轻声", symbol: "" },
  ],
};

// 拼音规则 - 定义哪些声母和韵母可以组合
const pinyinRules = {
  // 真正不能组合的声母和韵母（基于标准汉语拼音规则）
  invalidCombinations: [
    // j, q, x 只能与 i, ü 开头的韵母组合，不能与其他韵母组合
    ["j", "a"],
    ["j", "o"],
    ["j", "u"],
    ["j", "ai"],
    ["j", "ao"],
    ["j", "ou"],
    ["j", "an"],
    ["j", "un"],
    ["j", "ang"],
    ["j", "ong"],
    ["q", "a"],
    ["q", "o"],
    ["q", "u"],
    ["q", "ai"],
    ["q", "ao"],
    ["q", "ou"],
    ["q", "an"],
    ["q", "un"],
    ["q", "ang"],
    ["q", "ong"],
    ["x", "a"],
    ["x", "o"],
    ["x", "u"],
    ["x", "ai"],
    ["x", "ao"],
    ["x", "ou"],
    ["x", "an"],
    ["x", "un"],
    ["x", "ang"],
    ["x", "ong"],

    // zh, ch, sh, r 不能与 i, ü 开头的韵母组合
    ["zh", "i"],
    ["zh", "ü"],
    ["zh", "ie"],
    ["zh", "üe"],
    ["zh", "in"],
    ["zh", "ün"],
    ["ch", "i"],
    ["ch", "ü"],
    ["ch", "ie"],
    ["ch", "üe"],
    ["ch", "in"],
    ["ch", "ün"],
    ["sh", "i"],
    ["sh", "ü"],
    ["sh", "ie"],
    ["sh", "üe"],
    ["sh", "in"],
    ["sh", "ün"],
    ["r", "i"],
    ["r", "ü"],
    ["r", "ie"],
    ["r", "üe"],
    ["r", "in"],
    ["r", "ün"],

    // z, c, s 不能与 ü 开头的韵母组合
    ["z", "ü"],
    ["z", "üe"],
    ["z", "ün"],
    ["c", "ü"],
    ["c", "üe"],
    ["c", "ün"],
    ["s", "ü"],
    ["s", "üe"],
    ["s", "ün"],

    // b, p, m, f 不能与 ü 开头的韵母组合
    ["b", "ü"],
    ["b", "üe"],
    ["b", "ün"],
    ["p", "ü"],
    ["p", "üe"],
    ["p", "ün"],
    ["m", "ü"],
    ["m", "üe"],
    ["m", "ün"],
    ["f", "ü"],
    ["f", "üe"],
    ["f", "ün"],

    // d, t, n, l 不能与 ü 开头的韵母组合
    ["d", "ü"],
    ["d", "üe"],
    ["d", "ün"],
    ["t", "ü"],
    ["t", "üe"],
    ["t", "ün"],
    ["n", "ü"],
    ["n", "üe"],
    ["n", "ün"],
    ["l", "ü"],
    ["l", "üe"],
    ["l", "ün"],

    // g, k, h 不能与 i, ü 开头的韵母组合
    ["g", "i"],
    ["g", "ü"],
    ["g", "ie"],
    ["g", "üe"],
    ["g", "in"],
    ["g", "ün"],
    ["k", "i"],
    ["k", "ü"],
    ["k", "ie"],
    ["k", "üe"],
    ["k", "in"],
    ["k", "ün"],
    ["h", "i"],
    ["h", "ü"],
    ["h", "ie"],
    ["h", "üe"],
    ["h", "in"],
    ["h", "ün"],
  ],
};

// 当前选择的拼音组合
let currentSelection = {
  shengmu: null,
  yunmu: null,
  shengdiao: null,
};

// DOM 元素
let elements = {};

// 初始化
document.addEventListener("DOMContentLoaded", function () {
  initializeElements();
  generateButtons();
  bindEvents();
});

function initializeElements() {
  elements = {
    currentShengmu: document.getElementById("current-shengmu"),
    currentYunmu: document.getElementById("current-yunmu"),
    currentShengdiao: document.getElementById("current-shengdiao"),
    pinyinResult: document.getElementById("pinyin-result"),
    playButton: document.getElementById("play-button"),
    errorMessage: document.getElementById("error-message"),
    shengmuGrid: document.getElementById("shengmu-grid"),
    yunmuGrid: document.getElementById("yunmu-grid"),
    shengdiaoGrid: document.getElementById("shengdiao-grid"),
    clearButton: document.getElementById("clear-button"),
    randomButton: document.getElementById("random-button"),
  };
}

function generateButtons() {
  generateShengmuButtons();
  generateYunmuButtons();
  generateShengdiaoButtons();
}

function generateShengmuButtons() {
  elements.shengmuGrid.innerHTML = "";
  pinyinData.shengmu.forEach((shengmu) => {
    const button = document.createElement("button");
    button.className = "selection-button shengmu-button";
    button.textContent = shengmu;
    button.onclick = () => selectShengmu(shengmu, button);
    elements.shengmuGrid.appendChild(button);
  });
}

function generateYunmuButtons() {
  elements.yunmuGrid.innerHTML = "";
  pinyinData.yunmu.forEach((yunmu) => {
    const button = document.createElement("button");
    button.className = "selection-button yunmu-button";
    button.textContent = yunmu;
    button.onclick = () => selectYunmu(yunmu, button);
    elements.yunmuGrid.appendChild(button);
  });
}

function generateShengdiaoButtons() {
  elements.shengdiaoGrid.innerHTML = "";

  pinyinData.shengdiao.forEach((tone) => {
    const button = document.createElement("button");
    button.className = "tone-button";
    button.innerHTML = `
            <div class="tone-example">${getToneDisplay(tone.tone)}</div>
            <div class="tone-name">${tone.name}</div>
        `;
    button.onclick = () => selectShengdiao(tone, button);
    elements.shengdiaoGrid.appendChild(button);
  });
}

function getToneDisplay(toneNumber) {
  // 如果已选择韵母，显示对应的带声调韵母
  if (currentSelection.yunmu) {
    return addToneMarks(currentSelection.yunmu, toneNumber);
  }

  // 默认显示
  const defaultExamples = {
    1: "ā",
    2: "á",
    3: "ǎ",
    4: "à",
    0: "a",
  };

  return defaultExamples[toneNumber];
}

function getMainVowel(yunmu) {
  // 根据拼音标调规则确定主要元音：a > o > e > i > u > ü
  const priority = ["a", "o", "e", "i", "u", "ü"];

  for (let vowel of priority) {
    if (yunmu.includes(vowel)) {
      return vowel;
    }
  }
  return null;
}

function addToneToVowel(vowel, tone) {
  if (tone === 0) return vowel; // 轻声不加标记

  const toneMarks = {
    1: { a: "ā", o: "ō", e: "ē", i: "ī", u: "ū", ü: "ǖ" },
    2: { a: "á", o: "ó", e: "é", i: "í", u: "ú", ü: "ǘ" },
    3: { a: "ǎ", o: "ǒ", e: "ě", i: "ǐ", u: "ǔ", ü: "ǚ" },
    4: { a: "à", o: "ò", e: "è", i: "ì", u: "ù", ü: "ǜ" },
  };

  return toneMarks[tone][vowel] || vowel;
}

function updateToneButtonsDisplay() {
  const toneButtons = document.querySelectorAll(".tone-button");
  toneButtons.forEach((button, index) => {
    const toneExample = button.querySelector(".tone-example");
    if (toneExample) {
      toneExample.textContent = getToneDisplay(
        pinyinData.shengdiao[index].tone
      );
    }
  });
}

function selectShengmu(shengmu, button) {
  // 清除之前的选择
  document
    .querySelectorAll(".shengmu-button")
    .forEach((btn) => btn.classList.remove("selected"));

  // 选择新的声母
  button.classList.add("selected");
  currentSelection.shengmu = shengmu;
  elements.currentShengmu.textContent = shengmu;
  elements.currentShengmu.classList.add("selected");

  updatePinyinResult();
}

function selectYunmu(yunmu, button) {
  // 清除之前的选择
  document
    .querySelectorAll(".yunmu-button")
    .forEach((btn) => btn.classList.remove("selected"));

  // 选择新的韵母
  button.classList.add("selected");
  currentSelection.yunmu = yunmu;
  elements.currentYunmu.textContent = yunmu;
  elements.currentYunmu.classList.add("selected");

  // 更新声调按钮显示
  updateToneButtonsDisplay();

  updatePinyinResult();
}

function selectShengdiao(tone, button) {
  // 清除之前的选择
  document
    .querySelectorAll(".tone-button")
    .forEach((btn) => btn.classList.remove("selected"));

  // 选择新的声调
  button.classList.add("selected");
  currentSelection.shengdiao = tone;
  elements.currentShengdiao.textContent = tone.tone === 0 ? "轻" : tone.tone;
  elements.currentShengdiao.classList.add("selected");

  updatePinyinResult();
}

function updatePinyinResult() {
  clearError();

  if (!currentSelection.shengmu || !currentSelection.yunmu) {
    elements.pinyinResult.textContent = "请选择声母和韵母";
    elements.playButton.disabled = true;
    return;
  }

  // 检查拼音组合是否合法
  if (!isValidCombination(currentSelection.shengmu, currentSelection.yunmu)) {
    showError(
      `声母"${currentSelection.shengmu}"和韵母"${currentSelection.yunmu}"不能组合！`
    );
    elements.pinyinResult.textContent = "❌ 无效组合";
    elements.playButton.disabled = true;

    // 添加震动效果
    elements.pinyinResult.classList.add("shake");
    setTimeout(() => elements.pinyinResult.classList.remove("shake"), 500);
    return;
  }

  // 生成完整的拼音
  let fullPinyin = currentSelection.shengmu + currentSelection.yunmu;

  // 添加声调标记
  if (currentSelection.shengdiao) {
    fullPinyin = addToneMarks(fullPinyin, currentSelection.shengdiao.tone);
  }

  elements.pinyinResult.textContent = fullPinyin;
  elements.playButton.disabled = false;

  // 添加成功效果
  elements.pinyinResult.classList.add("bounce");
  setTimeout(() => elements.pinyinResult.classList.remove("bounce"), 1000);
}

function isValidCombination(shengmu, yunmu) {
  // 简单检查：确保不在无效组合列表中
  // 这个函数将覆盖文件中后面的复杂版本
  const invalidCombinations = [
    // j, q, x 只能与 i, ü 开头的韵母组合，不能与其他韵母组合
    ["j", "a"],
    ["j", "o"],
    ["j", "u"],
    ["j", "ai"],
    ["j", "ao"],
    ["j", "ou"],
    ["j", "an"],
    ["j", "un"],
    ["j", "ang"],
    ["j", "ong"],
    ["q", "a"],
    ["q", "o"],
    ["q", "u"],
    ["q", "ai"],
    ["q", "ao"],
    ["q", "ou"],
    ["q", "an"],
    ["q", "un"],
    ["q", "ang"],
    ["q", "ong"],
    ["x", "a"],
    ["x", "o"],
    ["x", "u"],
    ["x", "ai"],
    ["x", "ao"],
    ["x", "ou"],
    ["x", "an"],
    ["x", "un"],
    ["x", "ang"],
    ["x", "ong"],

    // zh, ch, sh, r 不能与 i, ü 开头的韵母组合
    ["zh", "i"],
    ["zh", "ü"],
    ["zh", "ie"],
    ["zh", "üe"],
    ["zh", "in"],
    ["zh", "ün"],
    ["ch", "i"],
    ["ch", "ü"],
    ["ch", "ie"],
    ["ch", "üe"],
    ["ch", "in"],
    ["ch", "ün"],
    ["sh", "i"],
    ["sh", "ü"],
    ["sh", "ie"],
    ["sh", "üe"],
    ["sh", "in"],
    ["sh", "ün"],
    ["r", "i"],
    ["r", "ü"],
    ["r", "ie"],
    ["r", "üe"],
    ["r", "in"],
    ["r", "ün"],

    // z, c, s 不能与 ü 开头的韵母组合
    ["z", "ü"],
    ["z", "üe"],
    ["z", "ün"],
    ["c", "ü"],
    ["c", "üe"],
    ["c", "ün"],
    ["s", "ü"],
    ["s", "üe"],
    ["s", "ün"],
  ];

  // 检查是否在无效组合列表中
  if (invalidCombinations.some(([s, y]) => s === shengmu && y === yunmu)) {
    return false;
  }

  return true;
}

// 检查是否为已知的有效拼音组合
function isKnownValidPinyin(pinyin) {
  // 常见的有效拼音组合列表
  const validPinyinList = [
    // 单字母韵母组合
    "ba",
    "pa",
    "ma",
    "fa",
    "da",
    "ta",
    "na",
    "la",
    "ga",
    "ka",
    "ha",
    "za",
    "ca",
    "sa",
    "zha",
    "cha",
    "sha",
    "ra",
    "bo",
    "po",
    "mo",
    "fo",
    "duo",
    "tuo",
    "nuo",
    "luo",
    "guo",
    "kuo",
    "huo",
    "zuo",
    "cuo",
    "suo",
    "zhuo",
    "chuo",
    "shuo",
    "ruo",
    "be",
    "pe",
    "me",
    "de",
    "te",
    "ne",
    "le",
    "ge",
    "ke",
    "he",
    "ze",
    "ce",
    "se",
    "zhe",
    "che",
    "she",
    "re",

    // 双字母韵母组合
    "bai",
    "pai",
    "mai",
    "dai",
    "tai",
    "nai",
    "lai",
    "gai",
    "kai",
    "hai",
    "zai",
    "cai",
    "sai",
    "zhai",
    "chai",
    "shai",
    "bei",
    "pei",
    "mei",
    "fei",
    "dei",
    "nei",
    "lei",
    "gei",
    "kei",
    "hei",
    "zei",
    "shei",
    "bao",
    "pao",
    "mao",
    "dao",
    "tao",
    "nao",
    "lao",
    "gao",
    "kao",
    "hao",
    "zao",
    "cao",
    "sao",
    "zhao",
    "chao",
    "shao",
    "rao",
    "bou",
    "pou",
    "mou",
    "fou",
    "dou",
    "tou",
    "nou",
    "lou",
    "gou",
    "kou",
    "hou",
    "zou",
    "cou",
    "sou",
    "zhou",
    "chou",
    "shou",
    "rou",

    // 鼻音韵母组合
    "ban",
    "pan",
    "man",
    "fan",
    "dan",
    "tan",
    "nan",
    "lan",
    "gan",
    "kan",
    "han",
    "zan",
    "can",
    "san",
    "zhan",
    "chan",
    "shan",
    "ran",
    "ben",
    "pen",
    "men",
    "fen",
    "den",
    "nen",
    "gen",
    "ken",
    "hen",
    "zen",
    "cen",
    "sen",
    "zhen",
    "chen",
    "shen",
    "ren",
    "bang",
    "pang",
    "mang",
    "fang",
    "dang",
    "tang",
    "nang",
    "lang",
    "gang",
    "kang",
    "hang",
    "zang",
    "cang",
    "sang",
    "zhang",
    "chang",
    "shang",
    "rang",
    "beng",
    "peng",
    "meng",
    "feng",
    "deng",
    "teng",
    "neng",
    "leng",
    "geng",
    "keng",
    "heng",
    "zeng",
    "ceng",
    "seng",
    "zheng",
    "cheng",
    "sheng",
    "reng",
    "dong",
    "tong",
    "nong",
    "long",
    "gong",
    "kong",
    "hong",
    "zong",
    "cong",
    "song",
    "zhong",
    "chong",

    // i/u/ü 系列
    "bi",
    "pi",
    "mi",
    "di",
    "ti",
    "ni",
    "li",
    "ji",
    "qi",
    "xi",
    "zhi",
    "chi",
    "shi",
    "ri",
    "zi",
    "ci",
    "si",
    "bu",
    "pu",
    "mu",
    "fu",
    "du",
    "tu",
    "nu",
    "lu",
    "gu",
    "ku",
    "hu",
    "zhu",
    "chu",
    "shu",
    "ru",
    "zu",
    "cu",
    "su",
    "ju",
    "qu",
    "xu",
    "yu",
    "lü",
    "nü",

    // 复合韵母
    "bie",
    "pie",
    "mie",
    "die",
    "tie",
    "nie",
    "lie",
    "jie",
    "qie",
    "xie",
    "yue",
    "diu",
    "niu",
    "liu",
    "jiu",
    "qiu",
    "xiu",
    "you",
    "bin",
    "pin",
    "min",
    "din",
    "tin",
    "nin",
    "lin",
    "jin",
    "qin",
    "xin",
    "yin",
    "bun",
    "pun",
    "mun",
    "dun",
    "tun",
    "nun",
    "lun",
    "gun",
    "kun",
    "hun",
    "zhun",
    "chun",
    "shun",
    "run",
    "zun",
    "cun",
    "sun",
    "yun",
    "jun",
    "qun",
    "xun",
    "bing",
    "ping",
    "ming",
    "ding",
    "ting",
    "ning",
    "ling",
    "jing",
    "qing",
    "xing",
    "ying",
  ];

  return validPinyinList.includes(pinyin);
}

function addToneMarks(pinyin, tone) {
  if (tone === 0) return pinyin; // 轻声不加标记

  // 找到主要元音并添加声调标记
  const toneMarks = {
    1: { a: "ā", o: "ō", e: "ē", i: "ī", u: "ū", ü: "ǖ" },
    2: { a: "á", o: "ó", e: "é", i: "í", u: "ú", ü: "ǘ" },
    3: { a: "ǎ", o: "ǒ", e: "ě", i: "ǐ", u: "ǔ", ü: "ǚ" },
    4: { a: "à", o: "ò", e: "è", i: "ì", u: "ù", ü: "ǜ" },
  };

  // 标调规则：a > o > e > i > u > ü
  const priority = ["a", "o", "e", "i", "u", "ü"];

  for (let vowel of priority) {
    if (pinyin.includes(vowel)) {
      const toneVowel = toneMarks[tone][vowel];
      if (toneVowel) {
        return pinyin.replace(vowel, toneVowel);
      }
      break;
    }
  }

  return pinyin;
}

// 拼音对应的汉字字典（用于正确发音）
const pinyinCharacterMap = {
  // ba系列
  ba1: "八",
  ba2: "拔",
  ba3: "把",
  ba4: "爸",
  ba0: "吧",
  bai1: "白",
  bai2: "败",
  bai3: "百",
  bai4: "拜",
  bai0: "白",
  ban1: "班",
  ban2: "般",
  ban3: "板",
  ban4: "半",
  ban0: "班",
  bang1: "帮",
  bang2: "膀",
  bang3: "棒",
  bang4: "棒",
  bang0: "帮",
  bao1: "包",
  bao2: "薄",
  bao3: "保",
  bao4: "报",
  bao0: "包",
  bei1: "杯",
  bei2: "北",
  bei3: "北",
  bei4: "备",
  bei0: "杯",
  ben1: "奔",
  ben2: "本",
  ben3: "本",
  ben4: "本",
  ben0: "本",
  beng1: "崩",
  beng2: "绷",
  beng3: "绷",
  beng4: "蹦",
  beng0: "崩",
  bi1: "逼",
  bi2: "鼻",
  bi3: "比",
  bi4: "必",
  bi0: "比",
  bian1: "边",
  bian2: "编",
  bian3: "扁",
  bian4: "变",
  bian0: "边",
  biao1: "标",
  biao2: "标",
  biao3: "表",
  biao4: "表",
  biao0: "标",
  bie1: "憋",
  bie2: "别",
  bie3: "瘪",
  bie4: "别",
  bie0: "别",
  bin1: "宾",
  bin2: "宾",
  bin3: "宾",
  bin4: "殡",
  bin0: "宾",
  bing1: "兵",
  bing2: "冰",
  bing3: "饼",
  bing4: "病",
  bing0: "兵",
  bo1: "波",
  bo2: "薄",
  bo3: "跛",
  bo4: "博",
  bo0: "波",
  bu1: "不",
  bu2: "不",
  bu3: "不",
  bu4: "不",
  bu0: "不",

  // pa系列
  pa1: "趴",
  pa2: "爬",
  pa3: "爬",
  pa4: "怕",
  pa0: "趴",
  pai1: "拍",
  pai2: "排",
  pai3: "拍",
  pai4: "派",
  pai0: "拍",
  pan1: "潘",
  pan2: "盘",
  pan3: "盼",
  pan4: "判",
  pan0: "盘",
  pang1: "胖",
  pang2: "旁",
  pang3: "胖",
  pang4: "胖",
  pang0: "胖",
  pao1: "抛",
  pao2: "跑",
  pao3: "跑",
  pao4: "炮",
  pao0: "跑",
  pei1: "陪",
  pei2: "赔",
  pei3: "培",
  pei4: "配",
  pei0: "陪",
  pen1: "喷",
  pen2: "盆",
  pen3: "喷",
  pen4: "喷",
  pen0: "盆",
  peng1: "朋",
  peng2: "朋",
  peng3: "捧",
  peng4: "碰",
  peng0: "朋",
  pi1: "批",
  pi2: "皮",
  pi3: "匹",
  pi4: "屁",
  pi0: "皮",
  pian1: "偏",
  pian2: "便",
  pian3: "片",
  pian4: "骗",
  pian0: "片",
  piao1: "飘",
  piao2: "瓢",
  piao3: "票",
  piao4: "票",
  piao0: "票",
  pie1: "撇",
  pie2: "撇",
  pie3: "撇",
  pie4: "撇",
  pie0: "撇",
  pin1: "拼",
  pin2: "贫",
  pin3: "品",
  pin4: "聘",
  pin0: "拼",
  ping1: "乒",
  ping2: "平",
  ping3: "苹",
  ping4: "瓶",
  ping0: "平",
  po1: "坡",
  po2: "婆",
  po3: "破",
  po4: "魄",
  po0: "坡",
  pu1: "扑",
  pu2: "葡",
  pu3: "普",
  pu4: "瀑",
  pu0: "扑",

  // ma系列
  ma1: "妈",
  ma2: "麻",
  ma3: "马",
  ma4: "骂",
  ma0: "吗",
  mai1: "埋",
  mai2: "买",
  mai3: "买",
  mai4: "卖",
  mai0: "买",
  man1: "满",
  man2: "蛮",
  man3: "满",
  man4: "慢",
  man0: "满",
  mang1: "忙",
  mang2: "茫",
  mang3: "忙",
  mang4: "忙",
  mang0: "忙",
  mao1: "猫",
  mao2: "毛",
  mao3: "猫",
  mao4: "冒",
  mao0: "猫",
  mei1: "没",
  mei2: "美",
  mei3: "美",
  mei4: "妹",
  mei0: "没",
  men1: "闷",
  men2: "门",
  men3: "闷",
  men4: "闷",
  men0: "门",
  meng1: "蒙",
  meng2: "蒙",
  meng3: "猛",
  meng4: "梦",
  meng0: "蒙",
  mi1: "迷",
  mi2: "迷",
  mi3: "米",
  mi4: "密",
  mi0: "迷",
  mian1: "棉",
  mian2: "免",
  mian3: "面",
  mian4: "面",
  mian0: "面",
  miao1: "猫",
  miao2: "苗",
  miao3: "秒",
  miao4: "妙",
  miao0: "猫",
  mie1: "灭",
  mie2: "灭",
  mie3: "灭",
  mie4: "灭",
  mie0: "灭",
  min1: "民",
  min2: "民",
  min3: "敏",
  min4: "敏",
  min0: "民",
  ming1: "明",
  ming2: "名",
  ming3: "明",
  ming4: "命",
  ming0: "明",
  mo1: "摸",
  mo2: "模",
  mo3: "摸",
  mo4: "末",
  mo0: "摸",
  mu1: "木",
  mu2: "木",
  mu3: "母",
  mu4: "目",
  mu0: "木",

  // 更多拼音组合...
  // d系列
  da1: "搭",
  da2: "达",
  da3: "打",
  da4: "大",
  da0: "大",
  dai1: "呆",
  dai2: "待",
  dai3: "带",
  dai4: "代",
  dai0: "带",
  dan1: "单",
  dan2: "单",
  dan3: "胆",
  dan4: "但",
  dan0: "单",
  dang1: "当",
  dang2: "当",
  dang3: "党",
  dang4: "当",
  dang0: "当",
  dao1: "刀",
  dao2: "倒",
  dao3: "倒",
  dao4: "道",
  dao0: "倒",
  de1: "的",
  de2: "得",
  de3: "得",
  de4: "德",
  de0: "的",
  deng1: "灯",
  deng2: "等",
  deng3: "等",
  deng4: "等",
  deng0: "等",
  di1: "低",
  di2: "敌",
  di3: "底",
  di4: "地",
  di0: "地",
  dian1: "点",
  dian2: "电",
  dian3: "点",
  dian4: "店",
  dian0: "点",
  diao1: "叼",
  diao2: "调",
  diao3: "吊",
  diao4: "调",
  diao0: "调",
  die1: "跌",
  die2: "跌",
  die3: "跌",
  die4: "跌",
  die0: "跌",
  ding1: "丁",
  ding2: "丁",
  ding3: "顶",
  ding4: "定",
  ding0: "丁",
  dong1: "东",
  dong2: "东",
  dong3: "懂",
  dong4: "动",
  dong0: "东",
  du1: "都",
  du2: "毒",
  du3: "读",
  du4: "度",
  du0: "都",

  // 继续添加更多常用组合...
  lao1: "捞",
  lao2: "劳",
  lao3: "老",
  lao4: "老",
  lao0: "老",
  le1: "了",
  le2: "了",
  le3: "了",
  le4: "了",
  le0: "了",
  lei1: "雷",
  lei2: "雷",
  lei3: "累",
  lei4: "类",
  lei0: "雷",
  li1: "离",
  li2: "梨",
  li3: "里",
  li4: "力",
  li0: "里",
  lian1: "连",
  lian2: "联",
  lian3: "脸",
  lian4: "练",
  lian0: "连",
  liang1: "良",
  liang2: "凉",
  liang3: "两",
  liang4: "亮",
  liang0: "两",
  liao1: "聊",
  liao2: "了",
  liao3: "了",
  liao4: "了",
  liao0: "了",
  lie1: "列",
  lie2: "列",
  lie3: "列",
  lie4: "烈",
  lie0: "列",
  ling1: "零",
  ling2: "零",
  ling3: "领",
  ling4: "另",
  ling0: "零",
  liu1: "流",
  liu2: "留",
  liu3: "六",
  liu4: "六",
  liu0: "六",
  long1: "龙",
  long2: "龙",
  long3: "龙",
  long4: "弄",
  long0: "龙",
  lou1: "楼",
  lou2: "楼",
  lou3: "搂",
  lou4: "漏",
  lou0: "楼",
  lu1: "路",
  lu2: "路",
  lu3: "路",
  lu4: "路",
  lu0: "路",
};

function addToneToVowel(vowel, tone) {
  if (tone === 0) return vowel; // 轻声不加标记

  const toneMarks = {
    1: { a: "ā", o: "ō", e: "ē", i: "ī", u: "ū", ü: "ǖ" },
    2: { a: "á", o: "ó", e: "é", i: "í", u: "ú", ü: "ǘ" },
    3: { a: "ǎ", o: "ǒ", e: "ě", i: "ǐ", u: "ǔ", ü: "ǚ" },
    4: { a: "à", o: "ò", e: "è", i: "ì", u: "ù", ü: "ǜ" },
  };

  return toneMarks[tone][vowel] || vowel;
}

function updateToneButtonsDisplay() {
  const toneButtons = document.querySelectorAll(".tone-button");
  toneButtons.forEach((button, index) => {
    const toneExample = button.querySelector(".tone-example");
    if (toneExample) {
      toneExample.textContent = getToneDisplay(
        pinyinData.shengdiao[index].tone
      );
    }
  });
}

function selectShengmu(shengmu, button) {
  // 清除之前的选择
  document
    .querySelectorAll(".shengmu-button")
    .forEach((btn) => btn.classList.remove("selected"));

  // 选择新的声母
  button.classList.add("selected");
  currentSelection.shengmu = shengmu;
  elements.currentShengmu.textContent = shengmu;
  elements.currentShengmu.classList.add("selected");

  updatePinyinResult();
}

function selectYunmu(yunmu, button) {
  // 清除之前的选择
  document
    .querySelectorAll(".yunmu-button")
    .forEach((btn) => btn.classList.remove("selected"));

  // 选择新的韵母
  button.classList.add("selected");
  currentSelection.yunmu = yunmu;
  elements.currentYunmu.textContent = yunmu;
  elements.currentYunmu.classList.add("selected");

  // 更新声调按钮显示
  updateToneButtonsDisplay();

  updatePinyinResult();
}

function selectShengdiao(tone, button) {
  // 清除之前的选择
  document
    .querySelectorAll(".tone-button")
    .forEach((btn) => btn.classList.remove("selected"));

  // 选择新的声调
  button.classList.add("selected");
  currentSelection.shengdiao = tone;
  elements.currentShengdiao.textContent = tone.tone === 0 ? "轻" : tone.tone;
  elements.currentShengdiao.classList.add("selected");

  updatePinyinResult();
}

function updatePinyinResult() {
  clearError();

  if (!currentSelection.shengmu || !currentSelection.yunmu) {
    elements.pinyinResult.textContent = "请选择声母和韵母";
    elements.playButton.disabled = true;
    return;
  }

  // 检查拼音组合是否合法
  if (!isValidCombination(currentSelection.shengmu, currentSelection.yunmu)) {
    showError(
      `声母"${currentSelection.shengmu}"和韵母"${currentSelection.yunmu}"不能组合！`
    );
    elements.pinyinResult.textContent = "❌ 无效组合";
    elements.playButton.disabled = true;

    // 添加震动效果
    elements.pinyinResult.classList.add("shake");
    setTimeout(() => elements.pinyinResult.classList.remove("shake"), 500);
    return;
  }

  // 生成完整的拼音
  let fullPinyin = currentSelection.shengmu + currentSelection.yunmu;

  // 添加声调标记
  if (currentSelection.shengdiao) {
    fullPinyin = addToneMarks(fullPinyin, currentSelection.shengdiao.tone);
  }

  elements.pinyinResult.textContent = fullPinyin;
  elements.playButton.disabled = false;

  // 添加成功效果
  elements.pinyinResult.classList.add("bounce");
  setTimeout(() => elements.pinyinResult.classList.remove("bounce"), 1000);
}

function isValidCombination(shengmu, yunmu) {
  // 简单检查：确保不在无效组合列表中
  // 这个函数将覆盖文件中后面的复杂版本
  const invalidCombinations = [
    // j, q, x 只能与 i, ü 开头的韵母组合，不能与其他韵母组合
    ["j", "a"],
    ["j", "o"],
    ["j", "u"],
    ["j", "ai"],
    ["j", "ao"],
    ["j", "ou"],
    ["j", "an"],
    ["j", "un"],
    ["j", "ang"],
    ["j", "ong"],
    ["q", "a"],
    ["q", "o"],
    ["q", "u"],
    ["q", "ai"],
    ["q", "ao"],
    ["q", "ou"],
    ["q", "an"],
    ["q", "un"],
    ["q", "ang"],
    ["q", "ong"],
    ["x", "a"],
    ["x", "o"],
    ["x", "u"],
    ["x", "ai"],
    ["x", "ao"],
    ["x", "ou"],
    ["x", "an"],
    ["x", "un"],
    ["x", "ang"],
    ["x", "ong"],

    // zh, ch, sh, r 不能与 i, ü 开头的韵母组合
    ["zh", "i"],
    ["zh", "ü"],
    ["zh", "ie"],
    ["zh", "üe"],
    ["zh", "in"],
    ["zh", "ün"],
    ["ch", "i"],
    ["ch", "ü"],
    ["ch", "ie"],
    ["ch", "üe"],
    ["ch", "in"],
    ["ch", "ün"],
    ["sh", "i"],
    ["sh", "ü"],
    ["sh", "ie"],
    ["sh", "üe"],
    ["sh", "in"],
    ["sh", "ün"],
    ["r", "i"],
    ["r", "ü"],
    ["r", "ie"],
    ["r", "üe"],
    ["r", "in"],
    ["r", "ün"],

    // z, c, s 不能与 ü 开头的韵母组合
    ["z", "ü"],
    ["z", "üe"],
    ["z", "ün"],
    ["c", "ü"],
    ["c", "üe"],
    ["c", "ün"],
    ["s", "ü"],
    ["s", "üe"],
    ["s", "ün"],
  ];

  // 检查是否在无效组合列表中
  if (invalidCombinations.some(([s, y]) => s === shengmu && y === yunmu)) {
    return false;
  }

  return true;
}

// 检查是否为已知的有效拼音组合
function isKnownValidPinyin(pinyin) {
  // 常见的有效拼音组合列表
  const validPinyinList = [
    // 单字母韵母组合
    "ba",
    "pa",
    "ma",
    "fa",
    "da",
    "ta",
    "na",
    "la",
    "ga",
    "ka",
    "ha",
    "za",
    "ca",
    "sa",
    "zha",
    "cha",
    "sha",
    "ra",
    "bo",
    "po",
    "mo",
    "fo",
    "duo",
    "tuo",
    "nuo",
    "luo",
    "guo",
    "kuo",
    "huo",
    "zuo",
    "cuo",
    "suo",
    "zhuo",
    "chuo",
    "shuo",
    "ruo",
    "be",
    "pe",
    "me",
    "de",
    "te",
    "ne",
    "le",
    "ge",
    "ke",
    "he",
    "ze",
    "ce",
    "se",
    "zhe",
    "che",
    "she",
    "re",

    // 双字母韵母组合
    "bai",
    "pai",
    "mai",
    "dai",
    "tai",
    "nai",
    "lai",
    "gai",
    "kai",
    "hai",
    "zai",
    "cai",
    "sai",
    "zhai",
    "chai",
    "shai",
    "bei",
    "pei",
    "mei",
    "fei",
    "dei",
    "nei",
    "lei",
    "gei",
    "kei",
    "hei",
    "zei",
    "shei",
    "bao",
    "pao",
    "mao",
    "dao",
    "tao",
    "nao",
    "lao",
    "gao",
    "kao",
    "hao",
    "zao",
    "cao",
    "sao",
    "zhao",
    "chao",
    "shao",
    "rao",
    "bou",
    "pou",
    "mou",
    "fou",
    "dou",
    "tou",
    "nou",
    "lou",
    "gou",
    "kou",
    "hou",
    "zou",
    "cou",
    "sou",
    "zhou",
    "chou",
    "shou",
    "rou",

    // 鼻音韵母组合
    "ban",
    "pan",
    "man",
    "fan",
    "dan",
    "tan",
    "nan",
    "lan",
    "gan",
    "kan",
    "han",
    "zan",
    "can",
    "san",
    "zhan",
    "chan",
    "shan",
    "ran",
    "ben",
    "pen",
    "men",
    "fen",
    "den",
    "nen",
    "gen",
    "ken",
    "hen",
    "zen",
    "cen",
    "sen",
    "zhen",
    "chen",
    "shen",
    "ren",
    "bang",
    "pang",
    "mang",
    "fang",
    "dang",
    "tang",
    "nang",
    "lang",
    "gang",
    "kang",
    "hang",
    "zang",
    "cang",
    "sang",
    "zhang",
    "chang",
    "shang",
    "rang",
    "beng",
    "peng",
    "meng",
    "feng",
    "deng",
    "teng",
    "neng",
    "leng",
    "geng",
    "keng",
    "heng",
    "zeng",
    "ceng",
    "seng",
    "zheng",
    "cheng",
    "sheng",
    "reng",
    "dong",
    "tong",
    "nong",
    "long",
    "gong",
    "kong",
    "hong",
    "zong",
    "cong",
    "song",
    "zhong",
    "chong",

    // i/u/ü 系列
    "bi",
    "pi",
    "mi",
    "di",
    "ti",
    "ni",
    "li",
    "ji",
    "qi",
    "xi",
    "zhi",
    "chi",
    "shi",
    "ri",
    "zi",
    "ci",
    "si",
    "bu",
    "pu",
    "mu",
    "fu",
    "du",
    "tu",
    "nu",
    "lu",
    "gu",
    "ku",
    "hu",
    "zhu",
    "chu",
    "shu",
    "ru",
    "zu",
    "cu",
    "su",
    "ju",
    "qu",
    "xu",
    "yu",
    "lü",
    "nü",

    // 复合韵母
    "bie",
    "pie",
    "mie",
    "die",
    "tie",
    "nie",
    "lie",
    "jie",
    "qie",
    "xie",
    "yue",
    "diu",
    "niu",
    "liu",
    "jiu",
    "qiu",
    "xiu",
    "you",
    "bin",
    "pin",
    "min",
    "din",
    "tin",
    "nin",
    "lin",
    "jin",
    "qin",
    "xin",
    "yin",
    "bun",
    "pun",
    "mun",
    "dun",
    "tun",
    "nun",
    "lun",
    "gun",
    "kun",
    "hun",
    "zhun",
    "chun",
    "shun",
    "run",
    "zun",
    "cun",
    "sun",
    "yun",
    "jun",
    "qun",
    "xun",
    "bing",
    "ping",
    "ming",
    "ding",
    "ting",
    "ning",
    "ling",
    "jing",
    "qing",
    "xing",
    "ying",
  ];

  return validPinyinList.includes(pinyin);
}

function addToneMarks(pinyin, tone) {
  if (tone === 0) return pinyin; // 轻声不加标记

  // 找到主要元音并添加声调标记
  const toneMarks = {
    1: { a: "ā", o: "ō", e: "ē", i: "ī", u: "ū", ü: "ǖ" },
    2: { a: "á", o: "ó", e: "é", i: "í", u: "ú", ü: "ǘ" },
    3: { a: "ǎ", o: "ǒ", e: "ě", i: "ǐ", u: "ǔ", ü: "ǚ" },
    4: { a: "à", o: "ò", e: "è", i: "ì", u: "ù", ü: "ǜ" },
  };

  // 标调规则：a > o > e > i > u > ü
  const priority = ["a", "o", "e", "i", "u", "ü"];

  for (let vowel of priority) {
    if (pinyin.includes(vowel)) {
      const toneVowel = toneMarks[tone][vowel];
      if (toneVowel) {
        return pinyin.replace(vowel, toneVowel);
      }
      break;
    }
  }

  return pinyin;
}

// 根据拼音查找常用汉字的辅助函数
function findCommonCharacterByPinyin(pinyinText, tone) {
  // 精心选择的常用汉字库，按拼音分组，每个声调对应一个清晰易懂的汉字
  const commonCharactersByPinyin = {
    // 基础拼音
    ma: ["妈", "麻", "马", "骂", "吗"],
    da: ["搭", "达", "打", "大", "大"],
    ta: ["他", "踏", "塔", "踏", "他"],
    na: ["拿", "拿", "哪", "那", "哪"],
    la: ["拉", "来", "老", "辣", "啦"],
    ka: ["卡", "卡", "卡", "卡", "卡"],
    ga: ["嘎", "嘎", "嘎", "嘎", "嘎"],
    ha: ["哈", "哈", "哈", "哈", "哈"],
    ba: ["八", "拔", "把", "爸", "吧"],
    pa: ["趴", "爬", "爬", "怕", "趴"],
    fa: ["发", "发", "法", "发", "发"],

    // 声母 d, t, n, l
    di: ["滴", "敌", "底", "地", "地"],
    ti: ["踢", "提", "体", "替", "提"],
    ni: ["尼", "泥", "你", "逆", "你"],
    li: ["离", "梨", "里", "力", "里"],

    // 声母 g, k, h
    ge: ["哥", "哥", "哥", "个", "哥"],
    ke: ["科", "科", "可", "课", "可"],
    he: ["喝", "河", "喝", "黑", "喝"],

    // 声母 j, q, x
    ji: ["鸡", "机", "鸡", "急", "鸡"],
    qi: ["七", "其", "起", "气", "七"],
    xi: ["西", "西", "喜", "系", "西"],

    // 声母 zh, ch, sh, r
    zhi: ["知", "知", "只", "直", "知"],
    chi: ["吃", "吃", "吃", "赤", "吃"],
    shi: ["十", "十", "是", "时", "十"],
    ri: ["日", "日", "日", "日", "日"],

    // 声母 z, c, s
    zi: ["资", "字", "子", "自", "子"],
    ci: ["磁", "词", "次", "此", "次"],
    si: ["丝", "丝", "四", "死", "四"],

    // 其他常用拼音
    du: ["督", "读", "读", "度", "读"],
    tu: ["突", "图", "土", "兔", "图"],
    nu: ["奴", "奴", "怒", "奴", "奴"],
    lu: ["路", "路", "路", "路", "路"],
    gu: ["姑", "姑", "古", "故", "古"],
    ku: ["哭", "哭", "苦", "酷", "苦"],
    hu: ["呼", "胡", "虎", "护", "胡"],
    fu: ["夫", "服", "府", "父", "夫"],
    bu: ["不", "不", "不", "不", "不"],
    pu: ["扑", "扑", "普", "扑", "扑"],
    mu: ["木", "木", "母", "目", "木"],

    // 复韵母
    ai: ["哀", "挨", "矮", "爱", "爱"],
    ei: ["诶", "诶", "诶", "诶", "诶"],
    ao: ["熬", "熬", "袄", "奥", "奥"],
    ou: ["欧", "欧", "欧", "欧", "欧"],

    // 鼻韵母
    an: ["安", "安", "暗", "按", "安"],
    en: ["恩", "恩", "恩", "恩", "恩"],
    ang: ["昂", "昂", "昂", "昂", "昂"],
    eng: ["嗯", "嗯", "嗯", "嗯", "嗯"],

    // 更多拼音组合
    bai: ["白", "白", "百", "拜", "白"],
    pai: ["拍", "排", "拍", "派", "拍"],
    mai: ["埋", "买", "买", "卖", "买"],
    dai: ["呆", "呆", "带", "代", "带"],
    tai: ["台", "台", "太", "泰", "台"],
    nai: ["奶", "奶", "奶", "奈", "奶"],
    lai: ["来", "来", "来", "赖", "来"],
    gai: ["该", "该", "该", "盖", "该"],
    kai: ["开", "开", "开", "开", "开"],
    hai: ["嗨", "还", "海", "害", "嗨"],

    bao: ["包", "薄", "保", "报", "包"],
    pao: ["抛", "跑", "跑", "炮", "跑"],
    mao: ["猫", "毛", "猫", "冒", "猫"],
    dao: ["刀", "刀", "倒", "道", "刀"],
    tao: ["掏", "桃", "讨", "套", "桃"],
    nao: ["挠", "挠", "脑", "闹", "脑"],
    lao: ["捞", "劳", "老", "涝", "老"],
    gao: ["高", "高", "搞", "告", "高"],
    kao: ["靠", "烤", "考", "靠", "考"],
    hao: ["好", "好", "好", "号", "好"],

    // 更多韵母组合
    bou: ["剥", "剥", "剥", "剥", "剥"], // bou是有效拼音
    pou: ["剖", "剖", "剖", "剖", "剖"],
    mou: ["谋", "谋", "某", "谋", "谋"],
    fou: ["否", "否", "否", "否", "否"],
    dou: ["兜", "都", "斗", "豆", "都"],
    tou: ["偷", "头", "投", "透", "头"],
    nou: ["耨", "耨", "耨", "耨", "耨"],
    lou: ["搂", "楼", "搂", "漏", "楼"],
    gou: ["沟", "狗", "够", "构", "狗"],
    kou: ["抠", "口", "口", "扣", "口"],
    hou: ["侯", "猴", "吼", "后", "猴"],
    zou: ["邹", "走", "走", "奏", "走"],
    cou: ["凑", "凑", "凑", "凑", "凑"],
    sou: ["搜", "搜", "搜", "搜", "搜"],
    zhou: ["周", "舟", "肘", "宙", "周"],
    chou: ["抽", "愁", "丑", "臭", "抽"],
    shou: ["收", "手", "守", "兽", "手"],
    rou: ["柔", "肉", "揉", "肉", "肉"],

    wo: ["窝", "我", "我", "卧", "我"],
    po: ["坡", "婆", "破", "魄", "坡"],
    mo: ["摸", "模", "摸", "末", "摸"],
    fo: ["佛", "佛", "佛", "佛", "佛"],

    de: ["的", "的", "得", "德", "的"],
    te: ["特", "特", "特", "特", "特"],
    ne: ["呢", "呢", "呢", "呢", "呢"],
    le: ["勒", "了", "了", "了", "了"],

    // 其他复合韵母
    you: ["优", "由", "有", "右", "有"],
    niu: ["牛", "牛", "扭", "纽", "牛"],
    liu: ["流", "留", "六", "溜", "六"],

    // 鼻音韵母扩展
    ban: ["班", "班", "板", "半", "班"],
    pan: ["盘", "盘", "盼", "判", "盘"],
    man: ["满", "蛮", "满", "慢", "满"],
    fan: ["翻", "繁", "反", "犯", "翻"],
    dan: ["单", "单", "胆", "但", "单"],
    tan: ["摊", "弹", "坦", "叹", "摊"],
    nan: ["南", "男", "难", "南", "南"],
    lan: ["兰", "蓝", "懒", "烂", "蓝"],
    gan: ["甘", "甘", "敢", "干", "干"],
    kan: ["看", "看", "看", "看", "看"],
    han: ["寒", "寒", "汉", "喊", "汉"],

    bang: ["帮", "膀", "棒", "棒", "帮"],
    pang: ["旁", "旁", "胖", "胖", "胖"],
    mang: ["忙", "茫", "忙", "忙", "忙"],
    fang: ["方", "房", "访", "放", "方"],
    dang: ["当", "当", "党", "当", "当"],
    tang: ["汤", "糖", "躺", "烫", "汤"],
    nang: ["囊", "囊", "囊", "囊", "囊"],
    lang: ["郎", "郎", "朗", "浪", "郎"],
    gang: ["刚", "刚", "港", "钢", "刚"],
    kang: ["康", "康", "抗", "炕", "康"],
    hang: ["航", "行", "杭", "巷", "行"],

    // 更多i韵母组合
    bi: ["逼", "比", "笔", "必", "比"],
    pi: ["批", "皮", "匹", "僻", "皮"],
    mi: ["迷", "米", "米", "秘", "米"],
    fi: ["飞", "肥", "费", "废", "费"],

    // 更多u韵母组合
    zu: ["租", "足", "组", "祖", "足"],
    cu: ["粗", "粗", "醋", "簇", "粗"],
    su: ["苏", "俗", "素", "速", "素"],
    zhu: ["珠", "竹", "主", "住", "竹"],
    chu: ["出", "除", "楚", "处", "出"],
    shu: ["书", "熟", "数", "树", "书"],
    ru: ["如", "如", "乳", "入", "如"],

    // 更多ie韵母组合
    die: ["跌", "爹", "叠", "铁", "爹"],
    tie: ["贴", "铁", "铁", "贴", "铁"],
    nie: ["捏", "聂", "孽", "聂", "聂"],
    lie: ["烈", "列", "列", "烈", "列"],
    jie: ["街", "结", "姐", "借", "结"],
    qie: ["切", "茄", "且", "切", "切"],
    xie: ["些", "协", "写", "谢", "写"],

    // 更多ue韵母组合
    yue: ["约", "月", "乐", "越", "月"],
    lue: ["略", "略", "略", "略", "略"],
    nue: ["虐", "虐", "虐", "虐", "虐"],
    jue: ["觉", "觉", "决", "绝", "觉"],
    que: ["缺", "却", "雀", "确", "确"],
    xue: ["学", "雪", "学", "血", "学"],

    // 更多iu韵母组合
    diu: ["丢", "丢", "丢", "丢", "丢"],
    niu: ["牛", "牛", "扭", "纽", "牛"],
    liu: ["流", "留", "六", "溜", "六"],
    jiu: ["鸠", "久", "九", "救", "九"],
    qiu: ["求", "求", "求", "秋", "求"],
    xiu: ["休", "修", "秀", "袖", "修"],

    // 更多复合韵母
    bei: ["杯", "北", "被", "备", "被"],
    pei: ["陪", "培", "赔", "配", "培"],
    mei: ["眉", "美", "美", "妹", "美"],
    fei: ["飞", "肥", "费", "废", "费"],
    dei: ["得", "得", "得", "得", "得"],
    nei: ["内", "内", "内", "内", "内"],
    lei: ["雷", "雷", "累", "类", "雷"],
    gei: ["给", "给", "给", "给", "给"],
    kei: ["kei", "kei", "kei", "kei", "kei"],
    hei: ["嘿", "黑", "黑", "嘿", "黑"],

    // en韵母系列
    ben: ["本", "本", "本", "笨", "本"],
    pen: ["盆", "盆", "盆", "喷", "盆"],
    men: ["门", "门", "们", "闷", "门"],
    fen: ["分", "坟", "粉", "份", "分"],
    den: ["等", "等", "等", "等", "等"],
    ten: ["腾", "腾", "疼", "腾", "腾"],
    nen: ["嫩", "嫩", "嫩", "嫩", "嫩"],
    len: ["楞", "楞", "楞", "楞", "楞"],
    gen: ["跟", "跟", "跟", "跟", "跟"],
    ken: ["肯", "肯", "肯", "恳", "肯"],
    hen: ["很", "痕", "很", "恨", "很"],
    zen: ["怎", "怎", "怎", "怎", "怎"],
    cen: ["岑", "岑", "岑", "岑", "岑"],
    sen: ["森", "森", "森", "森", "森"],
    zhen: ["真", "珍", "枕", "镇", "真"],
    chen: ["陈", "尘", "沉", "趁", "陈"],
    shen: ["申", "身", "什", "深", "身"],
    ren: ["人", "人", "忍", "认", "人"],

    // in韵母系列
    bin: ["宾", "宾", "品", "殡", "宾"],
    pin: ["拼", "贫", "品", "聘", "拼"],
    min: ["民", "民", "敏", "民", "民"],
    din: ["叮", "叮", "顶", "定", "叮"],
    tin: ["听", "亭", "挺", "听", "听"],
    nin: ["您", "您", "您", "您", "您"],
    lin: ["林", "林", "吝", "林", "林"],
    jin: ["金", "今", "紧", "进", "金"],
    qin: ["亲", "琴", "寝", "亲", "亲"],
    xin: ["心", "新", "信", "心", "新"],
    yin: ["因", "银", "引", "印", "因"],

    // un韵母系列
    bun: ["奔", "奔", "本", "奔", "奔"],
    pun: ["喷", "喷", "喷", "喷", "喷"],
    mun: ["门", "门", "门", "门", "门"],
    fun: ["分", "分", "分", "分", "分"],
    dun: ["敦", "敦", "顿", "钝", "敦"],
    tun: ["吞", "屯", "臀", "褪", "屯"],
    nun: ["嫩", "嫩", "嫩", "嫩", "嫩"],
    lun: ["论", "轮", "论", "论", "轮"],
    gun: ["滚", "滚", "滚", "滚", "滚"],
    kun: ["昆", "昆", "困", "捆", "昆"],
    hun: ["昏", "浑", "混", "魂", "浑"],
    zun: ["尊", "尊", "遵", "尊", "尊"],
    cun: ["村", "村", "存", "寸", "村"],
    sun: ["孙", "孙", "笋", "损", "孙"],
    zhun: ["准", "谆", "准", "谆", "准"],
    chun: ["春", "纯", "蠢", "春", "春"],
    shun: ["顺", "顺", "顺", "瞬", "顺"],
    run: ["润", "润", "润", "润", "润"],

    // ün韵母系列
    jun: ["军", "君", "俊", "君", "君"],
    qun: ["群", "群", "群", "群", "群"],
    xun: ["寻", "询", "迅", "训", "寻"],
    yun: ["云", "云", "运", "韵", "云"],

    // 单独的o韵母
    bo: ["波", "薄", "播", "伯", "波"],
    po: ["坡", "婆", "破", "魄", "坡"],
    mo: ["摸", "模", "摸", "末", "摸"],
    fo: ["佛", "佛", "佛", "佛", "佛"],

    // 单独的e韵母
    me: ["么", "么", "么", "么", "么"],

    // 更多ang韵母
    zhang: ["张", "张", "长", "涨", "张"],
    chang: ["昌", "常", "厂", "唱", "常"],
    shang: ["商", "上", "赏", "上", "上"],
    rang: ["让", "嚷", "让", "让", "让"],
    zang: ["脏", "藏", "脏", "葬", "脏"],
    cang: ["仓", "苍", "藏", "舱", "仓"],
    sang: ["桑", "桑", "嗓", "丧", "桑"],

    // 更多eng韵母
    beng: ["崩", "绷", "绷", "蹦", "绷"],
    peng: ["朋", "彭", "捧", "碰", "朋"],
    meng: ["萌", "蒙", "猛", "梦", "蒙"],
    feng: ["风", "峰", "奉", "凤", "风"],
    deng: ["灯", "登", "等", "邓", "等"],
    teng: ["腾", "腾", "疼", "腾", "腾"],
    neng: ["能", "能", "能", "能", "能"],
    leng: ["冷", "冷", "冷", "冷", "冷"],
    geng: ["更", "更", "更", "更", "更"],
    keng: ["坑", "坑", "坑", "坑", "坑"],
    heng: ["横", "恒", "横", "横", "恒"],
    zeng: ["增", "曾", "赠", "憎", "增"],
    ceng: ["层", "层", "层", "层", "层"],
    seng: ["僧", "僧", "僧", "僧", "僧"],
    zheng: ["正", "争", "整", "证", "正"],
    cheng: ["成", "程", "诚", "称", "成"],
    sheng: ["生", "升", "省", "声", "生"],
    reng: ["仍", "仍", "仍", "仍", "仍"],

    // 更多ing韵母
    bing: ["兵", "冰", "饼", "病", "冰"],
    ping: ["平", "苹", "品", "乒", "平"],
    ming: ["明", "名", "命", "明", "明"],
    ding: ["丁", "钉", "顶", "定", "丁"],
    ting: ["听", "亭", "挺", "听", "听"],
    ning: ["宁", "凝", "拧", "宁", "宁"],
    ling: ["零", "灵", "领", "令", "零"],
    ging: ["ging", "ging", "ging", "ging", "ging"],
    king: ["king", "king", "king", "king", "king"],
    hing: ["hing", "hing", "hing", "hing", "hing"],
    jing: ["京", "精", "井", "静", "京"],
    qing: ["轻", "清", "请", "庆", "清"],
    xing: ["星", "行", "性", "兴", "星"],
    ying: ["英", "迎", "影", "应", "英"],
    zing: ["zing", "zing", "zing", "zing", "zing"],
    cing: ["cing", "cing", "cing", "cing", "cing"],
    sing: ["sing", "sing", "sing", "sing", "sing"],
    zhing: ["zhing", "zhing", "zhing", "zhing", "zhing"],
    ching: ["ching", "ching", "ching", "ching", "ching"],
    shing: ["shing", "shing", "shing", "shing", "shing"],
    ring: ["ring", "ring", "ring", "ring", "ring"],

    // 更多ong韵母
    dong: ["东", "冬", "懂", "动", "东"],
    tong: ["通", "同", "桶", "痛", "同"],
    nong: ["农", "浓", "弄", "农", "农"],
    long: ["龙", "隆", "拢", "弄", "龙"],
    gong: ["工", "公", "巩", "共", "工"],
    kong: ["空", "空", "孔", "控", "空"],
    hong: ["红", "洪", "哄", "轰", "红"],
    zong: ["宗", "宗", "总", "纵", "宗"],
    cong: ["从", "从", "从", "葱", "从"],
    song: ["松", "松", "送", "颂", "松"],
    zhong: ["中", "钟", "种", "重", "中"],
    chong: ["冲", "虫", "宠", "冲", "冲"],
    rong: ["容", "融", "荣", "绒", "容"],
    yong: ["用", "拥", "勇", "用", "用"],

    // 其他特殊组合
    chuai: ["揣", "揣", "拽", "踹", "揣"],
    shuai: ["率", "帅", "甩", "帅", "帅"],
    zhuai: ["拽", "拽", "拽", "拽", "拽"],
    guai: ["乖", "拐", "怪", "拐", "拐"],
    kuai: ["快", "快", "块", "快", "快"],
    huai: ["怀", "淮", "坏", "怀", "怀"],

    chui: ["吹", "垂", "炊", "吹", "吹"],
    shui: ["水", "谁", "睡", "税", "水"],
    zhui: ["追", "锥", "坠", "缀", "追"],
    gui: ["归", "轨", "鬼", "贵", "归"],
    kui: ["亏", "魁", "愧", "溃", "亏"],
    hui: ["灰", "回", "会", "惠", "回"],
    rui: ["瑞", "锐", "蕊", "瑞", "锐"],
    zui: ["最", "嘴", "罪", "醉", "最"],
    cui: ["催", "脆", "翠", "萃", "催"],
    sui: ["随", "岁", "碎", "遂", "随"],

    chuang: ["创", "床", "闯", "创", "创"],
    shuang: ["双", "霜", "爽", "双", "双"],
    zhuang: ["装", "庄", "撞", "状", "装"],
    guang: ["光", "广", "逛", "光", "光"],
    kuang: ["狂", "框", "况", "旷", "狂"],
    huang: ["黄", "皇", "慌", "荒", "黄"],
  };

  if (
    commonCharactersByPinyin[pinyinText] &&
    commonCharactersByPinyin[pinyinText].length > 0
  ) {
    const chars = commonCharactersByPinyin[pinyinText];

    // 根据声调选择对应的汉字
    if (tone && tone >= 1 && tone <= 4 && chars[tone - 1]) {
      return chars[tone - 1];
    }

    // 轻声或没有指定声调时，返回第一个汉字
    if (tone === 0 && chars[4]) {
      return chars[4];
    }

    // 默认返回第一个汉字
    return chars[0];
  }

  return null;
}

// 添加调试工具函数
function debugPronunciation(shengmu, yunmu, tone) {
  console.group(`🔍 发音调试: ${shengmu} + ${yunmu} (第${tone || 1}声)`);

  // 检查拼音合法性
  const isValid = isValidCombination(shengmu, yunmu);
  console.log("拼音合法性:", isValid ? "✅ 有效" : "❌ 无效");

  if (isValid) {
    // 查找汉字
    const character = getCharacterForPronunciation(shengmu, yunmu, tone);
    console.log("找到汉字:", character ? `"${character}"` : "❌ 未找到");

    if (character) {
      console.log("即将播放发音:", character);
      playPronunciation();
    }
  }

  console.groupEnd();
}

// 为开发调试添加全局函数
window.debugPinyin = debugPronunciation;

// 绑定事件处理器
function bindEvents() {
  // 播放按钮
  elements.playButton.onclick = playPronunciation;

  // 清除按钮
  elements.clearButton.onclick = clearSelection;

  // 随机按钮
  elements.randomButton.onclick = generateRandomCombination;
}

// 播放发音功能
function playPronunciation() {
  if (!currentSelection.shengmu || !currentSelection.yunmu) {
    showError("请先选择声母和韵母！");
    return;
  }

  const tone = currentSelection.shengdiao ? currentSelection.shengdiao.tone : 1;
  const character = getCharacterForPronunciation(
    currentSelection.shengmu,
    currentSelection.yunmu,
    tone
  );

  if (character) {
    // 使用TTS播放发音
    const utterance = new SpeechSynthesisUtterance(character);
    utterance.lang = "zh-CN";
    utterance.rate = 0.8;
    utterance.pitch = 1;

    speechSynthesis.speak(utterance);
  } else {
    showError("找不到对应的汉字进行发音！");
  }
}

// 清除选择
function clearSelection() {
  currentSelection = {
    shengmu: null,
    yunmu: null,
    shengdiao: null,
  };

  // 清除UI显示
  elements.currentShengmu.textContent = "_";
  elements.currentYunmu.textContent = "_";
  elements.currentShengdiao.textContent = "_";
  elements.pinyinResult.textContent = "请选择声母和韵母";
  elements.playButton.disabled = true;

  // 清除选中状态
  document.querySelectorAll(".selection-button.selected").forEach((btn) => {
    btn.classList.remove("selected");
  });
  document.querySelectorAll(".tone-button.selected").forEach((btn) => {
    btn.classList.remove("selected");
  });
  document.querySelectorAll(".pinyin-part.selected").forEach((part) => {
    part.classList.remove("selected");
  });

  clearError();
}

// 生成随机组合
function generateRandomCombination() {
  let availableShengmu = pinyinData.shengmu;
  let availableYunmu = pinyinData.yunmu;

  let attempts = 0;
  const maxAttempts = 100;

  while (attempts < maxAttempts) {
    const randomShengmu =
      availableShengmu[Math.floor(Math.random() * availableShengmu.length)];
    const randomYunmu =
      availableYunmu[Math.floor(Math.random() * availableYunmu.length)];

    if (isValidCombination(randomShengmu, randomYunmu)) {
      // 找到对应的按钮
      const shengmuButtons = document.querySelectorAll(".shengmu-button");
      const yunmuButtons = document.querySelectorAll(".yunmu-button");

      let shengmuButton = null;
      let yunmuButton = null;

      // 查找声母按钮
      for (let btn of shengmuButtons) {
        if (btn.textContent === randomShengmu) {
          shengmuButton = btn;
          break;
        }
      }

      // 查找韵母按钮
      for (let btn of yunmuButtons) {
        if (btn.textContent === randomYunmu) {
          yunmuButton = btn;
          break;
        }
      }

      // 模拟点击按钮
      if (shengmuButton) selectShengmu(randomShengmu, shengmuButton);
      if (yunmuButton) selectYunmu(randomYunmu, yunmuButton);

      // 随机选择声调
      const randomTone =
        pinyinData.shengdiao[
          Math.floor(Math.random() * pinyinData.shengdiao.length)
        ];
      const toneButtons = document.querySelectorAll(".tone-button");
      const toneIndex = pinyinData.shengdiao.findIndex(
        (t) => t.tone === randomTone.tone
      );
      if (toneButtons[toneIndex])
        selectShengdiao(randomTone, toneButtons[toneIndex]);

      break;
    }
    attempts++;
  }

  if (attempts >= maxAttempts) {
    showError("无法生成有效的随机组合！");
  }
}
// 错误显示函数
function showError(message) {
  elements.errorMessage.textContent = message;
  setTimeout(() => {
    elements.errorMessage.textContent = "";
  }, 3000);
}

function clearError() {
  elements.errorMessage.textContent = "";
}

// 获取汉字用于发音的辅助函数
function getCharacterForPronunciation(shengmu, yunmu, tone) {
  const pinyinKey = shengmu + yunmu + (tone || 1);
  return pinyinCharacterMap[pinyinKey] || null;
}

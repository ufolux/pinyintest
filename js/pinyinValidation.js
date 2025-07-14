// 完整的拼音组合验证表 - 基于标准拼音规则
const PINYIN_VALIDATION_TABLE = (() => {
  const master = [
    "",
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
    "z",
    "c",
    "s",
    "zh",
    "ch",
    "sh",
    "r",
    "y",
    "w",
  ];
  const slave = [
    "a",
    "o",
    "e",
    "i",
    "u",
    "ü",
    "ai",
    "ao",
    "an",
    "ang",
    "ou",
    "ong",
    "ei",
    "er",
    "en",
    "eng",
    "iu",
    "ie",
    "in",
    "ing",
    "ia",
    "iao",
    "ian",
    "iang",
    "iong",
    "ui",
    "un",
    "ua",
    "uai",
    "uan",
    "uang",
    "uo",
    "üe",
  ];

  const table = [
    "111111111111000111111011", // a
    "111110000000000000000011", // o
    "100101111111000111111110", // e
    "011101111000111111111110", // i
    "011111111111000111111101", // u
    "000000000000111000000010", // ü
    "111101111111000111111001", // ai
    "111101111111000111111110", // ao
    "111111111111000111111111", // an
    "111111111111000111111111", // ang
    "111111111111000111111111", // ou
    "101111111111000111111110", // ong
    "000001111111000111110110", // ei
    "111111111111000110101001", // er
    "100000000000000000000000", // en
    "111111010111000111111101", // eng
    "111111111111000111111101", // iu
    "000101011000111000000000", // ie
    "011101111000111000000000", // in
    "011100011000111000000010", // ing
    "011101111000111000000010", // ia
    "000001001000111000000000", // iao
    "011101111000111000000000", // ian
    "011101111000111000000000", // iang
    "000000011000111000000000", // iong
    "000000000000111000000000", // ui
    "000001100111000111111100", // un
    "000001111111111111111100", // ua
    "000000000111000000111100", // uai
    "000000000111000000111000", // uan
    "000001111111111111111110", // uang
    "000000000111000000111000", // uo
    "000001111111000111111100", // üe
  ];

  const validCombinations = new Set();

  for (let i = 0; i < slave.length; i++) {
    for (let j = 0; j < master.length; j++) {
      if (table[i][j] === "1") {
        const combination = master[j] + slave[i];
        validCombinations.add(combination);
      }
    }
  }

  return validCombinations;
})();

// 拼音组合验证函数 - 使用完整验证表
function isValidCombination(shengmu, yunmu) {
  // 处理空声母的情况
  const shengmuToCheck = shengmu || "";
  const combination = shengmuToCheck + yunmu;

  return PINYIN_VALIDATION_TABLE.has(combination);
}

// 获取所有有效的拼音组合（用于调试和验证）
function getAllValidPinyinCombinations() {
  return Array.from(PINYIN_VALIDATION_TABLE).sort();
}

// 验证某个组合是否存在于表中（调试用）
function debugValidation(shengmu, yunmu) {
  const combination = (shengmu || "") + yunmu;
  const isValid = PINYIN_VALIDATION_TABLE.has(combination);
  console.log(
    `检查组合: "${shengmu}" + "${yunmu}" = "${combination}" -> ${
      isValid ? "有效" : "无效"
    }`
  );
  return isValid;
}

// 显示所有有效拼音组合（调试用）
function showAllValidCombinations() {
  const combinations = getAllValidPinyinCombinations();
  console.log("所有有效的拼音组合 (" + combinations.length + " 个):");
  console.log(combinations.join(", "));
  return combinations;
}

// 按声母分组显示有效组合
function showCombinationsByInitial() {
  const master = [
    "",
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
    "z",
    "c",
    "s",
    "zh",
    "ch",
    "sh",
    "r",
    "y",
    "w",
  ];
  const combinations = getAllValidPinyinCombinations();

  master.forEach((initial) => {
    const initialCombinations = combinations.filter((combo) =>
      initial === ""
        ? !master.slice(1).some((m) => combo.startsWith(m))
        : combo.startsWith(initial)
    );
    if (initialCombinations.length > 0) {
      console.log(`${initial || "零声母"}:`, initialCombinations.join(", "));
    }
  });
}

// Enhanced validation using validPinyu.json data
const VALID_PINYIN_DATA = validPinyin; // Direct reference to the in-memory validPinyin object

// Enhanced validation using validPinyu.json
function isValidPinyinWithTones(pinyin) {
  // Check each base pinyin to see if the input matches any of its tone variations
  for (const [basePinyin, toneVariations] of Object.entries(
    VALID_PINYIN_DATA
  )) {
    if (toneVariations.includes(pinyin)) {
      return true;
    }
  }

  return false;
}

// Get all valid tone variations for a base pinyin
function getToneVariations(basePinyin) {
  return VALID_PINYIN_DATA[basePinyin] || [];
}

// Enhanced combination validation that supports both tone and non-tone validation
function isValidCombinationEnhanced(shengmu, yunmu, withTones = false) {
  const combination = (shengmu || "") + yunmu;

  if (withTones) {
    // Use validPinyu.json for tone-aware validation
    return isValidPinyinWithTones(combination);
  } else {
    // Use existing binary matrix validation for base combinations
    return isValidCombination(shengmu, yunmu);
  }
}

// Get base pinyin (without tones) from a toned pinyin
function getBasePinyin(tonedPinyin) {
  for (const [basePinyin, toneVariations] of Object.entries(
    VALID_PINYIN_DATA
  )) {
    if (toneVariations.includes(tonedPinyin)) {
      return basePinyin;
    }
  }

  return null;
}

// Get all valid pinyin with their tone variations
function getAllValidPinyinWithTones() {
  return VALID_PINYIN_DATA;
}

// Check if a pinyin combination exists and return its details
function validatePinyinDetails(input) {
  // Check if input is a valid toned pinyin
  const basePinyin = getBasePinyin(input);
  if (basePinyin) {
    return {
      isValid: true,
      input: input,
      basePinyin: basePinyin,
      toneVariations: VALID_PINYIN_DATA[basePinyin],
      hasTone: input !== basePinyin,
    };
  }

  // Check if input is a valid base pinyin
  if (VALID_PINYIN_DATA[input]) {
    return {
      isValid: true,
      input: input,
      basePinyin: input,
      toneVariations: VALID_PINYIN_DATA[input],
      hasTone: false,
    };
  }

  return {
    isValid: false,
    input: input,
    error: "Not a valid pinyin combination",
  };
}

// Initialize the enhanced validation system
function initializeEnhancedValidation() {
  console.log("Enhanced pinyin validation system initialized");
  console.log(
    `Loaded ${Object.keys(VALID_PINYIN_DATA).length} base pinyin combinations`
  );

  // Count total tone variations
  let totalVariations = 0;
  for (const variations of Object.values(VALID_PINYIN_DATA)) {
    totalVariations += variations.length;
  }
  console.log(`Total pinyin variations (with tones): ${totalVariations}`);
}

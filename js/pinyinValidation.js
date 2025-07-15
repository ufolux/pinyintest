// 拼音组合验证函数 - 使用完整验证表
function isValidCombination(shengmu, yunmu) {
  // 处理空声母的情况
  const shengmuToCheck = shengmu || "";
  const combination = shengmuToCheck + yunmu;

  return Object.hasOwn(validPinyin, combination);
}

// 获取所有有效的拼音组合（用于调试和验证）
function getAllValidPinyinCombinations() {
  return Array.from(validPinyin).sort();
}

// 验证某个组合是否存在于表中（调试用）
function debugValidation(shengmu, yunmu) {
  const combination = (shengmu || "") + yunmu;
  const isValid = Object.hasOwn(validPinyin, combination);
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

// 从validPinyin对象获取所有可用字符
function getAllAvailableCharacters() {
  const characters = new Set();

  if (validPinyin) {
    for (const [basePinyin, variations] of Object.entries(validPinyin)) {
      for (const variation of variations) {
        if (variation.char && variation.char !== basePinyin) {
          characters.add(variation.char);
        }
      }
    }
  }

  return Array.from(characters);
}

// 根据汉字查找对应的拼音信息
function getPinyinByCharacter(character) {
  if (!validPinyin || !character) return null;

  for (const [basePinyin, variations] of Object.entries(validPinyin)) {
    for (const variation of variations) {
      if (variation.char === character) {
        return {
          basePinyin: basePinyin,
          pinyin: variation.pinyin,
          char: variation.char,
        };
      }
    }
  }

  return null;
}

// 验证拼音组合并返回可用字符
function validatePinyinAndGetCharacters(shengmu, yunmu) {
  const basePinyin = (shengmu ?? "") + (yunmu ?? "");

  // 首先检查拼音组合是否有效
  const isValid = isValidCombination(shengmu, yunmu);
  if (!isValid) {
    return { valid: false, characters: [] };
  }

  // 获取对应的字符
  const characters = [];
  if (validPinyin && validPinyin[basePinyin]) {
    for (const variation of validPinyin[basePinyin]) {
      if (variation.char && variation.char !== basePinyin) {
        characters.push({
          char: variation.char,
          pinyin: variation.pinyin,
          tone: getToneFromPinyin(variation.pinyin),
        });
      }
    }
  }

  return { valid: true, characters: characters };
}

// 从带声调的拼音中提取声调数字
function getToneFromPinyin(pinyin) {
  if (!pinyin) return 0;

  // 检查声调标记
  const tone1 = /[āēīōūǖ]/;
  const tone2 = /[áéíóúǘ]/;
  const tone3 = /[ǎěǐǒǔǚ]/;
  const tone4 = /[àèìòùǜ]/;

  if (tone1.test(pinyin)) return 1;
  if (tone2.test(pinyin)) return 2;
  if (tone3.test(pinyin)) return 3;
  if (tone4.test(pinyin)) return 4;

  return 0; // 轻声或无声调
}

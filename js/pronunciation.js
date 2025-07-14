// 发音功能

// 获取汉字用于发音的辅助函数
function getCharacterForPronunciation(shengmu, yunmu, tone) {
  // 使用validPinyin对象中的字符数据
  const basePinyin = shengmu + yunmu;

  // 检查validPinyin对象中是否有这个拼音组合
  if (validPinyin && validPinyin[basePinyin]) {
    const variations = validPinyin[basePinyin];

    // 如果指定了声调，尝试找到对应声调的字符
    if (tone && tone >= 1 && tone <= 4) {
      // 根据声调查找对应的拼音变体
      const toneMarks = ["", "ā", "á", "ǎ", "à"]; // 第0个为空，1-4声调对应不同标调
      const targetPinyin = getPinyinWithTone(basePinyin, tone);

      // 在variations中查找匹配的拼音
      for (const variation of variations) {
        if (
          variation.pinyin === targetPinyin ||
          variation.pinyin.replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/g, (match) => {
            // 移除声调标记进行基础匹配
            const toneMap = {
              ā: "a",
              á: "a",
              ǎ: "a",
              à: "a",
              ē: "e",
              é: "e",
              ě: "e",
              è: "e",
              ī: "i",
              í: "i",
              ǐ: "i",
              ì: "i",
              ō: "o",
              ó: "o",
              ǒ: "o",
              ò: "o",
              ū: "u",
              ú: "u",
              ǔ: "u",
              ù: "u",
              ǖ: "ü",
              ǘ: "ü",
              ǚ: "ü",
              ǜ: "ü",
            };
            return toneMap[match] || match;
          }) === basePinyin
        ) {
          return variation.char;
        }
      }

      // 如果没找到精确匹配，返回第一个字符
      if (variations.length > 0) {
        return variations[0].char;
      }
    } else {
      // 没有指定声调，返回第一个字符
      if (variations.length > 0) {
        return variations[0].char;
      }
    }
  }

  // 如果在validPinyin中找不到，使用默认字符
  return getDefaultCharacter(shengmu, yunmu);
}

// 获取默认字符（当找不到精确匹配时）
function getDefaultCharacter(shengmu, yunmu) {
  // 一些常用的默认字符
  const defaults = {
    ba: "八",
    ma: "妈",
    da: "大",
    ta: "他",
    na: "那",
    la: "啦",
    ga: "嘎",
    ka: "卡",
    ha: "哈",
    zi: "字",
    ci: "词",
    si: "思",
    zhi: "知",
    chi: "吃",
    shi: "是",
    ri: "日",
    // ... 更多默认字符
  };

  return defaults[shengmu + yunmu] || shengmu + yunmu;
}

// 播放发音功能
function playPronunciation(shengmu, yunmu, tone) {
  if (!yunmu) {
    throw new Error("请先选择韵母！");
  }

  // 首先验证拼音组合的有效性
  const validation = validatePinyinAndGetCharacters(shengmu, yunmu);
  if (!validation.valid) {
    throw new Error(`无效的拼音组合: ${shengmu} + ${yunmu}`);
  }

  let character = null;

  // 如果有指定声调，尝试找到对应声调的字符
  if (tone && tone >= 1 && tone <= 4) {
    const matchingChar = validation.characters.find((c) => c.tone === tone);
    if (matchingChar) {
      character = matchingChar.char;
    }
  }

  // 如果没有找到指定声调的字符，使用第一个可用字符
  if (!character && validation.characters.length > 0) {
    character = validation.characters[0].char;
  }

  // 如果还是没有字符，使用备用方法
  if (!character) {
    character = getCharacterForPronunciation(shengmu, yunmu, tone);
  }

  if (character) {
    // 使用TTS播放发音
    const utterance = new SpeechSynthesisUtterance(character);
    utterance.lang = "zh-CN";
    utterance.rate = 0.8;
    utterance.pitch = 1;

    speechSynthesis.speak(utterance);

    // 返回播放的字符信息
    return {
      success: true,
      character: character,
      pinyin: shengmu + yunmu,
      tone: tone || 1,
    };
  } else {
    throw new Error("找不到对应的汉字进行发音！");
  }
}

// 调试发音功能
function debugPronunciation(shengmu, yunmu, tone) {
  console.group(`🔍 发音调试: ${shengmu} + ${yunmu} (第${tone || "未指定"}声)`);

  // 检查拼音合法性并获取字符
  const validation = validatePinyinAndGetCharacters(shengmu, yunmu);
  console.log("拼音合法性:", validation.valid ? "✅ 有效" : "❌ 无效");

  if (validation.valid) {
    console.log("可用字符:", validation.characters.length);

    // 显示所有可用字符
    if (validation.characters.length > 0) {
      console.table(
        validation.characters.map((c) => ({
          字符: c.char,
          拼音: c.pinyin,
          声调: c.tone,
        }))
      );

      // 尝试播放发音
      try {
        const result = playPronunciation(shengmu, yunmu, tone);
        console.log("🔊 播放成功:", result);
      } catch (error) {
        console.error("❌ 播放失败:", error.message);
      }
    } else {
      console.log("⚠️ 没有找到对应的汉字");
    }
  }

  console.groupEnd();
}

// 获取拼音组合的所有字符选项
function getPinyinCharacterOptions(shengmu, yunmu) {
  if (!shengmu || !yunmu) {
    return [];
  }

  const validation = validatePinyinAndGetCharacters(shengmu, yunmu);
  return validation.valid ? validation.characters : [];
}

// 根据拼音和声调生成带声调标记的拼音
function getPinyinWithTone(basePinyin, tone) {
  if (!tone || tone < 1 || tone > 4) {
    return basePinyin;
  }

  // 声调标记映射
  const toneMarks = {
    1: { a: "ā", e: "ē", i: "ī", o: "ō", u: "ū", ü: "ǖ" },
    2: { a: "á", e: "é", i: "í", o: "ó", u: "ú", ü: "ǘ" },
    3: { a: "ǎ", e: "ě", i: "ǐ", o: "ǒ", u: "ǔ", ü: "ǚ" },
    4: { a: "à", e: "è", i: "ì", o: "ò", u: "ù", ü: "ǜ" },
  };

  const marks = toneMarks[tone];
  if (!marks) return basePinyin;

  // 声调标记优先级：a > o > e > i > u > ü
  const priorities = ["a", "o", "e", "i", "u", "ü"];

  for (const vowel of priorities) {
    if (basePinyin.includes(vowel) && marks[vowel]) {
      return basePinyin.replace(vowel, marks[vowel]);
    }
  }

  return basePinyin;
}

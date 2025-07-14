// 声调处理工具函数

// 获取声调的显示形式
function getToneDisplay(toneNumber, currentYunmu = null) {
  // 如果已选择韵母，显示对应的带声调韵母
  if (currentYunmu) {
    return addToneMarks(currentYunmu, toneNumber);
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

// 获取韵母中的主要元音
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

// 为单个元音添加声调
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

// 为完整拼音添加声调标记
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

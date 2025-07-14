// 发音功能

// 获取汉字用于发音的辅助函数
function getCharacterForPronunciation(shengmu, yunmu, tone) {
  // 简单的拼音到汉字映射 - 这里可以扩展为更完整的字典
  const pinyinCharacterMap = {
    // 基本示例字符，实际应用中需要更完整的字典
    ba1: "八",
    ba2: "拔",
    ba3: "把",
    ba4: "爸",
    ma1: "妈",
    ma2: "麻",
    ma3: "马",
    ma4: "骂",
    da1: "搭",
    da2: "达",
    da3: "打",
    da4: "大",
    // ... 更多映射
  };

  const pinyinKey = shengmu + yunmu + (tone || 1);
  return pinyinCharacterMap[pinyinKey] || getDefaultCharacter(shengmu, yunmu);
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
  if (!shengmu || !yunmu) {
    throw new Error("请先选择声母和韵母！");
  }

  const character = getCharacterForPronunciation(shengmu, yunmu, tone);

  if (character) {
    // 使用TTS播放发音
    const utterance = new SpeechSynthesisUtterance(character);
    utterance.lang = "zh-CN";
    utterance.rate = 0.8;
    utterance.pitch = 1;

    speechSynthesis.speak(utterance);
    return true;
  } else {
    throw new Error("找不到对应的汉字进行发音！");
  }
}

// 调试发音功能
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
      try {
        playPronunciation(shengmu, yunmu, tone);
      } catch (error) {
        console.error("播放失败:", error.message);
      }
    }
  }

  console.groupEnd();
}

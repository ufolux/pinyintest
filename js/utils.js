// 工具函数和调试功能

// 错误显示函数
function showError(message) {
  if (elements.errorMessage) {
    elements.errorMessage.textContent = message;
    setTimeout(() => {
      elements.errorMessage.textContent = "";
    }, 3000);
  } else {
    console.error(message);
  }
}

// 清除错误消息
function clearError() {
  if (elements.errorMessage) {
    elements.errorMessage.textContent = "";
  }
}

// 检查是否为已知的有效拼音组合（备用验证方法）
function isKnownValidPinyin(pinyin) {
  // 常见的有效拼音组合列表（备用参考）
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

// 运行测试验证
function runValidationTests() {
  console.log("=== 拼音验证测试 (字符驱动) ===");

  // 测试字符数据提取
  console.log("字符数据提取测试:");
  const validYunmu = getValidYunmuFromCharacterData();
  const validShengmu = getValidShengmuFromCharacterData();
  console.log(`有效韵母数量: ${validYunmu.length}`, validYunmu);
  console.log(`有效声母数量: ${validShengmu.length}`, validShengmu);

  // 测试有效组合
  console.log("有效组合测试:");
  console.log("ba:", hasCharacterForCombination("b", "a")); // 应该是 true
  console.log("ma:", hasCharacterForCombination("m", "a")); // 应该是 true
  console.log("zhang:", hasCharacterForCombination("zh", "ang")); // 应该是 true
  console.log("zi:", hasCharacterForCombination("z", "i")); // 应该是 true

  // 测试无效组合（不在validPinyin中的）
  console.log("无效组合测试:");
  console.log("j + a:", hasCharacterForCombination("j", "a")); // 应该是 false
  console.log("zh + i:", hasCharacterForCombination("zh", "i")); // 应该是 false
  console.log("z + ü:", hasCharacterForCombination("z", "ü")); // 应该是 false

  // 测试零声母组合
  console.log("零声母组合测试:");
  console.log("a:", hasCharacterForCombination("", "a")); // 应该是 true
  console.log("o:", hasCharacterForCombination("", "o")); // 应该是 true
  console.log("e:", hasCharacterForCombination("", "e")); // 应该是 true

  // 统计字符数据
  if (validPinyin) {
    const totalCombinations = Object.keys(validPinyin).length;
    const totalCharacters = getAllAvailableCharacters().length;
    console.log(`validPinyin中有 ${totalCombinations} 个拼音组合`);
    console.log(`总共有 ${totalCharacters} 个不同的汉字`);
  }

  console.log("=== 测试完成 ===");
}

// 从validPinyin数据中提取所有有效的韵母
function getValidYunmuFromCharacterData() {
  console.log("🔍 getValidYunmuFromCharacterData 开始执行");

  const validYunmu = new Set();

  if (!validPinyin) {
    console.error("❌ validPinyin 对象不存在");
    return pinyinData.yunmu; // 降级返回原始列表
  }

  console.log(
    "✅ validPinyin 对象存在，键的数量:",
    Object.keys(validPinyin).length
  );

  // 遍历validPinyin对象的所有键
  for (const basePinyin of Object.keys(validPinyin)) {
    // 检查这个拼音组合是否有对应的汉字
    const variations = validPinyin[basePinyin];
    if (variations && variations.length > 0) {
      // 从每个拼音组合中提取韵母
      const yunmu = extractYunmuFromPinyin(basePinyin);
      if (yunmu) {
        validYunmu.add(yunmu);
        // 调试：记录前几个提取的韵母
        if (validYunmu.size <= 5) {
          console.log(`从 "${basePinyin}" 提取韵母: "${yunmu}"`);
        }
      }
    }
  }

  console.log("提取到的所有唯一韵母:", Array.from(validYunmu));

  // 转换为数组并按照原始顺序排序
  const originalYunmuOrder = pinyinData.yunmu;
  const validYunmuArray = originalYunmuOrder.filter((yunmu) =>
    validYunmu.has(yunmu)
  );

  console.log("按原始顺序排序后的有效韵母:", validYunmuArray);
  return validYunmuArray;
}

// 从拼音组合中提取韵母
function extractYunmuFromPinyin(pinyin) {
  if (!pinyin) return null;

  // 所有可能的声母（包括复合声母）
  const shengmuList = [
    "zh",
    "ch",
    "sh",
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
    "r",
  ];

  // 按长度排序，先匹配长的声母
  shengmuList.sort((a, b) => b.length - a.length);

  let extractedYunmu = null;

  for (const shengmu of shengmuList) {
    if (pinyin.startsWith(shengmu)) {
      extractedYunmu = pinyin.substring(shengmu.length);
      break;
    }
  }

  // 如果没有匹配的声母，说明是零声母，整个就是韵母
  if (extractedYunmu === null) {
    extractedYunmu = pinyin;
  }

  // 处理ü的特殊情况
  // validPinyin数据中使用简化表示，需要转换回标准拼音
  if (extractedYunmu) {
    extractedYunmu = normalizeYunmu(extractedYunmu, pinyin);
  }

  // 调试：记录一些提取结果
  if (Math.random() < 0.05) {
    // 5%的概率记录，避免过多日志
    console.log(`提取: "${pinyin}" → 韵母:"${extractedYunmu}"`);
  }

  return extractedYunmu || null;
}

// 规范化韵母，处理ü的特殊表示
function normalizeYunmu(yunmu, originalPinyin) {
  // 处理j、q、x声母的特殊情况
  // 在validPinyin中，j、q、x + ü 系列韵母被简化表示
  const firstChar = originalPinyin.charAt(0);

  if (["j", "q", "x"].includes(firstChar)) {
    // j、q、x后面的u实际上是ü
    if (yunmu === "u") {
      return "ü";
    }
    // j、q、x后面的ue实际上是üe
    if (yunmu === "ue") {
      return "üe";
    }
    // j、q、x后面的un实际上是ün，但pinyinData中没有ün，所以保持un
    // j、q、x后面的其他韵母保持不变
  }

  // 处理l、n声母的特殊情况
  if (["l", "n"].includes(firstChar)) {
    // l、n后面的u可能是ü
    if (yunmu === "u" && ["lu", "nu"].includes(originalPinyin)) {
      return "ü";
    }
  }

  return yunmu;
}

// 获取有效的声母列表（基于字符数据）
function getValidShengmuFromCharacterData() {
  const validShengmu = new Set();

  if (validPinyin) {
    for (const basePinyin of Object.keys(validPinyin)) {
      const variations = validPinyin[basePinyin];
      if (variations && variations.length > 0) {
        const shengmu = extractShengmuFromPinyin(basePinyin);
        if (shengmu) {
          validShengmu.add(shengmu);
        }
      }
    }
  }

  // 转换为数组并按照原始顺序排序
  const originalShengmuOrder = pinyinData.shengmu;
  const validShengmuArray = originalShengmuOrder.filter((shengmu) =>
    validShengmu.has(shengmu)
  );

  return validShengmuArray;
}

// 从拼音组合中提取声母
function extractShengmuFromPinyin(pinyin) {
  if (!pinyin) return null;

  const shengmuList = [
    "zh",
    "ch",
    "sh",
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
    "r",
  ];

  // 按长度排序，先匹配长的声母
  shengmuList.sort((a, b) => b.length - a.length);

  for (const shengmu of shengmuList) {
    if (pinyin.startsWith(shengmu)) {
      return shengmu;
    }
  }

  // 如果没有匹配的声母，返回空字符串表示零声母
  return "";
}

// 检查特定的声母韵母组合是否在字符数据中存在
function hasCharacterForCombination(shengmu, yunmu) {
  if (!validPinyin) return false;

  const basePinyin = shengmu + yunmu;
  return (
    validPinyin.hasOwnProperty(basePinyin) &&
    validPinyin[basePinyin] &&
    validPinyin[basePinyin].length > 0
  );
}

// 显示所有可用的字符组合（调试用）
function showAvailableCharacterCombinations() {
  console.log("=== 可用字符组合统计 ===");

  if (!validPinyin) {
    console.log("❌ validPinyin 数据未加载");
    return;
  }

  const combinations = Object.keys(validPinyin).sort();
  const validYunmu = getValidYunmuFromCharacterData();
  const validShengmu = getValidShengmuFromCharacterData();

  console.log(`📊 统计信息:`);
  console.log(`   拼音组合总数: ${combinations.length}`);
  console.log(`   有效韵母数: ${validYunmu.length}`);
  console.log(`   有效声母数: ${validShengmu.length}`);
  console.log(`   汉字总数: ${getAllAvailableCharacters().length}`);

  console.log(`\n📝 有效韵母列表:`);
  console.log(validYunmu.join(", "));

  console.log(`\n📝 有效声母列表:`);
  console.log(validShengmu.join(", "));

  // 按韵母分组显示组合
  console.log(`\n📋 按韵母分组的拼音组合:`);
  validYunmu.forEach((yunmu) => {
    const combinationsWithYunmu = combinations.filter((combo) => {
      const extractedYunmu = extractYunmuFromPinyin(combo);
      return extractedYunmu === yunmu;
    });

    if (combinationsWithYunmu.length > 0) {
      console.log(
        `   ${yunmu}: ${combinationsWithYunmu.join(", ")} (${
          combinationsWithYunmu.length
        }个)`
      );
    }
  });

  console.log("=== 统计完成 ===");
}

// 检查特定韵母有哪些组合
function showCombinationsForYunmu(yunmu) {
  console.log(`=== 韵母 "${yunmu}" 的所有组合 ===`);

  if (!validPinyin) {
    console.log("❌ validPinyin 数据未加载");
    return;
  }

  const combinations = Object.keys(validPinyin).filter((combo) => {
    const extractedYunmu = extractYunmuFromPinyin(combo);
    return extractedYunmu === yunmu;
  });

  if (combinations.length === 0) {
    console.log(`❌ 韵母 "${yunmu}" 没有找到任何组合`);
    return;
  }

  console.log(`找到 ${combinations.length} 个组合:`);
  combinations.forEach((combo) => {
    const shengmu = extractShengmuFromPinyin(combo);
    const chars = validPinyin[combo].map((v) => v.char).join(", ");
    console.log(`   ${shengmu || "(零声母)"} + ${yunmu} = ${combo}: ${chars}`);
  });

  console.log("=== 完成 ===");
}

// 测试函数 - 可以在浏览器控制台中调用
function testYunmuExtraction() {
  console.log("=== 测试韵母提取功能 ===");

  // 1. 检查依赖
  console.log("1. 检查依赖:");
  console.log(
    "   validPinyin 存在:",
    typeof validPinyin !== "undefined" && validPinyin
  );
  console.log(
    "   pinyinData 存在:",
    typeof pinyinData !== "undefined" && pinyinData
  );

  if (!validPinyin) {
    console.error("❌ validPinyin 不存在，无法继续测试");
    return;
  }

  // 2. 测试几个具体的提取
  console.log("\n2. 测试具体的韵母提取:");
  const testCases = [
    "a",
    "ba",
    "bai",
    "ban",
    "zhang",
    "zhuang",
    "lu",
    "nu",
    "jue",
    "que",
    "xue",
  ];
  testCases.forEach((pinyin) => {
    if (validPinyin[pinyin]) {
      const yunmu = extractYunmuFromPinyin(pinyin);
      console.log(`   ${pinyin} → ${yunmu} (在validPinyin中)`);
    } else {
      console.log(`   ${pinyin} → 不在validPinyin中`);
    }
  });

  // 3. 运行完整提取
  console.log("\n3. 运行完整提取:");
  try {
    const validYunmu = getValidYunmuFromCharacterData();
    console.log("   成功提取有效韵母:", validYunmu);
    console.log("   数量:", validYunmu.length);

    // 4. 与原始列表对比
    console.log("\n4. 与原始列表对比:");
    console.log("   原始韵母数量:", pinyinData.yunmu.length);
    console.log("   有效韵母数量:", validYunmu.length);

    const removed = pinyinData.yunmu.filter((y) => !validYunmu.includes(y));
    if (removed.length > 0) {
      console.log("   被过滤的韵母:", removed);
    } else {
      console.log("   没有韵母被过滤");
    }
  } catch (error) {
    console.error("❌ 提取失败:", error);
  }

  console.log("=== 测试完成 ===");
}

// 全面测试所有韵母是否都能在validPinyin中找到
function testAllYunmuCoverage() {
  console.log("=== 测试所有韵母覆盖情况 ===");

  if (!validPinyin || !pinyinData) {
    console.error("❌ 缺少必要的数据");
    return;
  }

  const allValidKeys = Object.keys(validPinyin);
  const extractedYunmu = new Set();

  // 从所有validPinyin键中提取韵母
  allValidKeys.forEach((key) => {
    const yunmu = extractYunmuFromPinyin(key);
    if (yunmu) {
      extractedYunmu.add(yunmu);
    }
  });

  console.log(
    "从validPinyin提取到的所有韵母:",
    Array.from(extractedYunmu).sort()
  );
  console.log("pinyinData中的韵母:", pinyinData.yunmu);

  // 检查覆盖情况
  const covered = [];
  const missing = [];

  pinyinData.yunmu.forEach((yunmu) => {
    if (extractedYunmu.has(yunmu)) {
      covered.push(yunmu);
    } else {
      missing.push(yunmu);
    }
  });

  console.log(`\n覆盖情况:`);
  console.log(
    `✅ 已覆盖 (${covered.length}/${pinyinData.yunmu.length}):`,
    covered
  );
  if (missing.length > 0) {
    console.log(`❌ 缺失 (${missing.length}个):`, missing);

    // 对于缺失的韵母，尝试找一些可能的组合
    missing.forEach((yunmu) => {
      console.log(`\n寻找包含韵母 "${yunmu}" 的可能组合:`);
      const possibleKeys = allValidKeys.filter((key) => key.includes(yunmu));
      if (possibleKeys.length > 0) {
        console.log(
          `  可能的键: ${possibleKeys.slice(0, 5).join(", ")}${
            possibleKeys.length > 5 ? "..." : ""
          }`
        );
      } else {
        console.log(`  没有找到包含 "${yunmu}" 的键`);
      }
    });
  }

  console.log("=== 覆盖测试完成 ===");
}

// 将测试函数添加到全局作用域
if (typeof window !== "undefined") {
  window.testYunmuExtraction = testYunmuExtraction;
  window.testAllYunmuCoverage = testAllYunmuCoverage;
}

// 为开发调试添加全局函数
window.showAvailableCharacterCombinations = showAvailableCharacterCombinations;
window.showCombinationsForYunmu = showCombinationsForYunmu;

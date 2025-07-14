// Test script to demonstrate enhanced pinyin validation using validPinyu.json
// Run this in the browser console after loading the enhanced validation system

function runValidationTests() {
  console.log("🚀 Starting Enhanced Pinyin Validation Tests");
  console.log("=".repeat(50));

  // Initialize the system
  initializeEnhancedValidation();

  console.log("\n📊 System Statistics:");
  const validPinyinData = getAllValidPinyinWithTones();
  const basePinyinCount = Object.keys(validPinyinData || {}).length;
  let totalVariations = 0;
  if (validPinyinData) {
    for (const variations of Object.values(validPinyinData)) {
      totalVariations += variations.length;
    }
  }
  console.log(`   Base pinyin combinations: ${basePinyinCount}`);
  console.log(`   Total variations with tones: ${totalVariations}`);
  console.log(
    `   Matrix combinations: ${getAllValidPinyinCombinations().length}`
  );

  console.log("\n🔍 Test 1: Single Pinyin Validation");
  console.log("-".repeat(30));

  const testPinyins = [
    "ma",
    "má",
    "mǎ",
    "mà",
    "zhang",
    "zhāng",
    "ai",
    "xyz",
    "lv",
    "lǚ",
  ];

  for (const pinyin of testPinyins) {
    const result = validatePinyinDetails(pinyin);
    if (result.isValid) {
      console.log(
        `✅ ${pinyin} -> Base: ${
          result.basePinyin
        }, Variations: [${result.toneVariations.join(", ")}]`
      );
    } else {
      console.log(`❌ ${pinyin} -> Invalid`);
    }
  }

  console.log("\n🧩 Test 2: Combination Validation");
  console.log("-".repeat(30));

  const testCombinations = [
    ["b", "a"], // ba - valid
    ["zh", "ang"], // zhang - valid
    ["j", "a"], // ja - invalid
    ["x", "ü"], // xü - valid (but should be xv in input)
    ["", "a"], // a - valid (zero initial)
    ["ch", "i"], // chi - valid
    ["zh", "i"], // zhi - valid but different from chi
  ];

  for (const [shengmu, yunmu] of testCombinations) {
    const combination = (shengmu || "∅") + yunmu;
    const matrixValid = isValidCombination(shengmu, yunmu);
    const enhancedValid = isValidCombinationEnhanced(shengmu, yunmu, true);

    console.log(
      `${combination}: Matrix=${matrixValid ? "✅" : "❌"}, Enhanced=${
        enhancedValid ? "✅" : "❌"
      }`
    );

    if (enhancedValid) {
      const fullCombination = (shengmu || "") + yunmu;
      const details = validatePinyinDetails(fullCombination);
      if (details.isValid) {
        console.log(
          `   Tone variations: [${details.toneVariations.join(", ")}]`
        );
      }
    }
  }

  console.log("\n🎵 Test 3: Tone Variations Lookup");
  console.log("-".repeat(30));

  const basePinyinsToTest = ["ma", "zhang", "ai", "chu", "lv", "er"];

  for (const basePinyin of basePinyinsToTest) {
    const variations = getToneVariations(basePinyin);
    if (variations.length > 0) {
      console.log(
        `${basePinyin} -> [${variations.join(", ")}] (${
          variations.length
        } variations)`
      );
    } else {
      console.log(`${basePinyin} -> No variations found`);
    }
  }

  console.log("\n🎯 Test 4: Comprehensive Validation Comparison");
  console.log("-".repeat(30));

  // Compare the two validation methods
  const matrixCombinations = new Set(getAllValidPinyinCombinations());
  const jsonBasePinyins = new Set(Object.keys(validPinyinData || {}));

  console.log(`Matrix has ${matrixCombinations.size} combinations`);
  console.log(`JSON has ${jsonBasePinyins.size} base combinations`);

  // Find combinations in matrix but not in JSON
  const onlyInMatrix = [];
  const onlyInJson = [];

  for (const combo of matrixCombinations) {
    if (!jsonBasePinyins.has(combo)) {
      onlyInMatrix.push(combo);
    }
  }

  for (const combo of jsonBasePinyins) {
    if (!matrixCombinations.has(combo)) {
      onlyInJson.push(combo);
    }
  }

  console.log(
    `Only in matrix (${onlyInMatrix.length}):`,
    onlyInMatrix.slice(0, 10).join(", "),
    onlyInMatrix.length > 10 ? "..." : ""
  );
  console.log(
    `Only in JSON (${onlyInJson.length}):`,
    onlyInJson.slice(0, 10).join(", "),
    onlyInJson.length > 10 ? "..." : ""
  );

  console.log("\n✅ Enhanced Pinyin Validation Tests Complete!");
  console.log("=".repeat(50));
}

// Utility function to test specific combinations
function testCombination(shengmu, yunmu) {
  const combination = (shengmu || "") + yunmu;
  console.log(
    `\n🔍 Testing: "${shengmu || "∅"}" + "${yunmu}" = "${combination}"`
  );

  const matrixResult = isValidCombination(shengmu, yunmu);
  const enhancedResult = isValidCombinationEnhanced(shengmu, yunmu, true);

  console.log(`Matrix validation: ${matrixResult ? "✅" : "❌"}`);
  console.log(`Enhanced validation: ${enhancedResult ? "✅" : "❌"}`);

  if (enhancedResult) {
    const details = validatePinyinDetails(combination);
    if (details.isValid) {
      console.log(`Tone variations: [${details.toneVariations.join(", ")}]`);
    }
  }

  return { matrix: matrixResult, enhanced: enhancedResult };
}

// Utility function to find all tone variations for a specific base pinyin
function findToneVariations(basePinyin) {
  const variations = getToneVariations(basePinyin);

  console.log(`\n🎵 Tone variations for "${basePinyin}":`);
  if (variations.length > 0) {
    variations.forEach((variation, index) => {
      console.log(`   ${index + 1}. ${variation}`);
    });
  } else {
    console.log("   No variations found");
  }

  return variations;
}

// Export functions for console use
window.runValidationTests = runValidationTests;
window.testCombination = testCombination;
window.findToneVariations = findToneVariations;

console.log("🎯 Enhanced Pinyin Validation Test Utils Loaded");
console.log("Available functions:");
console.log("  - runValidationTests(): Run comprehensive tests");
console.log("  - testCombination(shengmu, yunmu): Test specific combination");
console.log("  - findToneVariations(basePinyin): Find tone variations");

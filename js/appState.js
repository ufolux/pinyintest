// 应用状态管理

// 当前选择的拼音组合
let currentSelection = {
  shengmu: null,
  yunmu: null,
  shengdiao: null,
};

// DOM 元素引用
let elements = {};

// 初始化DOM元素引用
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

// 选择声母
function selectShengmu(shengmu, button) {
  // 清除之前的选择
  clearButtonSelection(".shengmu-button");

  // 选择新的声母
  setButtonSelected(button);
  currentSelection.shengmu = shengmu;
  elements.currentShengmu.textContent = shengmu;
  elements.currentShengmu.classList.add("selected");

  updatePinyinResult();
}

// 选择韵母
function selectYunmu(yunmu, button) {
  // 清除之前的选择
  clearButtonSelection(".yunmu-button");

  // 选择新的韵母
  setButtonSelected(button);
  currentSelection.yunmu = yunmu;
  elements.currentYunmu.textContent = yunmu;
  elements.currentYunmu.classList.add("selected");

  // 更新声调按钮显示
  updateToneButtonsDisplay(yunmu);

  updatePinyinResult();
}

// 选择声调
function selectShengdiao(tone, button) {
  // 清除之前的选择
  clearButtonSelection(".tone-button");

  // 选择新的声调
  setButtonSelected(button);
  currentSelection.shengdiao = tone;
  elements.currentShengdiao.textContent = tone.tone === 0 ? "轻" : tone.tone;
  elements.currentShengdiao.classList.add("selected");

  updatePinyinResult();
}

// 更新拼音结果显示
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
  clearButtonSelection(".selection-button.selected");
  clearButtonSelection(".tone-button.selected");
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

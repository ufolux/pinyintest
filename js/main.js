// 主应用入口文件

// 初始化应用
function initializeApp() {
  initializeElements();
  generateButtons();
  bindEvents();

  // 初始化增强拼音验证系统
  try {
    initializeEnhancedValidation();
    console.log("✅ Enhanced pinyin validation system initialized");
  } catch (error) {
    console.warn(
      "⚠️ Failed to initialize enhanced validation, using fallback:",
      error.message
    );
  }

  runValidationTests(); // 运行测试验证
}

// 生成所有按钮
function generateButtons() {
  generateShengmuButtons(elements.shengmuGrid, selectShengmu);
  generateYunmuButtons(elements.yunmuGrid, selectYunmu);
  generateShengdiaoButtons(elements.shengdiaoGrid, selectShengdiao);
}

// 绑定事件处理器
function bindEvents() {
  // 播放按钮
  elements.playButton.onclick = () => {
    try {
      playPronunciation(
        currentSelection.shengmu,
        currentSelection.yunmu,
        currentSelection.shengdiao ? currentSelection.shengdiao.tone : 1
      );
    } catch (error) {
      showError(error.message);
    }
  };

  // 清除按钮
  elements.clearButton.onclick = clearSelection;

  // 随机按钮
  elements.randomButton.onclick = generateRandomCombination;
}

// 为开发调试添加全局函数
window.debugPinyin = debugPronunciation;
window.showValidCombinations = showAllValidCombinations;
window.showCombinationsByInitial = showCombinationsByInitial;

// 页面加载完成后初始化
document.addEventListener("DOMContentLoaded", initializeApp);

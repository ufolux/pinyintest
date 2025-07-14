// UI组件生成器

// 生成声母按钮
function generateShengmuButtons(container, onSelect) {
  container.innerHTML = "";

  // 调试信息
  console.log("🔍 generateShengmuButtons 开始");

  // 使用从字符数据中提取的有效声母
  let validShengmu;
  try {
    validShengmu = getValidShengmuFromCharacterData();
    console.log("✅ 成功提取有效声母:", validShengmu);
  } catch (error) {
    console.error("❌ 提取有效声母失败:", error);
    // 降级到使用原始声母列表
    validShengmu = pinyinData.shengmu;
    console.log("⚠️ 降级使用原始声母列表");
  }

  validShengmu.forEach((shengmu) => {
    const button = document.createElement("button");
    button.className = "selection-button shengmu-button";
    button.textContent = shengmu;
    button.onclick = () => onSelect(shengmu, button);
    container.appendChild(button);
  });

  // 在控制台显示声母信息（开发调试用）
  console.log(`生成了 ${validShengmu.length} 个有效声母:`, validShengmu);
}

// 生成韵母按钮
function generateYunmuButtons(container, onSelect) {
  container.innerHTML = "";

  // 调试信息
  console.log("🔍 generateYunmuButtons 开始");
  console.log(
    "validPinyin 是否存在:",
    typeof validPinyin !== "undefined" && validPinyin
  );
  console.log(
    "getValidYunmuFromCharacterData 函数是否存在:",
    typeof getValidYunmuFromCharacterData === "function"
  );

  // 使用从字符数据中提取的有效韵母
  let validYunmu;
  try {
    validYunmu = getValidYunmuFromCharacterData();
    console.log("✅ 成功提取有效韵母:", validYunmu);
  } catch (error) {
    console.error("❌ 提取有效韵母失败:", error);
    // 降级到使用原始韵母列表
    validYunmu = pinyinData.yunmu;
    console.log("⚠️ 降级使用原始韵母列表");
  }

  validYunmu.forEach((yunmu) => {
    const button = document.createElement("button");
    button.className = "selection-button yunmu-button";
    button.textContent = yunmu;
    button.onclick = () => onSelect(yunmu, button);
    container.appendChild(button);
  });

  // 在控制台显示韵母信息（开发调试用）
  console.log(`生成了 ${validYunmu.length} 个有效韵母:`, validYunmu);
}

// 生成声调按钮
function generateShengdiaoButtons(container, onSelect, currentYunmu = null) {
  container.innerHTML = "";

  pinyinData.shengdiao.forEach((tone) => {
    const button = document.createElement("button");
    button.className = "tone-button";
    button.innerHTML = `
            <div class="tone-example">${getToneDisplay(
              tone.tone,
              currentYunmu
            )}</div>
            <div class="tone-name">${tone.name}</div>
        `;
    button.onclick = () => onSelect(tone, button);
    container.appendChild(button);
  });
}

// 更新声调按钮显示
function updateToneButtonsDisplay(currentYunmu) {
  const toneButtons = document.querySelectorAll(".tone-button");
  toneButtons.forEach((button, index) => {
    const toneExample = button.querySelector(".tone-example");
    if (toneExample) {
      toneExample.textContent = getToneDisplay(
        pinyinData.shengdiao[index].tone,
        currentYunmu
      );
    }
  });
}

// 清除按钮选中状态
function clearButtonSelection(selector) {
  document
    .querySelectorAll(selector)
    .forEach((btn) => btn.classList.remove("selected"));
}

// 设置按钮选中状态
function setButtonSelected(button) {
  button.classList.add("selected");
}

// 显示拼音对应的汉字信息
function displayCharacterInfo(shengmu, yunmu, tone) {
  const characterInfoElement = document.getElementById("character-info");
  if (!characterInfoElement) {
    // 如果UI中没有字符信息显示区域，就跳过
    return;
  }

  if ((!shengmu && !yunmu) || !isValidCombination(shengmu, yunmu)) {
    characterInfoElement.innerHTML =
      '<p class="info-placeholder">请选择声母和韵母查看对应汉字</p>';
    return;
  }

  const validation = validatePinyinAndGetCharacters(shengmu, yunmu);

  if (!validation.valid) {
    characterInfoElement.innerHTML =
      '<p class="error-message">无效的拼音组合</p>';
    return;
  }

  if (validation.characters.length === 0) {
    characterInfoElement.innerHTML =
      '<p class="warning-message">暂无对应汉字</p>';
    return;
  }

  // 创建字符显示HTML
  let html = `
    <div class="character-display">
      <h4>对应汉字 (${shengmu} + ${yunmu})</h4>
      <div class="character-grid">
  `;

  validation.characters.forEach((char) => {
    const isSelectedTone = tone && char.tone === tone;
    const toneClass = isSelectedTone ? "selected-tone" : "";

    html += `
      <div class="character-item ${toneClass}" data-char="${char.char}" data-tone="${char.tone}">
        <div class="character-char">${char.char}</div>
        <div class="character-pinyin">${char.pinyin}</div>
        <div class="character-tone">第${char.tone}声</div>
      </div>
    `;
  });

  html += `
      </div>
    </div>
  `;

  characterInfoElement.innerHTML = html;

  // 为字符项添加点击事件
  characterInfoElement.querySelectorAll(".character-item").forEach((item) => {
    item.addEventListener("click", () => {
      const char = item.dataset.char;
      const charTone = parseInt(item.dataset.tone);

      // 播放这个字符的发音
      try {
        playPronunciation(shengmu, yunmu, charTone);

        // 更新选中状态
        characterInfoElement
          .querySelectorAll(".character-item")
          .forEach((ci) => {
            ci.classList.remove("playing");
          });
        item.classList.add("playing");

        // 移除播放状态
        setTimeout(() => {
          item.classList.remove("playing");
        }, 1000);
      } catch (error) {
        console.error("播放字符发音失败:", error);
      }
    });
  });
}

// 更新选择时调用字符显示
function updateCharacterDisplay() {
  displayCharacterInfo(
    currentSelection.shengmu,
    currentSelection.yunmu,
    currentSelection.shengdiao ? currentSelection.shengdiao.tone : null
  );
}

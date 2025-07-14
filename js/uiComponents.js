// UI组件生成器

// 生成声母按钮
function generateShengmuButtons(container, onSelect) {
  container.innerHTML = "";
  pinyinData.shengmu.forEach((shengmu) => {
    const button = document.createElement("button");
    button.className = "selection-button shengmu-button";
    button.textContent = shengmu;
    button.onclick = () => onSelect(shengmu, button);
    container.appendChild(button);
  });
}

// 生成韵母按钮
function generateYunmuButtons(container, onSelect) {
  container.innerHTML = "";
  pinyinData.yunmu.forEach((yunmu) => {
    const button = document.createElement("button");
    button.className = "selection-button yunmu-button";
    button.textContent = yunmu;
    button.onclick = () => onSelect(yunmu, button);
    container.appendChild(button);
  });
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

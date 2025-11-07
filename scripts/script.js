function start() {
  console.log("Script has started!");

  let fireDataWidth = 10;
  let fireDataHeight = 10;

  let fireData = createFireData(fireDataWidth, fireDataHeight);

  fireData = addFireSource(fireDataWidth, fireDataHeight, fireData, 36);

  setInterval(() => {
    fireData = updateFire(fireDataWidth, fireDataHeight, fireData);
    renderFire(fireDataWidth, fireDataHeight, fireData);
  }, 100);
}

function createFireData(width, height) {
  let totalCellCount = width * height;

  let newFireData = [];
  for (let i = 0; i < totalCellCount; i++) {
    newFireData.push(0);
  }

  return newFireData;
}

function addFireSource(width, height, data, source) {
  const newFireData = data;

  const firstFireIndexAtLastRow = width * height - width;
  const lastFireIndexAtLastRow = width * height - 1;

  for (let i = firstFireIndexAtLastRow; i <= lastFireIndexAtLastRow; i++) {
    newFireData[i] = source;
  }

  return newFireData;
}

function updateFire(width, height, data) {
  const newFireData = data;

  for (let j = 0; j < width; j++) {
    for (let i = 0; i < height; i++) {
      const fireIndex = i * width + j;
      const fireIndexBelow = fireIndex + width;

      if (fireIndexBelow >= newFireData.length) {
        continue;
      }

      const decay = 1;
      let newFireValue = newFireData[fireIndexBelow] - decay;
      newFireValue = Math.max(newFireValue, 0);

      newFireData[fireIndex] = newFireValue;
    }
  }

  return newFireData;
}

function renderFire(width, height, data) {
  const fireDiv = document.getElementById("fire");

  const fireTable = document.createElement("table");

  for (let i = 0; i < height; i++) {
    const fireRow = document.createElement("tr");

    for (let j = 0; j < width; j++) {
      const fireIndex = i * width + j;
      const fireCell = document.createElement("td");
      fireCell.innerText = data[fireIndex];

      fireRow.appendChild(fireCell);
    }

    fireTable.appendChild(fireRow);
  }

  fireDiv.replaceChildren(fireTable);
}

document.addEventListener("DOMContentLoaded", () => {
  start();
});

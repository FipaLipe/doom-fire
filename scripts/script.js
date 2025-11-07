function start() {
  console.log("Script has started!");

  let fireDataWidth = 10;
  let fireDataHeight = 10;

  let fireData = createFireData(fireDataWidth, fireDataHeight);

  fireData = addFireSource(fireDataWidth, fireDataHeight, fireData, 36);

  renderFire(fireDataWidth, fireDataHeight, fireData);
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

function updateFire() {}

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

  fireDiv.appendChild(fireTable);
}

document.addEventListener("DOMContentLoaded", () => {
  start();
});

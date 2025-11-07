function start() {
  console.log("Script has started!");

  const fireDataWidth = 10;
  const fireDataHeight = 10;
  const firePallete = [
    "#070707",
    "#1f0707",
    "#2f0f07",
    "#470f07",
    "#571707",
    "#671f07",
    "#771f07",
    "#8f2707",
    "#9f2f07",
    "#af3f07",
    "#bf4707",
    "#c74707",
    "#DF4F07",
    "#DF5707",
    "#DF5707",
    "#D75F07",
    "#D7670F",
    "#cf6f0f",
    "#cf770f",
    "#cf7f0f",
    "#CF8717",
    "#C78717",
    "#C78F17",
    "#C7971F",
    "#BF9F1F",
    "#BF9F1F",
    "#BFA727",
    "#BFA727",
    "#BFAF2F",
    "#B7AF2F",
    "#B7B72F",
    "#B7B737",
    "#CFCF6F",
    "#DFDF9F",
    "#EFEFC7",
    "#FFFFFF",
  ];

  let fireData = createFireData(fireDataWidth, fireDataHeight);

  fireData = addFireSource(fireDataWidth, fireDataHeight, fireData, 36);

  setInterval(() => {
    fireData = updateFire(fireDataWidth, fireDataHeight, fireData);
    renderFire(fireDataWidth, fireDataHeight, fireData, firePallete);
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

function renderFire(width, height, data, palette) {
  const fireDiv = document.getElementById("fire");

  const fireTable = document.createElement("table");

  for (let i = 0; i < height; i++) {
    const fireRow = document.createElement("tr");

    for (let j = 0; j < width; j++) {
      const fireIndex = i * width + j;
      const fireIntensity = data[fireIndex];
      const fireColor = palette[fireIntensity - 1];
      const fireCell = document.createElement("td");

      fireCell.style.backgroundColor = fireColor;

      fireRow.appendChild(fireCell);
    }

    fireTable.appendChild(fireRow);
  }

  fireDiv.replaceChildren(fireTable);
}

document.addEventListener("DOMContentLoaded", () => {
  start();
});

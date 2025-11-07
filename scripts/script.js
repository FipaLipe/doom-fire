function start() {
  console.log("Script has started!");

  const fireDataWidth = 200;
  const fireDataHeight = 200;
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

  const firePalleteRGB = [
    "rgb(7, 7, 7)",
    "rgb(31, 7, 7)",
    "rgb(47, 15, 7)",
    "rgb(71, 15, 7)",
    "rgb(87, 23, 7)",
    "rgb(103, 31, 7)",
    "rgb(119, 31, 7)",
    "rgb(143, 39, 7)",
    "rgb(159, 47, 7)",
    "rgb(175, 63, 7)",
    "rgb(191, 71, 7)",
    "rgb(199, 71, 7)",
    "rgb(223, 79, 7)",
    "rgb(223, 87, 7)",
    "rgb(223, 87, 7)",
    "rgb(215, 95, 7)",
    "rgb(215, 103, 15)",
    "rgb(207, 111, 15)",
    "rgb(207, 119, 15)",
    "rgb(207, 127, 15)",
    "rgb(207, 135, 23)",
    "rgb(199, 135, 23)",
    "rgb(199, 143, 23)",
    "rgb(199, 151, 31)",
    "rgb(191, 159, 31)",
    "rgb(191, 159, 31)",
    "rgb(191, 167, 39)",
    "rgb(191, 167, 39)",
    "rgb(191, 175, 47)",
    "rgb(183, 175, 47)",
    "rgb(183, 183, 47)",
    "rgb(183, 183, 55)",
    "rgb(207, 207, 111)",
    "rgb(223, 223, 159)",
    "rgb(239, 239, 199)",
    "rgb(255, 255, 255)",
  ];

  let fireData = createFireData(fireDataWidth, fireDataHeight);

  fireData = addFireSource(fireDataWidth, fireDataHeight, fireData, 36);

  setInterval(() => {
    fireData = updateFire(fireDataWidth, fireDataHeight, fireData);
    renderFire(fireDataWidth, fireDataHeight, fireData, firePalleteRGB);
  }, 10);
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

      const decay = Math.floor(Math.random() * 1.3);
      const wind = Math.floor(Math.random() * 1.25);
      let newFireValue = newFireData[fireIndexBelow] - decay;
      newFireValue = Math.max(newFireValue, 0);

      newFireData[fireIndex - wind] = newFireValue;
    }
  }

  return newFireData;
}

function renderFire(width, height, data, palette) {
  const fireCanvas = document.getElementById("fire");
  const fireContext = fireCanvas.getContext("2d");

  fireContext.fillStyle = palette[0];
  fireContext.clearRect(0, 0, fireCanvas.width, fireCanvas.height);
  fireContext.imageSmoothingEnabled = false;

  const cellSize = fireCanvas.width / width;

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const fireX = j * cellSize;
      const fireY = i * cellSize;
      const fireIndex = i * width + j;
      const fireIntensity = data[fireIndex];
      const fireColor = palette[fireIntensity];

      fireContext.fillStyle = fireColor;
      fireContext.fillRect(fireX, fireY, cellSize, cellSize);

      //   console.log(fireX, fireY, fireCellSize, fireCellSize);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  start();
});

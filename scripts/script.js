function start() {
  console.log("Script has started!");

  let fireDataWidth = 10;
  let fireDataHeight = 10;
  let fireData = createFireData(fireDataWidth, fireDataHeight);
}

function createFireData(width, height) {
  let totalCellCount = width * height;

  let newFireData = [];
  for (let i = 0; i < totalCellCount; i++) {
    newFireData.push(0);
  }

  return newFireData;
}

function updateFire() {}

function renderFire() {}

start();

let fire;

function start() {
  const fireDataWidth = 200;
  const fireDataHeight = 200;
  const fireCanvas = document.getElementById("fire");
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
  const fireDecay = 1.25;
  const fireWind = 1.25;
  const fireIntensityLabel = document.getElementById("intensity-label");

  fire = new Fire(
    fireDataWidth,
    fireDataHeight,
    fireCanvas,
    firePalleteRGB,
    fireDecay,
    fireWind,
    fireIntensityLabel
  );

  fire.setFireIntensity(36);

  fire.update();
}

function decrementIntensity() {
  fire.decrementIntensity();
}

function incrementIntensity() {
  fire.incrementIntensity();
}

async function minimizeIntensity() {
  await fire.minimizeIntensity();
}

function maximizeIntensity() {
  fire.maximizeIntensity();
}

class Fire {
  constructor(width, height, canvas, palette, decay, wind, intensityLabel) {
    this.width = width;
    this.height = height;

    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.fillStyle = palette[0];
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.imageSmoothingEnabled = false;

    this.cellSize = this.canvas.width / width;

    this.palette = palette;
    this.data = this.createFireData();

    this.decay = decay;
    this.wind = wind;

    this.intensity = 0;
    this.intensityLabel = intensityLabel;
  }

  createFireData() {
    let totalCellCount = this.width * this.height;

    let newFireData = [];
    for (let i = 0; i < totalCellCount; i++) {
      newFireData.push(0);
    }

    return newFireData;
  }

  setFireIntensity(intensity) {
    this.intensity = intensity;
    this.intensityLabel.innerText = `INTENSITY: ${this.intensity}`;
    const firstFireIndexAtLastRow = this.width * this.height - this.width;
    const lastFireIndexAtLastRow = this.width * this.height - 1;

    for (let i = firstFireIndexAtLastRow; i <= lastFireIndexAtLastRow; i++) {
      this.data[i] = intensity;
    }
  }

  incrementIntensity() {
    this.setFireIntensity(this.intensity + 1);
  }

  decrementIntensity() {
    this.setFireIntensity(this.intensity - 1);
  }

  async minimizeIntensity() {
    this.setFireIntensity(0);
  }

  async maximizeIntensity() {
    this.setFireIntensity(this.palette.length - 1);
  }

  spreadFire() {
    for (let j = 0; j < this.width; j++) {
      for (let i = 0; i < this.height; i++) {
        const fireIndex = i * this.width + j;
        const fireIndexBelow = fireIndex + this.width;

        if (fireIndexBelow >= this.data.length) {
          continue;
        }

        const decay = Math.floor(Math.random() * this.decay);
        const wind = Math.floor(Math.random() * this.wind);
        let newFireValue = this.data[fireIndexBelow] - decay;
        newFireValue = Math.max(newFireValue, 0);

        this.data[fireIndex - wind] = newFireValue;
      }
    }
  }

  renderFire() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        const fireX = j * this.cellSize;
        const fireY = i * this.cellSize;
        const fireIndex = i * this.width + j;
        const fireIntensity = this.data[fireIndex];
        const fireIntensitySanitized = Math.min(
          Math.max(0, fireIntensity),
          this.palette.length - 1
        );
        const fireColor = this.palette[fireIntensitySanitized];

        this.ctx.fillStyle = fireColor;
        this.ctx.fillRect(fireX, fireY, this.cellSize, this.cellSize);

        //   console.log(fireX, fireY, fireCellSize, fireCellSize);
      }
    }
  }

  update = () => {
    this.spreadFire();
    this.renderFire();
    requestAnimationFrame(this.update);
  };
}

document.addEventListener("DOMContentLoaded", () => {
  start();
});

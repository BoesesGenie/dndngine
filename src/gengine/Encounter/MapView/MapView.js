const LINE_WIDTH_DIVIDER = 800;
const LINE_COLOR = '#FFF';
const PADDING = 0.05;
const MIN_SCALE = 1;

export class MapView {
  #canvas;
  #scale = 1;
  #scaleCenterX = 0;
  #scaleCenterY = 0;
  #dragDeltaX = 0;
  #dragDeltaY = 0;
  #dragBaseDeltaX = 0;
  #dragBaseDeltaY = 0;

  constructor(canvas) {
    this.#canvas = canvas;
  }

  scale({ scaleDelta, x, y }) {
    this.#scaleCenterY = this.#scaleCenterY ? this.#scale === 1 ? 0 : this.#scaleCenterY : y;
    this.#scaleCenterX = this.#scaleCenterX ? this.#scale === 1 ? 0 : this.#scaleCenterX : x;
    this.#scale += scaleDelta * -0.01;
  }

  drag({ deltaX, deltaY }) {
    this.#dragDeltaX = this.#dragBaseDeltaX + deltaX;
    this.#dragDeltaY = this.#dragBaseDeltaY + deltaY;
  }

  dragStopped() {
    this.#dragBaseDeltaX = this.#dragDeltaX;
    this.#dragBaseDeltaY = this.#dragDeltaY;
  }

  draw(encounterMap) {
    const ctx = this.#canvas.context;
    const lineWidth = Math.min(this.#canvas.width, this.#canvas.height) / LINE_WIDTH_DIVIDER;

    this.#scale = Math.min(
      Math.max(MIN_SCALE, this.#scale),
      Math.max(encounterMap.width, encounterMap.height)
    );
    const width = this.#canvas.width * this.#scale;
    const height = this.#canvas.height * this.#scale;
    const padding = PADDING * width;
    const paddingX2 = padding * 2;
    const cellSize = Math.min(
      (width - paddingX2) / encounterMap.width,
      (height - paddingX2) / encounterMap.height
    );
    const horizontalLineLength = cellSize * encounterMap.width;
    const verticalLineLength = cellSize * encounterMap.height;
    const horizontalPadding = (width - horizontalLineLength) / 2;
    const verticalPadding = (height - verticalLineLength) / 2;

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = LINE_COLOR;

    const xStart = (this.#canvas.width - width)
      * this.#scaleCenterX
      / this.#canvas.width
      + horizontalPadding
      + this.#dragDeltaX;
    const yStart = (this.#canvas.height - height)
      * this.#scaleCenterY
      / this.#canvas.height
      + verticalPadding
      + this.#dragDeltaY;

    for (let i = 0; i <= encounterMap.width; i++) {
      const start = {
        x: i * cellSize + xStart,
        y: yStart,
      };
      const end = {
        x: i * cellSize + xStart,
        y: verticalLineLength + yStart,
      };

      this.#drawLine(start, end);
    }

    for (let i = 0; i <= encounterMap.height; i++) {
      const start = {
        x: xStart,
        y: i * cellSize + yStart,
      };
      const end = {
        x: horizontalLineLength + xStart,
        y: i * cellSize + yStart,
      };

      this.#drawLine(start, end);
    }
  }

  #drawLine(start, end) {
    const ctx = this.#canvas.context;

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.closePath();
    ctx.stroke();
  }
}

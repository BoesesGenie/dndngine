const LINE_WIDTH_DIVIDER = 500;
const LINE_COLOR = '#FFF';

export class MapView {
  #canvas;

  constructor(canvas) {
    this.#canvas = canvas;
  }

  draw(encounterMap) {
    const ctx = this.#canvas.context;
    const base = Math.min(this.#canvas.width, this.#canvas.height);
    const lineWidth = base / LINE_WIDTH_DIVIDER;
    const maxSideSize = Math.max(encounterMap.width, encounterMap.height);
    const cellSize = base / maxSideSize;
    const horizontalLineLength = cellSize * encounterMap.width;
    const verticalLineLength = cellSize * encounterMap.height;

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = LINE_COLOR;

    for (let i = 1; i < encounterMap.width; i++) {
      const start = {
        x: i * cellSize,
        y: 0,
      };
      const end = {
        x: i * cellSize,
        y: verticalLineLength,
      };

      this.#drawLine(start, end);
    }

    for (let i = 1; i < encounterMap.height; i++) {
      const start = {
        x: 0,
        y: i * cellSize,
      };
      const end = {
        x: horizontalLineLength,
        y: i * cellSize,
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

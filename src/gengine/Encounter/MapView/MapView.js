const LINE_WIDTH_DIVIDER = 800;
const LINE_COLOR = '#FFF';
const PADDING = 0.05;

export class MapView {
  #canvas;

  constructor(canvas) {
    this.#canvas = canvas;
  }

  draw(encounterMap) {
    const ctx = this.#canvas.context;
    const lineWidth = Math.min(this.#canvas.width, this.#canvas.height) / LINE_WIDTH_DIVIDER;
    const padding = PADDING * this.#canvas.width;
    const paddingX2 = padding * 2;
    const cellSize = Math.min(
      (this.#canvas.width - paddingX2) / encounterMap.width,
      (this.#canvas.height - paddingX2) / encounterMap.height
    );
    const horizontalLineLength = cellSize * encounterMap.width;
    const verticalLineLength = cellSize * encounterMap.height;
    const horizontalPadding = (this.#canvas.width - horizontalLineLength) / 2;
    const verticalPadding = (this.#canvas.height - verticalLineLength) / 2;

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = LINE_COLOR;

    for (let i = 0; i <= encounterMap.width; i++) {
      const start = {
        x: i * cellSize + horizontalPadding,
        y: verticalPadding,
      };
      const end = {
        x: i * cellSize + horizontalPadding,
        y: verticalLineLength + verticalPadding,
      };

      this.#drawLine(start, end);
    }

    for (let i = 0; i <= encounterMap.height; i++) {
      const start = {
        x: horizontalPadding,
        y: i * cellSize + verticalPadding,
      };
      const end = {
        x: horizontalLineLength + horizontalPadding,
        y: i * cellSize + verticalPadding,
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

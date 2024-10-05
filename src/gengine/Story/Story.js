export class Story {
  #canvas;

  constructor(canvas) {
    this.#canvas = canvas;
  }

  init() {
    this.#canvas.context.fillStyle = 'green';
    this.#canvas.context.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
  }
}

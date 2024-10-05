export class CanvasWrapper {
  #canvas = document.createElement('canvas');
  #rootNode;

  constructor(rootNode) {
    this.#rootNode = rootNode;
  }

  init() {
    this.#canvas.width = window.innerWidth;
    this.#canvas.height = window.innerHeight;

    this.#rootNode.appendChild(this.#canvas);
  }

  get context() {
    return this.#canvas.getContext('2d');
  }

  get width() {
    return this.#canvas.width;
  }

  get height() {
    return this.#canvas.height;
  }
}

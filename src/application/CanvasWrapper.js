import { eventEmitter } from './EventEmitter.js';
import { SCALE, WINDOW_RESIZE } from './events.js';

export class CanvasWrapper {
  #canvas = document.createElement('canvas');
  #rootNode;

  constructor(rootNode) {
    this.#rootNode = rootNode;
  }

  init() {
    this.#canvas.width = window.innerWidth;
    this.#canvas.height = window.innerHeight;

    window.addEventListener('resize', this.#handleWindowResize.bind(this));
    this.#canvas.addEventListener('wheel', this.#handleScale.bind(this));

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

  #handleWindowResize() {
    this.#canvas.width = window.innerWidth;
    this.#canvas.height = window.innerHeight;

    eventEmitter.emit(WINDOW_RESIZE);
  }

  #handleScale(e) {
    if (!e.ctrlKey) {
      return;
    }

    e.preventDefault();

    eventEmitter.emit(SCALE, e.deltaY);
  }
}

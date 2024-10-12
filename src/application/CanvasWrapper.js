import { eventEmitter } from './EventEmitter.js';
import {DRAG, SCALE, WINDOW_RESIZE} from './events.js';

export class CanvasWrapper {
  #canvas = document.createElement('canvas');
  #rootNode;
  #isMouseDown = false;
  #dragXStart;
  #dragYStart;

  constructor(rootNode) {
    this.#rootNode = rootNode;
  }

  init() {
    this.#canvas.width = window.innerWidth;
    this.#canvas.height = window.innerHeight;

    window.addEventListener('resize', this.#handleWindowResize.bind(this));
    this.#canvas.addEventListener('wheel', this.#handleScale.bind(this));
    this.#canvas.addEventListener('mousedown', this.#handleMouseDown.bind(this));
    this.#canvas.addEventListener('mouseup', this.#handleMouseUp.bind(this));
    this.#canvas.addEventListener('mousemove', this.#handleMouseMove.bind(this));

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

    eventEmitter.emit(SCALE, {
      scaleDelta: e.deltaY,
      x: e.clientX,
      y: e.clientY,
    });
  }

  #handleMouseDown(e) {
    e.preventDefault();

    this.#isMouseDown = true;
    this.#dragXStart = e.clientX;
    this.#dragYStart = e.clientY;
  }

  #handleMouseUp(e) {
    e.preventDefault();

    this.#isMouseDown = false;
  }

  #handleMouseMove(e) {
    e.preventDefault();

    if (!this.#isMouseDown) {
      return;
    }

    eventEmitter.emit(DRAG, {
      deltaX: e.clientX - this.#dragXStart,
      deltaY: e.clientY - this.#dragYStart,
    });
  }
}

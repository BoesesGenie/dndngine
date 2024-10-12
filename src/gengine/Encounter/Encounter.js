import { EncounterMap } from '../../domain/EncounterMap/EncounterMap.js';
import { eventEmitter } from '../../application/EventEmitter.js';
import {DRAG, SCALE, WINDOW_RESIZE} from '../../application/events.js';

export class Encounter {
  #canvas;
  #mapView;
  #mapDrawDto = new EncounterMap(20, 20).drawDto; // TODO

  constructor(canvas, mapView) {
    this.#canvas = canvas;
    this.#mapView = mapView;
  }

  init() {
    this.#draw();

    eventEmitter.on(WINDOW_RESIZE, this.#draw.bind(this));
    eventEmitter.on(SCALE, this.#scaleMap.bind(this));
    eventEmitter.on(DRAG, this.#dragMap.bind(this));
  }

  #scaleMap(settings) {
    this.#mapView.scale(settings);
    this.#draw();
  }

  #dragMap(settings) {
    this.#mapView.drag(settings);
    this.#draw();
  }

  #draw() {
    this.#canvas.context.fillStyle = 'black';
    this.#canvas.context.fillRect(0, 0, this.#canvas.width, this.#canvas.height);

    this.#mapView.draw(this.#mapDrawDto);
  }
}

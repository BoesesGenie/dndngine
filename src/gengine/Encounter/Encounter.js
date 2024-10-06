import { EncounterMap } from '../../domain/EncounterMap/EncounterMap.js';
import { eventEmitter } from '../../application/EventEmitter.js';
import {SCALE, WINDOW_RESIZE} from '../../application/events.js';

export class Encounter {
  #canvas;
  #mapView;

  constructor(canvas, mapView) {
    this.#canvas = canvas;
    this.#mapView = mapView;
  }

  init() {
    this.#draw();

    eventEmitter.on(WINDOW_RESIZE, this.#draw.bind(this));
    eventEmitter.on(SCALE, this.#draw.bind(this));
  }

  #draw(scaleDelta = 0) {
    this.#canvas.context.fillStyle = 'black';
    this.#canvas.context.fillRect(0, 0, this.#canvas.width, this.#canvas.height);

    this.#mapView.draw(new EncounterMap(20, 20).drawDto, scaleDelta);
  }
}

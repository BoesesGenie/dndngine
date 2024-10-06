import { EncounterMap } from '../../domain/EncounterMap/EncounterMap.js';

export class Encounter {
  #canvas;
  #mapView;

  constructor(canvas, mapView) {
    this.#canvas = canvas;
    this.#mapView = mapView;
  }

  init() {
    this.#canvas.context.fillStyle = 'black';
    this.#canvas.context.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#mapView.draw(new EncounterMap(20, 20).drawDto);
  }
}

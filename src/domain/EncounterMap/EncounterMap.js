export class EncounterMap {
  #width;
  #height;

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
  }

  get drawDto() {
    return {
      width: this.#width,
      height: this.#height,
    }
  }
}
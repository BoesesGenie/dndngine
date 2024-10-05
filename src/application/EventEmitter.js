class EventEmitter {
  #events = new Map();

  on(eventName, cb) {
    this.#events.has(eventName) ?
      this.#events.get(eventName).add(cb) :
      this.#events.set(eventName, new Set([cb]));

    return this;
  }

  off(eventName, cb) {
    if (!this.#events.has(eventName) ) {
      return this;
    }

    this.#events.get(eventName).delete(cb);

    return this;
  }

  emit(eventName) {
    if (!this.#events.has(eventName) ) {
      return this;
    }

    this.#events.get(eventName).forEach((cb) => {
      try {
        cb();
      } catch (err) {
        console.error(err);
      }
    });

    return this;
  }
}

export const eventEmitter = new EventEmitter();

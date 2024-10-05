import { CanvasWrapper } from './CanvasWrapper.js';
import { UiWrapper } from './UiWrapper.js';
import { registerComponents } from '../uiengine/registerComponents.js';
import { eventEmitter } from './EventEmitter.js';
import {ENCOUNTER_MODE_STARTED, STORY_MODE_STARTED} from './events.js';
import { Story } from '../gengine/Story/Story.js';
import { Encounter } from '../gengine/Encounter/Encounter.js';

export class DnDngine {
  #canvas;
  #ui;
  #storyMode;
  #encounterMode;

  constructor(canvas, ui, storyMode, encounterMode) {
    this.#canvas = canvas;
    this.#ui = ui;
    this.#storyMode = storyMode;
    this.#encounterMode = encounterMode;
  }

  static run() {
    const root = document.getElementById('app');
    const canvas = new CanvasWrapper(root);
    const engine = new DnDngine(
      canvas,
      new UiWrapper(root, registerComponents),
      new Story(canvas),
      new Encounter(canvas),
    );

    engine.init();
  }

  init() {
    this.#canvas.init();
    this.#ui.init();
    eventEmitter.on(STORY_MODE_STARTED, this.switchToStory.bind(this));
    eventEmitter.on(ENCOUNTER_MODE_STARTED, this.switchToEncounter.bind(this));
    eventEmitter.emit(STORY_MODE_STARTED);
  }

  switchToStory() {
    this.#storyMode.init();
  }

  switchToEncounter() {
    this.#encounterMode.init();
  }
}

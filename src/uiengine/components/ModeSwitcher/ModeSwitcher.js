import { eventEmitter } from '../../../application/EventEmitter.js';
import {ENCOUNTER_MODE_STARTED, STORY_MODE_STARTED} from '../../../application/events.js';

export class ModeSwitcher extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'wrapper');

    const storyButton = document.createElement('button');
    storyButton.innerText = 'Story mode';
    storyButton.addEventListener('click', function () {
      eventEmitter.emit(STORY_MODE_STARTED);
    });

    const encounterButton = document.createElement('button');
    encounterButton.innerText = 'Encounter mode';
    encounterButton.addEventListener('click', function () {
      eventEmitter.emit(ENCOUNTER_MODE_STARTED);
    });

    const style = document.createElement('style');
    style.textContent = `
      .wrapper {
        position: fixed;
        top: 0;
        left: 0;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(storyButton);
    wrapper.appendChild(encounterButton);
  }
}

export const modeSwitcherName = 'mode-switcher';

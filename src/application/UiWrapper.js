import { modeSwitcherName } from '../uiengine/components/ModeSwitcher/ModeSwitcher.js';

export class UiWrapper {
  #rootNode;
  #registerComponents;

  constructor(rootNode, registerComponents) {
    this.#rootNode = rootNode;
    this.#registerComponents = registerComponents;
  }

  init() {
    this.#registerComponents();
    this.#rootNode.appendChild(document.createElement(modeSwitcherName));
  }
}

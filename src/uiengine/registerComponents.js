import { ModeSwitcher, modeSwitcherName } from './components/ModeSwitcher/ModeSwitcher.js';

export function registerComponents() {
  customElements.define(modeSwitcherName, ModeSwitcher);
}

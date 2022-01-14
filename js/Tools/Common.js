import { getColor } from './colorPicker.js';

function attachEvents(element, eventMap) {
  for (const [eventName, eventFn] of Object.entries(eventMap))
    element.addEventListener(eventName, eventFn);
}

function detachEvents(element, eventMap) {
  for (const [eventName, eventFn] of Object.entries(eventMap))
    element.removeEventListener(eventName, eventFn);
}

function midRange(start, end) {
  return (end - start) / 2 + start;
}

export { attachEvents, detachEvents, midRange, getColor };

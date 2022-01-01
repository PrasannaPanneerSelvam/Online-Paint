function attachEvents(element, eventMap) {
  for (const [eventName, eventFn] of Object.entries(eventMap))
    element.addEventListener(eventName, eventFn);
}

function detachEvents(element, eventMap) {
  for (const [eventName, eventFn] of Object.entries(eventMap))
    element.removeEventListener(eventName, eventFn);
}

export { attachEvents, detachEvents };

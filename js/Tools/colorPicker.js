let currentColor = '#ff0000';

function colorChanged(e) {
  currentColor = e.target.value;
}

function setDefaultColor(element) {
  element.value = currentColor;
}

function getColor() {
  console.log('rahul', currentColor);
  return currentColor;
}

export { colorChanged, setDefaultColor, getColor };

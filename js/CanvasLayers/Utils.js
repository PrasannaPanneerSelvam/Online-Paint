function mergeTwoLayers({ existingData, newData, height, width }) {
  const totalRow = height,
    totalCol = width;

  const result = [];
  for (let row = 0, idx = 0; row < totalRow; row++) {
    for (let col = 0; col < totalCol; col++) {
      const rgbaTopData = [],
        rgbaBottomData = [];
      for (let cell = 0; cell < 4; cell++) {
        rgbaTopData.push(existingData[idx]);
        rgbaBottomData.push(newData[idx]);
      }

      // Consume only alpha value 1 cell
      let cellsTobeCopied =
        rgbaTopData[3] === 255 ? rgbaTopData : rgbaBottomData;

      for (let cell = 0; cell < 4; cell++) {
        result.push(cellsTobeCopied[cell]);
      }
    }
  }

  return result;
}

export { mergeTwoLayers };

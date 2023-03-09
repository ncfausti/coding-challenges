function justifyText(text, columnWidth) {
  // Split the text into an array of words
  const words = text.trim().split(' ');

  // Create lines of text
  const lines = [];
  let line = '';

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const spaceNeeded = i === 0 ? 0 : 1;

    // Check if the current word can fit in the current line
    if (line.length + spaceNeeded + word.length <= columnWidth) {
      if (line.length > 0 || i === 0) {
        line += ' ';
      }
      line += word;
    } else {
      // Add the current line to the lines array
      lines.push(line);

      // Reset the line variable to start a new line
      line = word;
    }
  }

  // Add the last line to the lines array
  lines.push(line);

  // Justify the lines
  const justifiedLines = lines.map(line => {
    const words = line.trim().split(' ');
    const numWords = words.length;
    const numSpaces = columnWidth - words.reduce((total, word) => total + word.length, 0);
    const spacesPerGap = numSpaces / (numWords - 1);
    const extraSpaces = numSpaces % (numWords - 1);
    const gapSizes = [];

    // Calculate the size of each gap between words
    for (let i = 0; i < numWords - 1; i++) {
      const gapSize = i < extraSpaces ? Math.ceil(spacesPerGap) : Math.floor(spacesPerGap);
      gapSizes.push(gapSize);
    }

    // Build the justified line
    let justifiedLine = '';
    for (let i = 0; i < numWords; i++) {
      justifiedLine += words[i];

      if (i < numWords - 1) {
        justifiedLine += ' '.repeat(gapSizes[i]);
      }
    }

    return justifiedLine;
  });

  return justifiedLines.join('\n');
}

// Examples to test with
const testString = `When you justify text, space is added between words so that both edges of each line are aligned with both margins. The last line in the paragraph is aligned left. Click anywhere in the paragraph that you want to justify.`
console.log(justifyText(testString, 10));
console.log(justifyText(testString, 24));
console.log(justifyText(testString, 40));

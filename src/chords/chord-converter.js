import ChordParser from './chord-parser';
import RegexHelpers from '../utils/regex-helper';

class ChordsConverter {
  constructor() {
    this.chords = {};
    this.parser = new ChordParser();
  }

  getChordsList(lineContent) {
    // https://regex101.com/r/kA6aZ9/1
    const matches = RegexHelpers.matchAllRegex(
      lineContent,
      /\b([ABCDEFGAB][b#]?)([^\s]+)?/g
    );

    const allChords = [];
    matches.forEach((match) => {
      allChords.push({
        chord: this.parser.parse(match[0]),
        loc: {
          start: match.index,
          size: match[0].length
        }
      });
    });

    return allChords;
  }
}

export default ChordsConverter;

import _ from 'lodash';
import ChordPrint from './chord-print';

class ChordTransposer {
  constructor() {
    this._notes = [
      { index: 0, whole: 'A' },
      { index: 1, sharp: 'A#', flat: 'Bb' },
      { index: 2, whole: 'B' },
      { index: 3, whole: 'C' },
      { index: 4, sharp: 'C#', flat: 'Db' },
      { index: 5, whole: 'D' },
      { index: 6, sharp: 'D#', flat: 'Eb' },
      { index: 7, whole: 'E' },
      { index: 8, whole: 'F' },
      { index: 9, sharp: 'F#', flat: 'Gb' },
      { index: 10, whole: 'G' },
      { index: 11, sharp: 'G#', flat: 'Ab' }
    ];
  }

  _getChordRootIndex(chord) {
    let index = null;

    this._notes.forEach((note) => {
      if (note.whole === chord.root ||
          note.sharp === chord.root ||
          note.flat === chord.root) {
        index = note.index;
        return;
      }
    });

    return index;
  }

  _getChordRootOverrideIndex(chord) {
    let index = null;

    if (!chord.rootOverride) {
      return null;
    }

    this._notes.forEach((note) => {
      if (note.whole === chord.rootOverride ||
          note.sharp === chord.rootOverride ||
          note.flat === chord.rootOverride) {
        index = note.index;
        return;
      }
    });

    return index;
  }

  _getNoteByIndex(index) {
    let selectedNote = null;
    let indexCalculated = index;
    if (index < 0) {
      indexCalculated = 12 + index;
    }
    this._notes.forEach((note) => {
      if (note.index === indexCalculated % 12) {
        selectedNote = note;
      }
    });

    return selectedNote;
  }

  transpose(chordOriginal, changeRootsValue) {
    const chordTransposed = _.cloneDeep(chordOriginal);

    const originalRootIndex = this._getChordRootIndex(chordOriginal);
    const newRootIndex = originalRootIndex + changeRootsValue;
    let note = this._getNoteByIndex(newRootIndex);
    chordTransposed.root = note.whole || note.sharp;

    const originalRootOverrideIndex = this._getChordRootOverrideIndex(chordOriginal);
    if (originalRootOverrideIndex) {
      const newRootOverrideIndex = originalRootOverrideIndex + changeRootsValue;
      note = this._getNoteByIndex(newRootOverrideIndex);
      chordTransposed.rootOverride = note.whole || note.sharp;
    }

    return chordTransposed;
  }

  _insertText(original, text, start, moveRight) {
    const before = original.substr(0, start);
    const after = original.substr(start, original.length);
    let afterCut = after.substr(text.length, after.length);

    let spaceBefore = '';
    if (moveRight) {
      spaceBefore = ' ';
      afterCut = after.substr(text.length + 1, after.length);
    }

    return `${before}${spaceBefore}${text}${afterCut}`;
  }

  transposeLine(originalLine, changeRootsValue) {
    const chordsTextOriginal = originalLine.chord;
    const parsedOriginal = originalLine.parsed;

    // replace with blank original chords
    let transposedChordText = parsedOriginal.reduce((acc, originalItem) => {
      const originalChordPrint = ChordPrint.print(originalItem.chord);
      const blankText = _.repeat(' ', originalChordPrint.length);
      return _.replace(acc, originalChordPrint, blankText);
    }, chordsTextOriginal);

    // transpose each original item
    const parsedTransposed = _.map(parsedOriginal, (item) => {
      return {
        chord: this.transpose(item.chord, changeRootsValue),
        loc: item.loc
      };
    });

    // insert new chord in text
    for (let i = 0; i < parsedOriginal.length; i++) {
      const transposedChordString = ChordPrint.print(parsedTransposed[i].chord);

      // insert a char if previous was smaller
      let moveRight = false;
      if (i > 0) {
        // previous original chord length
        const previousChordString = ChordPrint.print(parsedOriginal[i - 1].chord);
        const previousOriginalChordLength = previousChordString.length;

        // previous transposed chord length
        const previousTransposedChordString = ChordPrint.print(parsedTransposed[i - 1].chord);
        const previousTransposedChordLength = previousTransposedChordString.length;

        if (previousTransposedChordLength < previousOriginalChordLength) {
          moveRight = true;
        }
      }

      transposedChordText = this._insertText(transposedChordText,
                                             transposedChordString,
                                             parsedOriginal[i].loc.start,
                                             moveRight);
    }

    return {
      chord: transposedChordText,
      parsed: parsedTransposed,
    };
  }
}

export default ChordTransposer;

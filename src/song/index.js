import ChordsConverter from '../chords/chord-converter';

class Song {
  constructor(data) {
    let body = data;

    // convert chords
    const chordsConverter = new ChordsConverter();
    const bodyBefore = body;

    const bodyWithChords = bodyBefore.map(lineMapItem => {
      if (lineMapItem.hasOwnProperty('chord')) {
        // parse chord line
        const chordLine = lineMapItem.chord;
        const parsedChord = chordsConverter.getChordsList(chordLine);

        // merge to data.body[n]
        lineMapItem.parsed = parsedChord;
        return lineMapItem;
      }
      return lineMapItem;
    });

    body = bodyWithChords;
    this.data = body;
  }
}

export default Song;

import h from '../spec_helper';
import ChordsConverter from '../../src/chords/chord-converter';
import ChordTransposer from '../../src/chords/chord-transposer';

describe('ChordTransposer:', () => {
  // ------------------------------------
  it('_getChordRootIndex', () => {
    const transposer = new ChordTransposer();

    let index = transposer._getChordRootIndex({
      root: 'C',
      flavors: 'M7',
      rootOverride: 'G'
    });
    h.expect(index).to.eql(3);

    index = transposer._getChordRootIndex({
      root: 'Db',
      flavors: 'M7',
      rootOverride: 'Ab'
    });
    h.expect(index).to.eql(4);

    index = transposer._getChordRootIndex({
      root: 'C#',
      flavors: 'M7',
      rootOverride: 'G#'
    });
    h.expect(index).to.eql(4);

    index = transposer._getChordRootIndex({
      root: 'D',
      flavors: 'M7',
      rootOverride: 'A'
    });
    h.expect(index).to.eql(5);
  });

  // ------------------------------------
  it('_getChordRootOverrideIndex', () => {
    const transposer = new ChordTransposer();

    let index = transposer._getChordRootOverrideIndex({
      root: 'C',
      flavors: 'M7',
      rootOverride: 'G'
    });
    h.expect(index).to.eql(10);

    index = transposer._getChordRootOverrideIndex({
      root: 'Db',
      flavors: 'M7',
      rootOverride: 'Ab'
    });
    h.expect(index).to.eql(11);

    index = transposer._getChordRootOverrideIndex({
      root: 'C#',
      flavors: 'M7',
      rootOverride: 'G#'
    });
    h.expect(index).to.eql(11);

    index = transposer._getChordRootOverrideIndex({
      root: 'D',
      flavors: 'M7',
      rootOverride: 'A'
    });
    h.expect(index).to.eql(0);
  });

  // ------------------------------------
  it('transpose', () => {
    const transposer = new ChordTransposer();

    const transposeTo = (chord, index, expectedRoot, expectedRootOverride) => {
      const newChord = transposer.transpose(chord, index);
      h.expect(newChord.root).to.eql(expectedRoot);
      h.expect(newChord.rootOverride).to.eql(expectedRootOverride);
    };

    transposeTo({root: 'C', flavors: 'M7', rootOverride: 'G', index: 3}, 1,  'C#', 'G#');
    transposeTo({root: 'C', flavors: 'M7', rootOverride: 'G', index: 3}, 0,  'C',  'G');
    transposeTo({root: 'C', flavors: 'M7', rootOverride: 'G', index: 3}, -1, 'B',  'F#');
    transposeTo({root: 'C', flavors: 'M7', rootOverride: 'G', index: 3}, -2, 'A#', 'F');
    transposeTo({root: 'C', flavors: 'M7', rootOverride: 'G', index: 3}, -3, 'A',  'E');
    transposeTo({root: 'C', flavors: 'M7', rootOverride: 'G', index: 3}, -4, 'G#', 'D#');
  });

  // ------------------------------------
  it('transposeLine', () => {
    const transposer = new ChordTransposer();

    const chordsConverter = new ChordsConverter();
    const chordLine = '    CM7   /    G7    /';
    const parsed = chordsConverter.getChordsList(chordLine);

    const line = {
      'chord': chordLine,
      'parsed': parsed
    };

    const result = transposer.transposeLine(line, 2);
    h.expect(result.parsed[0].chord.root).to.eql('D');
    h.expect(result.parsed[1].chord.root).to.eql('A');
    h.expect(result.chord).to.eql('    DM7   /    A7    /');
  });

  // ------------------------------------
  it('transposeLine should keep region if bigger', () => {
    const transposer = new ChordTransposer();

    const chordsConverter = new ChordsConverter();
    const chordLine = '    CM7   /    G7    /';
    const parsed = chordsConverter.getChordsList(chordLine);

    const line = {
      'chord': chordLine,
      'parsed': parsed
    };

    const result = transposer.transposeLine(line, 1);
    h.expect(result.parsed[0].chord.root).to.eql('C#');
    h.expect(result.parsed[1].chord.root).to.eql('G#');
    h.expect(result.chord).to.eql('    C#M7  /    G#7   /');
  });

  // ------------------------------------
  it('transposeLine should keep region if smaller', () => {
    const transposer = new ChordTransposer();

    const chordsConverter = new ChordsConverter();
    const chordLine = '    C#M7   /    G#7    /';
    const parsed = chordsConverter.getChordsList(chordLine);

    const line = {
      'chord': chordLine,
      'parsed': parsed
    };

    const result = transposer.transposeLine(line, -1);
    h.expect(result.parsed[0].chord.root).to.eql('C');
    h.expect(result.parsed[1].chord.root).to.eql('G');
    h.expect(result.chord).to.eql('    CM7    /    G7     /');
  });

  // ------------------------------------
  it('transposeLine should keep all in position', () => {
    const transposer = new ChordTransposer();

    const chordsConverter = new ChordsConverter();
    const chordLine = '  C7/9   F#13   F13';
    const parsed = chordsConverter.getChordsList(chordLine);

    const line = {
      'chord': chordLine,
      'parsed': parsed
    };

    const result = transposer.transposeLine(line, 1);
    h.expect(result.parsed[0].chord.root).to.eql('C#');
    h.expect(result.parsed[1].chord.root).to.eql('G');
    h.expect(result.parsed[2].chord.root).to.eql('F#');
    h.expect(result.chord).to.eql('  C#7/9  G13    F#13');
  });

  // ------------------------------------
  it('transposeLine._insertText insert text at correct position', () => {
    const transposer = new ChordTransposer();
    h.expect(transposer._insertText('XXX  __XXX', 'YY', 5)).to.eql('XXX  YYXXX');
    h.expect(transposer._insertText('XXX  ___XX', 'YY', 5)).to.eql('XXX  YY_XX');
  });
});

import h from '../spec_helper';
import ChordParser from '../../src/chords/chord-parser';

describe('ChordParser:', () => {
  // ------------------------------------
  it('roots', () => {
    const parser = new ChordParser();

    const checkRoot = (parserInstance, chord, expectedRoot) => {
      const parsedChord = parserInstance.parse(chord);
      h.expect(parsedChord.root).to.eql(expectedRoot);
    };

    checkRoot(parser, 'C', 'C');
    checkRoot(parser, 'C#', 'C#');
    checkRoot(parser, 'Cb', 'Cb');
    checkRoot(parser, 'CM7', 'C');
    checkRoot(parser, 'Cb7(9)', 'Cb');
  });

  // ------------------------------------
  it('override roots', () => {
    const parser = new ChordParser();

    const checkRootOverride = (parserInstance, chord, expectedRootOverride) => {
      const parsedChord = parserInstance.parse(chord);
      h.expect(parsedChord.rootOverride).to.eql(expectedRootOverride);
    };

    checkRootOverride(parser, 'Bb/C', 'C');
    checkRootOverride(parser, 'Bb#/C#', 'C#');
    checkRootOverride(parser, 'Bb/Cb', 'Cb');
    checkRootOverride(parser, 'BbM7/C', 'C');
    checkRootOverride(parser, 'Bb7(9)/Cb', 'Cb');
  });

  // ------------------------------------
  it('flavors', () => {
    const parser = new ChordParser();

    const checkFlavors = (parserInstance, chord, expectedFlavors) => {
      const parsedChord = parserInstance.parse(chord);
      h.expect(parsedChord.flavors).to.eql(expectedFlavors);
    };

    checkFlavors(parser, 'Bb/C', null);
    checkFlavors(parser, 'C#/A#', null);
    checkFlavors(parser, 'BbM7/C', 'M7');
    checkFlavors(parser, 'Bb7(9)/Cb', '7(9)');
    checkFlavors(parser, 'A7+', '7+');
  });
});


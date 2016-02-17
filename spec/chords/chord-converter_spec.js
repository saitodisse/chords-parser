import h from '../spec_helper';
import ChordsConverter from '../../src/chords/chord-converter';

describe('ChordsConverter:', () => {
  // ------------------------------------
  it('slipt all simple chords', () => {
    const CHORDS_LINE = '  ---  C  // /  G  / /   A  /  B //';

    const chordsConverter = new ChordsConverter();
    const allChords = chordsConverter.getChordsList(CHORDS_LINE);

    h.expect(allChords.length).to.eql(4);
  });

  // ------------------------------------
  it('slipt all complex chords', () => {
    const CHORDS_LINE = '     A7+    E7/4      B7/9    Dm(7+)';

    const chordsConverter = new ChordsConverter();
    const allChords = chordsConverter.getChordsList(CHORDS_LINE);

    h.expect(allChords.length).to.eql(4);
  });

  // ------------------------------------
  it('parse chord localization', () => {
    const CHORDS_LINE = '     A7+    E7/4      B7/9    Dm(7+)';

    const chordsConverter = new ChordsConverter();
    const allChords = chordsConverter.getChordsList(CHORDS_LINE);

    const first = allChords[0];
    h.expect(first.chord).to.deep.eql({
      root: 'A',
      flavors: '7+',
      rootOverride: null
    });
  });

  // ------------------------------------
  it('record localization', () => {
    const CHORDS_LINE = '     A7+    E7/4      B7/9    Dm(7+)';

    const chordsConverter = new ChordsConverter();
    const allChords = chordsConverter.getChordsList(CHORDS_LINE);

    const first = allChords[0];
    h.expect(first.loc).to.deep.eql({
      start: 5,
      size: 3
    });

    const last = allChords[3];
    h.expect(last.loc).to.deep.eql({
      start: 30,
      size: 6
    });
  });
});

import h from '../spec_helper';
import ChordPrint from '../../src/chords/chord-print';

describe('ChordPrint:', () => {
  // ------------------------------------
  it('_getChordRootIndex', () => {
    const result = ChordPrint.print({
      root: 'C',
      flavors: 'M7',
      rootOverride: 'G'
    });
    h.expect(result).to.eql('CM7/G', 'must be CM7/G');
  });
});

import h from '../spec_helper';
import Song from '../../src/song/index';

describe('Song:', () => {
  const BODY = [
    {_text: '# -- intro --'},
    {chord: '      CM7   /    G7    /'},
    {_text: ''},
    {_text: '# -- A --'},
    {chord: '      C     /    G7    /'},
    {liric: '  Parabéns pra você'},
    {chord: '      /     /    C     /'},
    {liric: 'Nesta da___ta querida'}
  ];

  // ------------------------------------
  it('load data to song object', () => {
    const song = new Song(BODY);
    const chord = song.data[1].chord;
    h.expect(chord).to.eql('      CM7   /    G7    /');

    const parsed = song.data[1].parsed;

    const parsedChord = parsed[0].chord;
    h.expect(parsedChord.root).to.eql('C');
    h.expect(parsedChord.flavors).to.eql('M7');
    h.expect(parsedChord.rootOverride).to.eql(null);

    const parsedLoc = parsed[0].loc;
    h.expect(parsedLoc.start).to.eql(6);
    h.expect(parsedLoc.size).to.eql(3);
  });
});


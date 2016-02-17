import RegexHelpers from '../utils/regex-helper';

class ChordParser {
  constructor(opts) {
    this._root = (opts && opts.root) || null;
    this._rootOverride = (opts && opts.rootOverride) || null;
    this._flavors = (opts && opts.flavors) || null;
  }

  parse(chordText) {
    // root
    const char1 = chordText.substring(0, 1);
    const char2 = chordText.substring(1, 2);
    let root = char1;
    let rootOverride = null;
    if (char2 === 'b' || char2 === '#') {
      root = root + char2;
    }

    // rootOverride
    const groupMatch = RegexHelpers.groupFromRegex(chordText, /\/([ABCDEFG][b#]?)$/g, 1);
    if (groupMatch) {
      rootOverride = groupMatch;
    }

    // -------------
    // get flavors
    // -------------
    let flavors = chordText;
    // remove root
    flavors = flavors.substring(root.length, flavors.length);
    // remove rootOverride
    if (rootOverride) {
      flavors = flavors.replace(/\/([ABCDEFG][b#]?)$/gm, '');
    }
    if (flavors.length === 0) {
      // if is empty is null then
      flavors = null;
    }

    return {
      root: root,
      flavors: flavors,
      rootOverride: rootOverride
    };
  }
}

export default ChordParser;

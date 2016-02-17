class ChordPrint {
  static print(chord) {
    let result = chord.root;
    if (chord.flavors) {
      result = result + chord.flavors;
    }
    if (chord.rootOverride) {
      result = result + '/' + chord.rootOverride;
    }
    return result;
  }
}

export default ChordPrint;

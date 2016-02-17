class RegexHelper {

  static removeLine(text, from, to) {
    const firstPart = text.substring(0, from);
    if (to !== text.length) {
      return firstPart + text.substring(to + 1, text.length);
    }
    return firstPart.substring(0, firstPart.length - 1);
  }

  static removeAllLinesByRegex(text, regex) {
    const matches = RegexHelper.matchAllRegex(text, regex);
    return RegexHelper.removeAllLines(text, matches);
  }

  static removeAllLines(text, matches) {
    let result = text;
    for (let i = matches.length - 1; i >= 0; i--) {
      const match = matches[i];
      const fromIndex = match.index;
      const toIndex = fromIndex + match[0].length;
      result = RegexHelper.removeLine(result, fromIndex, toIndex);
    }
    return result;
  }

  /**
   * get first regex and return
   * @param  {string} str content
   * @param  {regex}  re  regexobj
   * @return {match}      match object
   */
  static matchFirstRegex(str, re) {
    let m;
    while (m !== null) {
      m = re.exec(str);
      if (m === null) {
        break;
      }

      if (m.index === re.lastIndex) {
        re.lastIndex++;
      }
      return m;
    }
  }

  /**
   * get the result string from group index
   * @param  {string} str
   * @param  {regex}  re
   * @param  {number} groupIndex
   * @return {string}
   */
  static groupFromRegex(str, re, groupIndex) {
    const match = RegexHelper.matchFirstRegex(str, re);
    if (match) {
      return match[groupIndex];
    }
    return null;
  }

  /**
   * return all maches from regex exec
   * @param  {string} str
   * @param  {regex}  re
   * @return {array}
   */
  static matchAllRegex(str, re) {
    let m;
    const allMatches = [];
    while (m !== null) {
      m = re.exec(str);
      if (m === null) {
        break;
      }
      if (m && m.index === re.lastIndex) {
        re.lastIndex++;
      }
      allMatches.push(m);
    }
    return allMatches;
  }
}

export default RegexHelper;

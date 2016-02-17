import h from '../spec_helper';
import { removeLine, removeAllLinesByRegex } from '../../src/utils/regex-helper';

describe('RegexHelper:', () => {
  it('should remove a line from text', () => {
    const textArray = [
      'abc',
      '123',
      '456',
    ];

    const result = removeLine(textArray.join('\n'), 4, 7);
    h.expect(result.split('\n')).to.eql(
      [
        'abc',
        '456',
      ]
    );
  });

  it('should remove all matches from text', () => {
    const textArray = [
      '890',
      'abc0',
      '123',
      'abc1',
      '456',
      'abc2',
      '789',
      'abc3',
      '012',
      'abc4',
      '345',
    ];

    const result = removeAllLinesByRegex(textArray.join('\n'), /^\d\d\d$/gm);
    h.expect(result.split('\n')).to.eql(
      [
        'abc0',
        'abc1',
        'abc2',
        'abc3',
        'abc4',
      ]
    );
  });

  it('should remove all blank lines from text', () => {
    const textArray = [
      '',
      '',
      '',
      'abc1',
      '',
      'abc2',
      '',
      'abc3',
      '',
      '',
      '',
    ];

    const result = removeAllLinesByRegex(textArray.join('\n'), /^$/gm);
    h.expect(result.split('\n')).to.eql(
      [
        'abc1',
        'abc2',
        'abc3',
      ]
    );
  });
});

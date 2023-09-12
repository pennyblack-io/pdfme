import { readFileSync } from 'fs';
import * as path from 'path';
import type { Font as FontKitFont } from 'fontkit';
import {
  calculateDynamicFontSize,
  checkFont,
  getBrowserVerticalFontAdjustments,
  getDefaultFont,
  getFontDescentInPt,
  getFontKitFont,
  getSplittedLines,
} from '../src/font'
import { buildPlaceholder } from '../src/helper';
import { Font, TextSchema, Template, FontWidthCalcValues } from '../src/type';
import { BLANK_PDF } from '../src';

const sansData = readFileSync(path.join(__dirname, `/assets/fonts/SauceHanSansJP.ttf`));
const serifData = readFileSync(path.join(__dirname, `/assets/fonts/SauceHanSerifJP.ttf`));

const getSampleFont = (): Font => ({
  SauceHanSansJP: { fallback: true, data: sansData },
  SauceHanSerifJP: { data: serifData },
});

const getTemplate = (): Template => ({
  basePdf: BLANK_PDF,
  schemas: [
    {
      a: {
        type: 'text',
        content: buildPlaceholder('a'),
        fontName: 'SauceHanSansJP',
        position: { x: 0, y: 0 },
        width: 100,
        height: 100,
      },
      b: {
        type: 'text',
        content: buildPlaceholder('b'),
        position: { x: 0, y: 0 },
        width: 100,
        height: 100,
      },
    },
  ],
});

const getTextSchema = () => {
  const textSchema: TextSchema = {
    position: { x: 0, y: 0 },
    content: buildPlaceholder('variable'),
    type: 'text',
    fontSize: 14,
    characterSpacing: 1,
    width: 50,
    height: 20,
  };
  return textSchema;
};

describe('checkFont test', () => {
  test('success test: no fontName in Schemas', () => {
    const _getTemplate = (): Template => ({
      basePdf: BLANK_PDF,
      schemas: [
        {
          a: {
            type: 'text',
            content: buildPlaceholder('a'),
            position: { x: 0, y: 0 },
            width: 100,
            height: 100,
          },
          b: {
            type: 'text',
            content: buildPlaceholder('b'),
            position: { x: 0, y: 0 },
            width: 100,
            height: 100,
          },
        },
      ],
    });
    try {
      checkFont({ template: _getTemplate(), font: getSampleFont() });
      expect.anything();
    } catch (e) {
      fail();
    }
  });

  test('success test: fontName in Schemas(fallback font)', () => {
    try {
      checkFont({ template: getTemplate(), font: getSampleFont() });
      expect.anything();
    } catch (e) {
      fail();
    }
  });

  test('success test: fontName in Schemas(not fallback font)', () => {
    const getFont = (): Font => ({
      SauceHanSansJP: { data: sansData },
      SauceHanSerifJP: { fallback: true, data: serifData },
    });

    try {
      checkFont({ template: getTemplate(), font: getFont() });
      expect.anything();
    } catch (e) {
      fail();
    }
  });

  test('fail test: no fallback font', () => {
    const getFont = (): Font => ({
      SauceHanSansJP: { data: sansData },
      SauceHanSerifJP: { data: serifData },
    });

    try {
      checkFont({ template: getTemplate(), font: getFont() });
      fail();
    } catch (e: any) {
      expect(e.message).toEqual(
        'fallback flag is not found in font. true fallback flag must be only one.'
      );
    }
  });

  test('fail test: too many fallback font', () => {
    const getFont = (): Font => ({
      SauceHanSansJP: { data: sansData, fallback: true },
      SauceHanSerifJP: { data: serifData, fallback: true },
    });

    try {
      checkFont({ template: getTemplate(), font: getFont() });
      fail();
    } catch (e: any) {
      expect(e.message).toEqual(
        '2 fallback flags found in font. true fallback flag must be only one.'
      );
    }
  });

  test('fail test: fontName in Schemas not found in font(single)', () => {
    const _getTemplate = (): Template => ({
      basePdf: BLANK_PDF,
      schemas: [
        {
          a: {
            type: 'text',
            content: buildPlaceholder('a'),
            fontName: 'SauceHanSansJP2',
            position: { x: 0, y: 0 },
            width: 100,
            height: 100,
          },
          b: {
            type: 'text',
            content: buildPlaceholder('b'),
            position: { x: 0, y: 0 },
            width: 100,
            height: 100,
          },
        },
      ],
    });

    try {
      checkFont({ template: _getTemplate(), font: getSampleFont() });
      fail();
    } catch (e: any) {
      expect(e.message).toEqual('SauceHanSansJP2 of template.schemas is not found in font.');
    }
  });

  test('fail test: fontName in Schemas not found in font(single)', () => {
    const _getTemplate = (): Template => ({
      basePdf: BLANK_PDF,
      schemas: [
        {
          a: {
            type: 'text',
            content: buildPlaceholder('a'),
            fontName: 'SauceHanSansJP2',
            position: { x: 0, y: 0 },
            width: 100,
            height: 100,
          },
          b: {
            type: 'text',
            content: buildPlaceholder('b'),
            fontName: 'SauceHanSerifJP2',
            position: { x: 0, y: 0 },
            width: 100,
            height: 100,
          },
        },
      ],
    });

    try {
      checkFont({ template: _getTemplate(), font: getSampleFont() });
      fail();
    } catch (e: any) {
      expect(e.message).toEqual(
        'SauceHanSansJP2,SauceHanSerifJP2 of template.schemas is not found in font.'
      );
    }
  });
});

describe('getSplitPosition test with mocked font width calculations', () => {
  /**
   * To simplify these tests we mock the widthOfTextAtSize function to return
   * the length of the text in number of characters.
   * Therefore, setting the boxWidthInPt to 5 should result in a split after 5 characters.
   */

  let widthOfTextAtSizeSpy: jest.SpyInstance<number, [string]>;

  beforeAll(() => {
    // @ts-ignore
    widthOfTextAtSizeSpy = jest.spyOn(require('../src/font'), 'widthOfTextAtSize');
    widthOfTextAtSizeSpy.mockImplementation((text) => {
      return text.length;
    });
  });

  afterAll(() => {
    widthOfTextAtSizeSpy.mockRestore();
  });

  const mockedFont: FontKitFont = {} as FontKitFont;
  const mockCalcValues: FontWidthCalcValues = {
    font: mockedFont,
    fontSize: 12,
    characterSpacing: 1,
    boxWidthInPt: 5,
  };

  it('does not split an empty string', () => {
    expect(getSplittedLines('', mockCalcValues)).toEqual(['']);
  });

  it('does not split a short line', () => {
    expect(getSplittedLines('a', mockCalcValues)).toEqual(['a']);
    expect(getSplittedLines('aaaa', mockCalcValues)).toEqual(['aaaa']);
  });

  it('splits a line to the nearest previous space', () => {
    expect(getSplittedLines('aaa bbb', mockCalcValues)).toEqual(['aaa', 'bbb']);
  });

  it('splits a line where the split point is on a space', () => {
    expect(getSplittedLines('aaaaa bbbbb', mockCalcValues)).toEqual(['aaaaa', 'bbbbb']);
  });

  it('splits a long line in the middle of a word if too long', () => {
    expect(getSplittedLines('aaaaaa bbb', mockCalcValues)).toEqual(['aaaaa', 'a bbb']);
  });

  it('splits a long line without spaces at exactly 5 chars', () => {
    expect(getSplittedLines('abcdef', mockCalcValues)).toEqual(['abcde', 'f']);
  });

  it('splits a very long line without spaces at exactly 5 chars', () => {
    expect(getSplittedLines('abcdefghijklmn', mockCalcValues)).toEqual(['abcde', 'fghij', 'klmn']);
  });

  it('splits a line with lots of words', () => {
    expect(getSplittedLines('a b c d e', mockCalcValues)).toEqual(['a b c', 'd e']);
  });
});

describe('getSplittedLines test with real font width calculations', () => {
  const font = getDefaultFont();
  const baseCalcValues = {
    fontSize: 12,
    characterSpacing: 1,
    boxWidthInPt: 40,
  };

  it('should not split a line when the text is shorter than the width', () => {
    getFontKitFont(getTextSchema(), font).then((fontKitFont) => {
      const fontWidthCalcs = Object.assign({}, baseCalcValues, { font: fontKitFont });
      const result = getSplittedLines('short', fontWidthCalcs);
      expect(result).toEqual(['short']);
    });
  });

  it('should split a line when the text is longer than the width', () => {
    getFontKitFont(getTextSchema(), font).then((fontKitFont) => {
      const fontWidthCalcs = Object.assign({}, baseCalcValues, { font: fontKitFont });
      const result = getSplittedLines('this will wrap', fontWidthCalcs);
      expect(result).toEqual(['this', 'will', 'wrap']);
    });
  });

  it('should split a line in the middle when unspaced text will not fit on a line', () => {
    getFontKitFont(getTextSchema(), font).then((fontKitFont) => {
      const fontWidthCalcs = Object.assign({}, baseCalcValues, { font: fontKitFont });
      const result = getSplittedLines('thiswillbecut', fontWidthCalcs);
      expect(result).toEqual(['thiswi', 'llbecu', 't']);
    });
  });

  it('should not split text when it is impossible due to size constraints', () => {
    getFontKitFont(getTextSchema(), font).then((fontKitFont) => {
      const fontWidthCalcs = Object.assign({}, baseCalcValues, { font: fontKitFont });
      fontWidthCalcs.boxWidthInPt = 2;
      const result = getSplittedLines('thiswillnotbecut', fontWidthCalcs);
      expect(result).toEqual(['thiswillnotbecut']);
    });
  });
});

describe('calculateDynamicFontSize with Default font', () => {
  const font = getDefaultFont();

  it('should return default font size when dynamicFontSizeSetting is not provided', async () => {
    const textSchema = getTextSchema();
    const result = await calculateDynamicFontSize({ textSchema, font, input: 'test' });

    expect(result).toBe(14);
  });

  it('should return default font size when dynamicFontSizeSetting max is less than min', async () => {
    const textSchema = getTextSchema();
    textSchema.dynamicFontSize = { min: 11, max: 10 };
    const result = await calculateDynamicFontSize({ textSchema, font, input: 'test' });

    expect(result).toBe(14);
  });

  it('should calculate a dynamic font size of vertical fit between min and max', async () => {
    const textSchema = getTextSchema();
    textSchema.dynamicFontSize = { min: 10, max: 30, fit: 'vertical' };
    const input = 'test with a length string\n and a new line';
    const result = await calculateDynamicFontSize({ textSchema, font, input });

    expect(result).toBe(19.25);
  });

  it('should calculate a dynamic font size of horizontal fit between min and max', async () => {
    const textSchema = getTextSchema();
    textSchema.dynamicFontSize = { min: 10, max: 30, fit: 'horizontal' };
    const input = 'test with a length string\n and a new line';
    const result = await calculateDynamicFontSize({ textSchema, font, input });

    expect(result).toBe(11.25);
  });

  it('should calculate a dynamic font size between min and max regardless of current font size', async () => {
    const textSchema = getTextSchema();
    textSchema.fontSize = 2;
    textSchema.dynamicFontSize = { min: 10, max: 30, fit: 'vertical' };
    const input = 'test with a length string\n and a new line';
    let result = await calculateDynamicFontSize({ textSchema, font, input });

    expect(result).toBe(19.25);

    textSchema.fontSize = 40;
    result = await calculateDynamicFontSize({ textSchema, font, input });

    expect(result).toBe(19.25);
  });

  it('should return min font size when content is too big to fit given constraints', async () => {
    const textSchema = getTextSchema();
    textSchema.width = 10;
    textSchema.dynamicFontSize = { min: 10, max: 30, fit: 'vertical' };
    const input = 'test with a length string\n and a new line';
    const result = await calculateDynamicFontSize({ textSchema, font, input });

    expect(result).toBe(10);
  });

  it('should return max font size when content is too small to fit given constraints', async () => {
    const textSchema = getTextSchema();
    textSchema.width = 1000;
    textSchema.height = 200;
    textSchema.dynamicFontSize = { min: 10, max: 30 };
    const input = 'test with a length string\n and a new line';
    const result = await calculateDynamicFontSize({ textSchema, font, input });

    expect(result).toBe(30);
  });

  it('should not reduce font size below 0', async () => {
    const textSchema = getTextSchema();
    textSchema.dynamicFontSize = { min: -5, max: 10 };
    textSchema.width = 4;
    textSchema.height = 1;
    const input = 'a very \nlong \nmulti-line \nstring\nto';
    const result = await calculateDynamicFontSize({ textSchema, font, input });

    expect(result).toBeGreaterThan(0);
  });

  it('should calculate a dynamic font size when a starting font size is passed that is lower than the eventual', async () => {
    const textSchema = getTextSchema();
    textSchema.dynamicFontSize = { min: 10, max: 30, fit: 'vertical' };
    const input = 'test with a length string\n and a new line';
    const startingFontSize = 18;
    const result = await calculateDynamicFontSize({ textSchema, font, input, startingFontSize });

    expect(result).toBe(19.25);
  });

  it('should calculate a dynamic font size when a starting font size is passed that is higher than the eventual', async () => {
    const textSchema = getTextSchema();
    textSchema.dynamicFontSize = { min: 10, max: 30, fit: 'horizontal' };
    const input = 'test with a length string\n and a new line';
    const startingFontSize = 36;
    const result = await calculateDynamicFontSize({ textSchema, font, input, startingFontSize });

    expect(result).toBe(11.25);
  });

  it('should calculate a dynamic font size using vertical fit as a default if no fit provided', async () => {
    const textSchema = getTextSchema();
    textSchema.dynamicFontSize = { min: 10, max: 30 };
    const input = 'test with a length string\n and a new line';
    const result = await calculateDynamicFontSize({ textSchema, font, input });

    expect(result).toBe(19.25);
  });
});

describe('calculateDynamicFontSize with Custom font', () => {
  const font = getSampleFont();

  it('should return smaller font size when dynamicFontSizeSetting is provided with horizontal fit', async () => {
    const textSchema = getTextSchema();
    textSchema.dynamicFontSize = { min: 10, max: 30, fit: 'horizontal' };
    const input = 'あいうあいうあい';
    const result = await calculateDynamicFontSize({ textSchema, font, input });

    expect(result).toBe(16.75);
  });

  it('should return smaller font size when dynamicFontSizeSetting is provided with vertical fit', async () => {
    const textSchema = getTextSchema();
    textSchema.dynamicFontSize = { min: 10, max: 30, fit: 'vertical' };
    const input = 'あいうあいうあい';
    const result = await calculateDynamicFontSize({ textSchema, font, input });

    expect(result).toBe(26);
  });

  it('should return min font size when content is too big to fit given constraints', async () => {
    const textSchema = getTextSchema();
    textSchema.dynamicFontSize = { min: 20, max: 30 };
    const input = 'あいうあいうあいうあいうあいうあいうあいうあいうあいう';
    const result = await calculateDynamicFontSize({ textSchema, font, input });

    expect(result).toBe(20);
  });

  it('should return max font size when content is too small to fit given constraints', async () => {
    const textSchema = getTextSchema();
    textSchema.dynamicFontSize = { min: 10, max: 30 };
    const input = 'あ';
    const result = await calculateDynamicFontSize({ textSchema, font, input });

    expect(result).toBe(30);
  });

  it('should return min font size when content is multi-line with too many lines for the container', async () => {
    const textSchema = getTextSchema();
    textSchema.dynamicFontSize = { min: 5, max: 20 };
    const input = 'あ\nいう\nあ\nいう\nあ\nいう\nあ\nいう\nあ\nいう\nあ\nいう';
    const result = await calculateDynamicFontSize({ textSchema, font, input });

    expect(result).toBe(5);
  });
});

describe('getFontDescentInPt test', () => {
  test('it gets a descent size relative to the font size', () => {
    expect(getFontDescentInPt({ descent: -400, unitsPerEm: 1000 } as FontKitFont, 12)).toBe(
      -4.800000000000001
    );
    expect(getFontDescentInPt({ descent: 54, unitsPerEm: 1000 } as FontKitFont, 20)).toBe(1.08);
    expect(getFontDescentInPt({ descent: -512, unitsPerEm: 2048 } as FontKitFont, 54)).toBe(-13.5);
  });
});

describe('getBrowserVerticalFontAdjustments test', () => {
  // Font with a base line-height of 1.349
  const font = { ascent: 1037, descent: -312, unitsPerEm: 1000 } as FontKitFont;

  test('it gets a top adjustment when vertically aligning top', () => {
    expect(getBrowserVerticalFontAdjustments(font, 12, 1.0, 'top')).toEqual({
      topAdj: 2.791301999999999,
      bottomAdj: 0,
    });
    expect(getBrowserVerticalFontAdjustments(font, 36, 2.0, 'top')).toEqual({
      topAdj: 8.373906,
      bottomAdj: 0,
    });
  });

  test('it gets a bottom adjustment when vertically aligning middle or bottom', () => {
    expect(getBrowserVerticalFontAdjustments(font, 12, 1.0, 'bottom')).toEqual({
      topAdj: 0,
      bottomAdj: 2.791302,
    });
    expect(getBrowserVerticalFontAdjustments(font, 12, 1.15, 'middle')).toEqual({
      topAdj: 0,
      bottomAdj: 1.5916020000000004,
    });
  });

  test('it does not get a bottom adjustment if the line height exceeds that of the font', () => {
    expect(getBrowserVerticalFontAdjustments(font, 12, 1.35, 'bottom')).toEqual({
      topAdj: 0,
      bottomAdj: 0,
    });
  });

  test('it does not get a bottom adjustment if the font base line-height is 1.0 or less', () => {
    const thisFont = { ascent: 900, descent: -50, unitsPerEm: 1000 } as FontKitFont;
    expect(getBrowserVerticalFontAdjustments(thisFont, 20, 1.0, 'bottom')).toEqual({
      topAdj: 0,
      bottomAdj: 0,
    });
  });
});
